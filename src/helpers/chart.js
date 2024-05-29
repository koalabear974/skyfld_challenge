import moment from "moment";

export const getChartStyling = (data = []) => {
  // Extract labels from data
  const labels = data.map(d => moment(d.timestamp).toString());

  return {
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
      width: 1,
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
      categories: labels,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: true,
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      show: false,
    },
  };
}

export const generateChartSeries = (data, chartColor = '#33B2DF') => {
  if (!data || data.length === 0) return [];

  const seriesMap = {};

  // Map data values to their respective types
  data.forEach(item => {
    if (!seriesMap[item.type]) {
      seriesMap[item.type] = [];
    }
    seriesMap[item.type].push(item.value);
  });

  // Convert mapped data to the required series format
  const series = Object.keys(seriesMap).map(type => ({
    name: type,
    data: seriesMap[type],
    color: chartColor
  }));

  return series;
};