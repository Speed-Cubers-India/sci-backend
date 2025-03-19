import { Request, Response } from 'express';
import axios from 'axios';

const COMPS_S3_URL = 'https://sci-temporary-bucket.s3.us-west-2.amazonaws.com/competition.json';
const competitions = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get(COMPS_S3_URL);
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default competitions;
