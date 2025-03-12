import { Request, Response } from 'express';

const competitions = (req: Request, res: Response): void => {
  res.json([
    {
      competitionId: 'RECCubeOpen2024',
      name: 'REC Cube Open 2024',
      start_date: '2014-03-07',
      end_date: '2014-03-07',
    },
  ]);
};

export default competitions;
