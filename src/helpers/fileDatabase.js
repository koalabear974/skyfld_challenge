import { promises as fs } from 'node:fs';
import path from 'path';

// Define the base path for sensor data storage
let databaseBasePath = path.join(process.cwd(), 'database');
let sensorBasePath = path.join(process.cwd(), 'database', 'sensor');

// If on prod (vercel) we need to use tmp folder to be able to manipulate files
if (process.env.NODE_ENV === 'production') {
  databaseBasePath = path.join('tmp', 'database');
  sensorBasePath = path.join('tmp', 'database', 'sensor');
}

// Ensure the directory exists
const ensureDirectoryExists = async () => {
  try {
    // Create the directory if it does not exist
    await fs.mkdir(databaseBasePath, {recursive: true});
    await fs.mkdir(sensorBasePath, {recursive: true});
  } catch (error) {
    console.error('Error ensuring directory exists:', error);
  }
};

// Write data to a JSON file
export const writeFile = async (fileName, data) => {
  try {
    // Ensure the directory exists before writing
    await ensureDirectoryExists();
    // Define the full file path
    const filePath = path.join(sensorBasePath, `${fileName}.json`);
    // Write the data to the file in JSON format
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing file:', error);
    throw error;
  }
};

// Read data from a JSON file
export const readFile = async (fileName) => {
  try {
    // Ensure the directory exists before reading
    await ensureDirectoryExists();
    // Define the full file path
    const filePath = path.join(sensorBasePath, `${fileName}.json`);
    // Read the data from the file as a string
    const data = await fs.readFile(filePath, 'utf8');
    // Parse and return the JSON data
    return JSON.parse(data);
  } catch (error) {
    // If the file does not exist, return null
    if (error.code === 'ENOENT') {
      return null;
    }
    console.error('Error reading file:', error);
    throw error;
  }
};

// Update data in a JSON file
export const updateFile = async (fileName, newData = []) => {
  try {
    // Ensure the directory exists before updating
    await ensureDirectoryExists();
    // Define the full file path
    const filePath = path.join(sensorBasePath, `${fileName}.json`);

    let existingData = [];
    try {
      // Read the existing data from the file
      const fileData = await fs.readFile(filePath, 'utf8');
      existingData = JSON.parse(fileData);
    } catch (error) {
      // If the file does not exist, handle the error
      if (error.code !== 'ENOENT') {
        console.error('Error reading existing file:', error);
        throw error;
      }
    }

    // Append the new data to the existing data
    existingData = [...existingData, ...newData];
    // Write the updated data back to the file
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));
  } catch (error) {
    console.error('Error updating file:', error);
    throw error;
  }
};

