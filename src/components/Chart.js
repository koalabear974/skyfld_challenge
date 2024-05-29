"use client";
import ApexChart from "@/components/ApexChart";
import { getChartStyling } from "@/helpers/chart";

const Chart = () => {
  const series = [
    {
      name: "Revenue",
      data: [6356, 6218, 6156, 6526, 6356, 6256, 6056],
      color: "#1A56DB",
    },
  ]

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <ApexChart height={420} options={getChartStyling()} series={series} type="area"/>
    </div>
  );
};

export default Chart;