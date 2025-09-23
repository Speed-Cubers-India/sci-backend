import { describe, it, expect, vi } from 'vitest';
import { Request, Response } from 'express';
import axios from 'axios';
import competitions from '../../../src/controllers/competitionsController';

vi.mock('axios');

describe('competitionsController', () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    json: vi.fn(),
    status: vi.fn().mockReturnThis(),
  } as unknown as Response;

  it('returns competition data on success', async () => {
    const mockData = [{ id: 1, name: 'Test' }];
    vi.mocked(axios.get).mockResolvedValue({ data: mockData });

    await competitions(mockRequest, mockResponse);

    expect(axios.get).toHaveBeenCalledWith('https://sci-temporary-bucket.s3.us-west-2.amazonaws.com/competition.json');
    expect(mockResponse.json).toHaveBeenCalledWith(mockData);
  });

  it('returns 500 on error', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('Failed'));

    await competitions(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Failed' });
  });
});