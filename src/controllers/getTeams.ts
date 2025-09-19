import axios from "axios";
import { Request, Response } from "express";

const TEAMS_S3_URL =
  "https://sci-temporary-bucket.s3.us-west-2.amazonaws.com/teams.json";

const USERS_S3_URL =
  "https://sci-temporary-bucket.s3.us-west-2.amazonaws.com/users.json";

// Helper to get user info by ID
async function fetchUserById(id: number): Promise<any | null> {
  // try {
  //   const res = await axios.get(USERS_S3_URL)
  //   const user = res.data?.users?.find((user: any) => user.id === id)
  //   return user ?? null;
  // } catch (err) {
  //   console.error(`Failed to fetch user ${id}:`, err);
  //   return null;
  // }
  const res = await axios.get(USERS_S3_URL)
  const user = res.data?.users?.find((user: any) => user.id === id)
  return user;
}

export const teams = async (req: Request, res: Response): Promise<void> => {
  // try {
  //   const { data } = await axios.get(TEAMS_S3_URL);
  //   if (!data) {
  //     res.status(500).json({ message: "No teams data found" });
  //   }

  //   const teamList = await Promise.all(
  //     data.map(async (team: any) => {
  //       const members = await Promise.all(
  //         team.members?.map((id: number) => fetchUserById(id))
  //       );

  //       return {
  //         name: team.name ?? "Unknown Team",
  //         members: members.filter(Boolean), // remove nulls
  //       };
  //     })
  //   );  
  //   res.json(teamList);
  // } catch (error: any) {
  //   console.error("Error fetching teams:", error);
  //   res.status(500).json({ message: error.message });
  // }
  const {data} = await axios.get(TEAMS_S3_URL)
  const teamList = await Promise.all(
    data.map(async (team: any) => {
      const members = await Promise.all(
        team.members?.map((id: number) => fetchUserById(id))
      )
      return {
        name: team.name ?? "Unknown Team",
        members: members.filter(Boolean), // remove nulls
      }
    })
  )
  res.json(teamList)
};
