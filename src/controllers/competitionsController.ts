import { Request, Response } from 'express';
import axios from 'axios';


const competitions = async (req: Request, res: Response): Promise<void> => {
  try {
    const compsS3DATAURL = 'https://sci-temporary-bucket.s3.us-west-2.amazonaws.com/competition.json';
    const response = await axios.get(compsS3DATAURL);
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default competitions;
