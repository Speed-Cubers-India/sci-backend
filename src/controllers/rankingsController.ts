import { Request, Response } from 'express';
import axios from 'axios';

const RANKINGS_S3_URL = 'https://sci-temporary-bucket.s3.us-west-2.amazonaws.com/rankings.json';

const rankings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId, stateId, type } = req.query;

    if (!eventId || !stateId || !type) {
      res.status(400).json({ message: "Missing required query parameters: eventId, stateId, type" });
    } else {
      const response = await axios.get(RANKINGS_S3_URL);
      const rankingsData = response.data;

      const key = `${eventId}-${stateId}-${type}`;

      res.json(rankingsData[key] || []);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default rankings;
