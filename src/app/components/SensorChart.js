import ApexChart from "@/app/components/ApexChart";
import { generateChartSeries, getChartStyling } from "@/helpers/chart";
import { useEffect, useState } from "react";
import ErrorAlert from "@/app/components/ErrorAlert";
import DashboardBoxWrapper from "@/app/components/DashboardBoxWrapper";
import { Datepicker, Spinner } from "flowbite-react";
import moment from "moment";
import TimePicker from "@/app/components/TimePicker";

const SensorChart = ({sensorId, className}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState(moment().startOf('day').toString())
  const [endDate, setEndDate] = useState(moment().endOf('day').toString());

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/sensors/data?sensorId=${sensorId}&startDate=${startDate}&endDate=${endDate}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("startDate.toString() : ", startDate.toString());
    console.log("endDate.toString() : ", endDate.toString());
    fetchData();
  }, [startDate, endDate]);

  if (loading) {
    return (
      <DashboardBoxWrapper className={"text-center"} title={`Sensor data of #${sensorId}`} subTitle="">
        <Spinner className="my-16" />
      </DashboardBoxWrapper>
    );
  }
  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
   <DashboardBoxWrapper className={className} title={`Sensor data of #${sensorId}`} subTitle="">
      <ApexChart height={420} options={getChartStyling(data)} series={generateChartSeries(data)} type="area"/>
      <div className="grid grid-cols-2 gap-2">
        <div className="text-base font-normal text-gray-500 dark:text-gray-400">Start time:</div>
        <div className="text-base font-normal text-gray-500 dark:text-gray-400">End time:</div>
        <Datepicker
          defaultDate={new Date(startDate)}
          maxDate={new Date(endDate)}
          onSelectedDateChanged={(d) => setStartDate(moment(d))}
        />
        <Datepicker
          defaultDate={new Date(endDate)}
          minDate={new Date(startDate)}
          onSelectedDateChanged={(d) => setEndDate(moment(d))}
        />
        <TimePicker dateTime={startDate} onChange={(d) => setStartDate(d)}/>
        <TimePicker dateTime={endDate} onChange={(d) => setEndDate(d)}/>
      </div>
   </DashboardBoxWrapper>
  );
};

export default SensorChart;
