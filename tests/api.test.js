import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/react';
import { GET, POST } from '@/app/api/hello/route';

describe('/api/hello', () => {
  test('Should GET', async () => {
    const response = await GET()
    expect(response.status).toBe(200)
    expect(response.json()).resolves.toEqual({message: 'Hello World'})
  })

  test('Should POST', async () => {
    const response = await POST()
    expect(response.status).toBe(200)
    expect(response.json()).resolves.toEqual({message: 'Hello World'})
  })

})