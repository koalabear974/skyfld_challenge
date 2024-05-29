"use client";

import { useSidebar } from '@/context/SidebarContext';
import DashboardBoxWrapper from "@/components/DashboardBoxWrapper";
import { Alert, Button, FileInput, Label, Select, Textarea, Tooltip } from "flowbite-react";
import React, { useState } from "react";
import { HiInformationCircle, HiOutlineInformationCircle } from "react-icons/hi";
import { generateData } from "@/helpers/sensorData";

export default function AddDataPage() {
  const {isSidebarOpen} = useSidebar();
  const [selectedSensor, setSelectedSensor] = useState(1)
  const [rawData, setRawData] = useState('');
  const [fileData, setFileData] = useState();
  const [status, setStatus] = useState('');

  const generateDummyData = () => {
    // Sensor type is fixed from the sensor data for now
    const data = generateData(selectedSensor, selectedSensor === 1 ? 'temperature' : 'humidity')
    setRawData(JSON.stringify(data))
  }

  const handleSubmit = async () => {
    try {
      let uploadData = rawData === '' ? fileData : rawData
      const response = await fetch(`/api/sensors/data?sensorId=${selectedSensor}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: uploadData,
      });

      if (response.ok) {
        setStatus('Data submitted successfully');
      } else {
        setStatus('Failed to submit data');
      }
    } catch (error) {
      setStatus('Failed to submit data');
    }
    setTimeout(() => setStatus(''), 3000)
  }

  return (
    <div className={`p-4 ml-16 ${isSidebarOpen ? 'sm:ml-64' : ''} grid gap-4`}>
      <DashboardBoxWrapper className="" title="Generate/Add data to sensor"
                           subTitle="Use this to generate data for current day">
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="countries" value="Select the sensor"/>
            </div>
            <Select id="countries" required value={selectedSensor} onChange={(e) => setSelectedSensor(e.target.value)}>
              <option value={1}>Sensor #1</option>
              <option value={2}>Sensor #2</option>
            </Select>
          </div>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
        <div className="text-base font-normal text-gray-500 dark:text-gray-400 mb-4 flex">
          You can submit either in text form or in file form:
          <Tooltip content="Data format should be: [{sensorId: ..., type: ..., value: ..., timestamp: ...}]">
            <HiOutlineInformationCircle className="ml-2"/>
          </Tooltip>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="rawData" value="Raw data"/>
            </div>
            <Textarea
              className="mb-4"
              id="rawData"
              placeholder="[{sensorId: ..., type: ..., value: ..., timestamp: ...}]"
              value={rawData}
              onChange={(e) => setRawData(e.target.value)}
              required
              disabled={!!fileData}
              rows={4}
            />
            <Button color="light" className="w-full" onClick={() => generateDummyData()} disabled={!!fileData}>
              Generate dummy data
            </Button>
          </div>
          <div id="fileUpload">
            <div className="mb-2 block">
              <Label htmlFor="fileData" value="Upload file"/>
            </div>
            <FileInput
              disabled={!!rawData}
              id="fileData"
              helperText="A json file containing sensor data formatted properly"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) {
                  setFileData('');
                  return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                  setFileData(event.target.result);
                  console.log("event.target.result : ", event.target.result);
                };
                reader.readAsText(file);
              }}
            />
          </div>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

        {status !== '' && (
          <Alert className="mb-4" color={status.includes('success') ? "success" : "failure"} icon={HiInformationCircle}>
            <span className="font-medium">Info alert:</span> {status}
          </Alert>
        )}
        <Button className="w-full" onClick={handleSubmit}>Upload data</Button>

      </DashboardBoxWrapper>
    </div>
  );
}
