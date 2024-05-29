"use client";
import ApexChart from "@/app/components/ApexChart";

const Chart = () => {
  const options = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      id: 'apexchart-tooltip-container',
      enabled: true,
      style: {
        color: 'blue',
      },
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0
      },
    },
    xaxis: {
      categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  }
  const series = [
    {
      name: "Revenue",
      data: [6356, 6218, 6156, 6526, 6356, 6256, 6056],
      color: "#1A56DB",
    },
  ]

  return (
    <div>
      <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
        <div className="flex justify-between">
          <div>
            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">32.4k</h5>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Users this week</p>
          </div>
          <div
            className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
            12%
            <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 10 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M5 13V1m0 0L1 5m4-4 4 4"/>
            </svg>
          </div>
        </div>
        <ApexChart height={420} options={options} series={series} type="area"/>
      </div>
    </div>
  );
};

export default Chart;