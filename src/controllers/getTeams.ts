import axios from "axios";
import { Request, Response } from "express";

const TEAMS_S3_URL =
  "https://sci-temporary-bucket.s3.us-west-2.amazonaws.com/teams.json";

const USERS_S3_URL =
  "https://sci-temporary-bucket.s3.us-west-2.amazonaws.com/users.json";


export const teams = async (req: Request, res: Response): Promise<void> => {
  const {data} = await axios.get(TEAMS_S3_URL)
  const users = await axios.get(USERS_S3_URL)
  const teamList = await Promise.all(
    data.map(async (team: any) => {
      const members = await Promise.all(
        team.members?.map((id: number) => users.data.users.find((user: any) => user.id === id))
      )
      return {
        name: team.name ?? "Unknown Team",
        members: members.filter(Boolean), // remove nulls
      }
    })
  )
  res.json(teamList)
};
