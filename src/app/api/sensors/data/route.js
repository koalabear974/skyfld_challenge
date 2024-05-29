import { NextResponse } from 'next/server';
import { readFile, updateFile } from '@/helpers/fileDatabase';

// GET endpoint to retrieve sensor data
export async function GET(request) {
  try {
    // Get the filename from query parameters or default to 'sensors'
    const fileName = request.nextUrl.searchParams.get("sensorId") || 'sensors';
    const startDateParam = request.nextUrl.searchParams.get("startDate");
    const endDateParam = request.nextUrl.searchParams.get("endDate");
    const startDate = startDateParam ? new Date(startDateParam) : null;
    const endDate = endDateParam ? new Date(endDateParam) : null;

    // Read the sensor data from the specified file
    const sensors = await readFile(fileName);

    // Filter data based on startdate and enddate
    const filteredSensorData = sensors.filter(sensor => {
      const timestamp = new Date(sensor.timestamp);
      if (startDate && timestamp < startDate) return false;
      if (endDate && timestamp > endDate) return false;
      return true;
    });


    // Return the sensor data as a JSON response
    return NextResponse.json(filteredSensorData || []);
  } catch (error) {
    // Handle any errors that occur during the read operation
    return NextResponse.json({error: 'Failed to retrieve data'}, {status: 500});
  }
}

// POST endpoint to store sensor data
export async function POST(request) {
  try {
    // Parse the request body to get the array of sensor data
    const dataArray = await request.json();

    // Validate that the data is an array and each object contains the required fields
    if (!Array.isArray(dataArray) || dataArray.some(data =>
      !data.sensorId || !data.type || !data.value || !data.timestamp)) {
      // If validation fails, return a 400 status with an error message
      return NextResponse.json({error: 'Invalid data'}, {status: 400});
    }

    // Get the filename from query parameters or default to 'sensors'
    const fileName = request.nextUrl.searchParams.get("sensorId") || 'sensors';

    // Update the specified file with the new sensor data
    await updateFile(fileName, dataArray);

    // Return a success message with a 201 status
    return NextResponse.json({message: 'Data stored'}, {status: 201});
  } catch (error) {
    // Handle any errors that occur during the update operation
    return NextResponse.json({error: 'Failed to save data'}, {status: 500});
  }
}
