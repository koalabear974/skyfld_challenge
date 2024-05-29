import { expect, test, describe } from 'vitest'
import { GET, POST } from '@/app/api/hello/route';

describe('/api/hello', () => {
  test('Should GET', async () => {
    const response = await GET()
    expect(response.status).toBe(200)
    expect(response.json()).resolves.toEqual({message: 'Hello World'})
  })

  test('Should POST', async () => {
    const requestObj = {
      json: async () => ({ name: 'Item 3' }),
    };

    const response = await POST(requestObj)
    expect(response.status).toBe(200)
    expect(response.json()).resolves.toEqual({message: 'Hello World'})
  })
})