import { promises as fs } from 'node:fs';
import { expect, test, describe, beforeEach, afterEach } from 'vitest';
import { GET, POST } from '@/app/api/sensors/data/route';
import { writeFile, readFile, updateFile } from '@/helpers/fileDatabase';
import path from "path";

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
    await fs.unlink(testFilePath).catch(() => {
    });
    await fs.unlink(testFilePath2).catch(() => {
    });
  });

  test('Should GET', async () => {
    const mockData = [
      {sensorId: 'sensor-1', type: 'temperature', value: 22.5, timestamp: '2024-05-27T12:00:00Z'},
    ];
    await writeFile(testFileName, mockData)

    const requestObj = {
      nextUrl: {
        searchParams: {
          get: () => {
            return testFileName;
          }
        }
      }
    };
    const response = await GET(requestObj);
    expect(response.status).toBe(200);
    expect(response.json()).resolves.toEqual(mockData);
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
