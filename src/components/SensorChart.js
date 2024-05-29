import ApexChart from "@/components/ApexChart";
import { generateChartSeries, getChartStyling } from "@/helpers/chart";
import { useEffect, useState } from "react";
import ErrorAlert from "@/components/ErrorAlert";
import DashboardBoxWrapper from "@/components/DashboardBoxWrapper";
import { Datepicker, Select, Spinner } from "flowbite-react";
import moment from "moment";
import TimePicker from "@/components/TimePicker";
import ToggleSwitch from "@/components/ToggleSwitch";

const SensorChart = ({sensorId, className, chartColor}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState(moment().startOf('day').toString())
  const [endDate, setEndDate] = useState(moment().endOf('day').toString());
  const [isLiveData, setIsLiveData] = useState(true)
  const [liveDataTimeSpan, setLiveDataTimeSpan] = useState(10)

  const fetchData = async () => {
    let tempStartDate = startDate
    let tempEndDate = endDate
    if (isLiveData) {
      tempEndDate = moment(moment.now()).toString()
      tempStartDate = moment(moment.now()).subtract(liveDataTimeSpan, 'minutes').toString()
    }
    try {
      let fetchUrl = `/api/sensors/data?sensorId=${sensorId}`
      if (startDate) fetchUrl += `&startDate=${moment(tempStartDate).toISOString()}`
      if (endDate) fetchUrl += `&endDate=${moment(tempEndDate).toISOString()}`

      const response = await fetch(fetchUrl);
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
    fetchData();
  }, [startDate, endDate, isLiveData, liveDataTimeSpan]);

  if (loading) {
    return (
      <DashboardBoxWrapper className={"text-center"} title={`Sensor data of #${sensorId}`} subTitle="">
        <Spinner className="my-16"/>
      </DashboardBoxWrapper>
    );
  }
  if (error) {
    return <ErrorAlert message={error}/>;
  }
  
  const dataType = data[0]?.type || 'Unknown'
  return (
    <DashboardBoxWrapper className={className} title={`Sensor data of #${sensorId}`}
                         subTitle={`Data type: ${dataType}`}>
      {data.length === 0 ? (
        <div className="my-6 text-center text-base font-normal text-gray-500 dark:text-gray-400">
          No data for this period.
        </div>
      ): (
        <ApexChart height={420} options={getChartStyling(data)} series={generateChartSeries(data, chartColor)}
                   type="area"/>
      )}
      <hr className="h-px mb-8 bg-gray-200 border-0 dark:bg-gray-700"/>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center">
          <ToggleSwitch checked={isLiveData} label="Live data" onChange={setIsLiveData} />
        </div>
        <Select value={liveDataTimeSpan} onChange={(e) => setLiveDataTimeSpan(e.target.value)}>
          {[1,5,10,30,60].map((t) => <option key={`option_${t}`} value={t}>{`Last ${t} min.`}</option>)}
        </Select>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
      <div className="grid grid-cols-2 gap-2">
        <div className="text-base font-normal text-gray-500 dark:text-gray-400">Start time:</div>
        <div className="text-base font-normal text-gray-500 dark:text-gray-400">End time:</div>
        <Datepicker
          defaultDate={new Date(startDate)}
          maxDate={new Date(endDate)}
          onSelectedDateChanged={(d) => setStartDate(moment(d))}
          disabled={isLiveData}
        />
        <Datepicker
          defaultDate={new Date(endDate)}
          minDate={new Date(startDate)}
          maxDate={new Date(moment.now())}
          onSelectedDateChanged={(d) => setEndDate(moment(d))}
          disabled={isLiveData}
        />
        <TimePicker
          dateTime={startDate}
          onChange={(d) => setStartDate(d)}
          disabled={isLiveData}
        />
        <TimePicker
          dateTime={endDate}
          onChange={(d) => setEndDate(d)}
          disabled={isLiveData}
        />
      </div>
    </DashboardBoxWrapper>
  );
};

export default SensorChart;
