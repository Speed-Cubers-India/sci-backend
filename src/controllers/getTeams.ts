import axios from "axios";
import { Request, Response } from "express";

const TEAMS_S3_URL =
  "https://sci-temporary-bucket.s3.us-west-2.amazonaws.com/teams.json";

const USERS_S3_URL =
  "https://sci-temporary-bucket.s3.us-west-2.amazonaws.com/users.json";


export const teams = async (req: Request, res: Response): Promise<void> => {
  const {data} = await axios.get(TEAMS_S3_URL)
  const users = await axios.get(USERS_S3_URL)
  const teamList = data.map((team: any) => {
    const members = team.members?.map((id: number) => users.data.users.find((user: any) => user.id === id))
    return {
      name: team.name,
      members: members
    }
  })
  res.json(teamList)
};
