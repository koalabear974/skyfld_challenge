export const generateData = (sensorId, type) => {
  const now = new Date();
  const data = [];

  for (let i = 0; i < 60; i++) {
    const timestamp = new Date(now.getTime() - (59 - i) * 60000).toISOString();
    const value = (Math.random() * 10 + 20).toFixed(2); // Random value between 20 and 30
    data.push({
      sensorId,
      type,
      value: parseFloat(value),
      timestamp,
    });
  }

  return data;
};
