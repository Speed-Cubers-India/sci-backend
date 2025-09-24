import { describe, it, expect, vi } from 'vitest';
import { Request, Response } from 'express';
import axios from 'axios';
import rankings from '../../../src/controllers/rankingsController';

vi.mock('axios');

describe('rankingsController', () => {
  const mockRequest = { query: {} } as Request;
  const mockResponse = {
    json: vi.fn(),
    status: vi.fn().mockReturnThis(),
  } as unknown as Response;

  it('returns rankings data for valid query parameters', async () => {
    const mockData = { '123-CA-solo': [{ rank: 1, name: 'Test' }] };
    vi.mocked(axios.get).mockResolvedValue({ data: mockData });
    mockRequest.query = { eventId: '123', stateId: 'CA', type: 'solo' };

    await rankings(mockRequest, mockResponse);

    expect(axios.get).toHaveBeenCalledWith('https://sci-temporary-bucket.s3.us-west-2.amazonaws.com/rankings.json');
    expect(mockResponse.json).toHaveBeenCalledWith(mockData['123-CA-solo']);
  });

  it('returns empty array if key not found', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: {} });
    mockRequest.query = { eventId: '123', stateId: 'CA', type: 'solo' };

    await rankings(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith([]);
  });

  it('returns 500 on axios error', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('Network Error'));
    mockRequest.query = { eventId: '123', stateId: 'CA', type: 'solo' };

    await rankings(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Network Error' });
  });
});