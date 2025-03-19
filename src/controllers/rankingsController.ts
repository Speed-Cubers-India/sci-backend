import { Request, Response } from 'express';
import axios from 'axios';

const RANKINGS_S3_URL = 'https://sci-temporary-bucket.s3.us-west-2.amazonaws.com/rankings.json';

const rankings = async (req: Request, res: Response): Promise<void> => {
  try {

    const eventId = (req.query.eventId as string) || "333";
    const stateId = (req.query.stateId as string) || "MH";
    const type = (req.query.type as string) || "single";

    const response = await axios.get(RANKINGS_S3_URL);
    const rankingsData = response.data;

    const key = `${eventId}-${stateId}-${type}`;

    res.json(rankingsData[key] || []);

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default rankings;
