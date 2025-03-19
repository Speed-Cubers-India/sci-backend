import { Request, Response } from 'express';
import axios from 'axios';

const rankings = async (req: Request, res: Response): Promise<void> => {
  try {
    const rankingsS3DataUrl = 'https://sci-temporary-bucket.s3.us-west-2.amazonaws.com/rankings.json';
    const response = await axios.get(rankingsS3DataUrl);
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default rankings;
