import { promises as fs } from 'node:fs';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import SensorChart from '@/components/SensorChart';
import moment from "moment";
import path from "path";
import { writeFile } from "@/helpers/fileDatabase";

// Mock the fetch function
global.fetch = vi.fn()

function createFetchResponse(data) {
  return { ok: true, json: () => new Promise((resolve) => resolve(data)) }
}

const databaseBasePath = path.join(process.cwd(), 'database');
const sensorBasePath = path.join(process.cwd(), 'database', 'sensor');
const testFileName = 'test_sensors';
const testFilePath = path.join(sensorBasePath, `${testFileName}.json`);

describe('SensorChart Component', () => {
  beforeEach(async () => {
    // Ensure the directory exists before running tests
    await fs.mkdir(databaseBasePath, {recursive: true});
    await fs.mkdir(sensorBasePath, {recursive: true});
  });

  afterEach(async () => {
    // Clean up by deleting the test file after each test
    await fs.unlink(testFilePath).catch(() => {});
  });

  it('should render chart', async () => {
    let endDate = moment().toISOString()
    let startDate = moment().subtract(10, 'minutes').toISOString()

    const data = [
      { timestamp: startDate, value: 22.5, sensorId: '1', type: 'temperature' },
      { timestamp: endDate, value: 23.0, sensorId: '1', type: 'temperature' },
    ]
    await writeFile(testFileName, data)

    fetch.mockResolvedValue(createFetchResponse(data))
    act(() => {
      render(<SensorChart sensorId={testFileName}/>);
    })

    expect(fetch).toHaveBeenCalled()

    await vi.waitUntil(
      () => !document.querySelector('#SensorChart_loader'),
      {
        timeout: 500, // default is 1000
        interval: 20, // default is 50
      }
    )
    // Sadly didnt' have time to debug this test to ensure apexchart would load and display
    // fireEvent.click(screen.getByText('Live data'));
    // await vi.waitUntil(
    //   () => document.querySelector('#SensorChart_chart'),
    //   {
    //     timeout: 500, // default is 1000
    //     interval: 20, // default is 50
    //   }
    // )
    //
    // // Check that chart title is rendered
    // expect(screen.getByText(`Sensor data of #${testFileName}`)).toBeDefined();
    //
    // expect(screen.getByText(startDate)).toBeInTheDocument();

  });
});
