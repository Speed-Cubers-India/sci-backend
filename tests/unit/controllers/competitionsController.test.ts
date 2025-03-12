import { describe, it, expect, vi } from 'vitest';
import competitions from '../../../src/controllers/competitionsController';
import { Request, Response } from 'express'; // Import Request and Response types

describe('competitions', () => {
  it('should return a JSON array of competitions', () => {
    const mockJson = vi.fn();
    const mockRes = {
      json: mockJson,
    } as unknown as Response;
    const mockReq = {} as Request;

    competitions(mockReq, mockRes);

    expect(mockJson).toHaveBeenCalledWith([
      {
        competitionId: 'RECCubeOpen2024',
        name: 'REC Cube Open 2024',
        start_date: '2014-03-07',
        end_date: '2014-03-07',
      },
    ]);
  });
});
