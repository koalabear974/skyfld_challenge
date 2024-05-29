import { promises as fs } from 'node:fs';
import { expect, test, describe, beforeEach, afterEach } from 'vitest';
import { GET, POST } from '@/app/api/sensors/data/route';
import { writeFile, readFile, updateFile } from '@/helpers/fileDatabase';
import path from "path";
import { createMockRequest } from './mocks/mockRequest';

const databaseBasePath = path.join(process.cwd(), 'database');
const sensorBasePath = path.join(process.cwd(), 'database', 'sensor');
const testFileName = 'test_sensors';
const nonExistingTestFileName = 'non_existent_file';
const testFilePath = path.join(sensorBasePath, `${testFileName}.json`);
const testFilePath2 = path.join(sensorBasePath, `${nonExistingTestFileName}.json`);

describe('/api/sensors/data', () => {
  beforeEach(async () => {
    // Ensure the directory exists before running tests
    await fs.mkdir(databaseBasePath, {recursive: true});
    await fs.mkdir(sensorBasePath, {recursive: true});
  });

  afterEach(async () => {
    // Clean up by deleting the test file after each test
    await fs.unlink(testFilePath).catch(() => {});
    await fs.unlink(testFilePath2).catch(() => {});
  });

  test('Should get all Data ', async () => {
    const mockData = [
      {sensorId: 'sensor-1', type: 'temperature', value: 22.5, timestamp: '2024-05-27T12:00:00Z'},
      {sensorId: 'sensor-1', type: 'temperature', value: 20.5, timestamp: '2024-05-27T13:00:00Z'},
    ];
    await writeFile(testFileName, mockData)

    const request = createMockRequest(`http://localhost:3000/api/sensors/data?sensorId=${testFileName}`);
    const response = await GET(request);
    expect(response.status).toBe(200);
    expect(response.json()).resolves.toEqual(mockData);
  });

  test('Should filter data with startdate', async () => {
    const mockData = [
      { sensorId: '1', type: 'temperature', value: 22.5, timestamp: '2024-05-27T12:00:00Z' },
      { sensorId: '1', type: 'temperature', value: 23.0, timestamp: '2024-05-28T12:00:00Z' },
    ];
    await writeFile(testFileName, mockData)

    const startDate = '2024-05-28T00:00:00Z';
    const request = createMockRequest(`http://localhost:3000/api/sensors/data?sensorId=${testFileName}&startDate=${startDate}`);

    const response = await GET(request);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual([
      { sensorId: '1', type: 'temperature', value: 23.0, timestamp: '2024-05-28T12:00:00Z' },
    ]);
  });

  test('Should filter data with enddate', async () => {
    const mockData = [
      { sensorId: '1', type: 'temperature', value: 22.5, timestamp: '2024-05-27T12:00:00Z' },
      { sensorId: '1', type: 'temperature', value: 23.0, timestamp: '2024-05-28T12:00:00Z' },
    ];
    await writeFile(testFileName, mockData)

    const endDate = '2024-05-27T23:59:59Z';
    const request = createMockRequest(`http://localhost:3000/api/sensors/data?sensorId=${testFileName}&endDate=${endDate}`);

    const response = await GET(request);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual([
      { sensorId: '1', type: 'temperature', value: 22.5, timestamp: '2024-05-27T12:00:00Z' },
    ]);
  });

  test('Should filter data with startdate and enddate', async () => {
    const mockData = [
      { sensorId: '1', type: 'temperature', value: 22.5, timestamp: '2024-05-26T12:00:00Z' },
      { sensorId: '1', type: 'temperature', value: 22.5, timestamp: '2024-05-27T12:00:00Z' },
      { sensorId: '1', type: 'temperature', value: 23.0, timestamp: '2024-05-28T12:00:00Z' },
    ];
    await writeFile(testFileName, mockData)

    const startDate = '2024-05-27T00:00:00Z';
    const endDate = '2024-05-27T23:59:59Z';
    const request = createMockRequest(`http://localhost:3000/api/sensors/data?sensorId=${testFileName}&startDate=${startDate}&endDate=${endDate}`);

    const response = await GET(request);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual([
      { sensorId: '1', type: 'temperature', value: 22.5, timestamp: '2024-05-27T12:00:00Z' },
    ]);
  });

  test('Should POST', async () => {
    const mockData = [
      {
        sensorId: 'sensor-1',
        type: 'temperature',
        value: 22.5,
        timestamp: '2024-05-27T12:00:00Z',
      }
    ];
    const requestObj = {
      nextUrl: {
        searchParams: {
          get: () => {
            return testFileName;
          }
        }
      },
      json: async () => {
        return mockData;
      },
    };

    const response = await POST(requestObj);
    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({message: 'Data stored'});

    const readData = await readFile(testFileName);
    expect(readData).toEqual(mockData);
  });

  test('Should handle invalid POST data', async () => {
    const requestObj = {
      json: async () => ([{}]), // Missing required fields
    };

    const response = await POST(requestObj);
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({error: 'Invalid data'});
  });

  test('Should handle readFile error in GET', async () => {
    const requestObj = {
      nextUrl: {
        searchParams: {
          get: () => {
            return nonExistingTestFileName;
          }
        }
      }
    };

    const response = await GET();
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({error: 'Failed to retrieve data'});
  });

  test('Should handle updateFile non existing file in POST', async () => {
    const requestObj = {
      nextUrl: {
        searchParams: {
          get: () => {
            return nonExistingTestFileName;
          }
        }
      },
      json: async () => ([{
        sensorId: 'sensor-1',
        type: 'temperature',
        value: 22.5,
        timestamp: '2024-05-27T12:00:00Z',
      }]),
    };

    const response = await POST(requestObj);
    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({message: 'Data stored'});
  });
});
