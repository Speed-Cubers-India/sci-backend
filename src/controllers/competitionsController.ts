import { Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const competitions = async (req: Request, res: Response): Promise<void> => {
  try {
    const compsS3DATAURL = process.env.COMPS_S3_DATA_URL;
    const response = await axios.get(compsS3DATAURL);
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default competitions;
