import { Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const rankings = async (req: Request, res: Response): Promise<void> => {
  try {
    const rankingsS3DataUrl = process.env.RANKINGS_S3_DATA_URL;
    const response = await axios.get(rankingsS3DataUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching rankings data:", error);
    res.status(500).json({ error: "Failed to fetch rankings data" });
  }
};

export default rankings;
