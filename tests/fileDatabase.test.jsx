import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'node:fs';
import path from 'path';
import { writeFile, readFile, updateFile } from '@/helpers/fileDatabase';

const databaseBasePath = path.join(process.cwd(), 'database');
const sensorBasePath = path.join(process.cwd(), 'database', 'sensor');
const testFileName = 'test_sensors';
const nonExistingTestFileName = 'non_existent_file';
const testFilePath = path.join(sensorBasePath, `${testFileName}.json`);
const testFilePath2 = path.join(sensorBasePath, `${nonExistingTestFileName}.json`);

describe('fileDatabase', () => {
  beforeEach(async () => {
    // Ensure the directory exists before running tests
    await fs.mkdir(databaseBasePath, { recursive: true });
    await fs.mkdir(sensorBasePath, { recursive: true });
  });

  afterEach(async () => {
    // Clean up by deleting the test file after each test
    await fs.unlink(testFilePath).catch(() => {});
    await fs.unlink(testFilePath2).catch(() => {});
  });

  it('should write data to a JSON file', async () => {
    const data = [{ sensorId: '1', type: 'temperature', value: 25, timestamp: '2024-05-27T12:00:00Z' }];
    await writeFile(testFileName, data);
    const fileData = await fs.readFile(testFilePath, 'utf8');
    expect(JSON.parse(fileData)).toEqual(data);
  });

  it('should read data from a JSON file', async () => {
    const data = [{ sensorId: '1', type: 'temperature', value: 25, timestamp: '2024-05-27T12:00:00Z' }];
    await fs.writeFile(testFilePath, JSON.stringify(data, null, 2));
    const readData = await readFile(testFileName);
    expect(readData).toEqual(data);
  });

  it('should return null if the file does not exist', async () => {
    const readData = await readFile(nonExistingTestFileName);
    expect(readData).toBeNull();
  });

  it('should update data in a JSON file', async () => {
    const initialData = [{ sensorId: '1', type: 'temperature', value: 25, timestamp: '2024-05-27T12:00:00Z' }];
    const newData = [{ sensorId: '2', type: 'humidity', value: 55, timestamp: '2024-05-27T12:05:00Z' }];
    await writeFile(testFileName, initialData);
    await updateFile(testFileName, newData);
    const fileData = await readFile(testFileName);
    expect(fileData).toEqual([...initialData, ...newData]);
  });

  it('should update data in a JSON file that doesnt exist', async () => {
    const initialData = [{ sensorId: '1', type: 'temperature', value: 25, timestamp: '2024-05-27T12:00:00Z' }];
    await updateFile(nonExistingTestFileName, initialData);
    const fileData = await readFile(nonExistingTestFileName);
    expect(fileData).toEqual(initialData);
  });
});
