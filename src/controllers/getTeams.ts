import axios from "axios";
import { Request, Response } from "express";

const TEAMS_S3_URL =
  "https://sci-temporary-bucket.s3.us-west-2.amazonaws.com/teams.json";

// Helper to get user info by ID
async function fetchUserById(id: number): Promise<any | null> {
  try {
    const res = await axios.get(`https://www.worldcubeassociation.org/api/v0/users/${id}`);
    return res.data?.user ?? null;
  } catch (err) {
    console.error(`Failed to fetch user ${id}:`, err);
    return null;
  }
}

export const teams = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data } = await axios.get(TEAMS_S3_URL);
    if (!data) {
      res.status(500).json({ message: "No teams data found" });
    }

    const teamList = await Promise.all(
      data.map(async (team: any) => {
        const members = await Promise.all(
          (team.members || []).map((id: number) => fetchUserById(id))
        );

        return {
          name: team.name ?? "Unknown Team",
          members: members.filter(Boolean), // remove nulls
        };
      })
    );
    console.log(teamList);
    
    res.json(teamList);
  } catch (error: any) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ message: error.message });
  }
};
