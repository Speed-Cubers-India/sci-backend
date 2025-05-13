import { Request, Response } from "express";


export const teams = async (req: Request, res: Response): Promise<void> => {
    const departments = [
        {
            name: "Design and Social media",
            members: [
                {
                    name: "Imruthun",
                    id: "DSM001",
                    image: "https://avatars.worldcubeassociation.org/uploads/user/avatar/2012JAME04/1704019172.jpg",
                },
                {
                    name: "Vigneshwar", 
                    id: "DSM002",
                    image: "https://avatars.worldcubeassociation.org/uploads/user/avatar/2012JAME04/1704019172.jpg",
                },
            ],
        },
        {
            name: "Finance",
            members: [
                {
                    name: "Sachin Arvind",
                    id: "FIN001", 
                    image: "https://avatars.worldcubeassociation.org/uploads/user/avatar/2012JAME04/1704019172.jpg",
                },
                {
                    name: "Arumugam PK",
                    id: "FIN002",
                    image: "https://avatars.worldcubeassociation.org/uploads/user/avatar/2012JAME04/1704019172.jpg",
                },
            ],
        },
        {
            name: "Website",
            members: [
                {
                    name: "Daniel James",
                    id: "WEB001",
                    image: "https://avatars.worldcubeassociation.org/uploads/user/avatar/2012JAME04/1704019172.jpg",
                },
                {
                    name: "Allen John",
                    id: "WEB002",
                    image: "https://avatars.worldcubeassociation.org/uploads/user/avatar/2012JAME04/1704019172.jpg",
                },
                {
                    name: "Pranav",
                    id: "WEB003",
                    image: "https://avatars.worldcubeassociation.org/uploads/user/avatar/2012JAME04/1704019172.jpg",
                },
                {
                    name: "Zaeen",
                    id: "WEB004",
                    image: "https://avatars.worldcubeassociation.org/uploads/user/avatar/2012JAME04/1704019172.jpg",
                },
            ],
        },
        {
            name: "Operations and Advisory",
            members: [
                {
                    name: "Abhijeet",
                    id: "OA001",
                    image: "https://avatars.worldcubeassociation.org/uploads/user/avatar/2012JAME04/1704019172.jpg",
                },
                {
                    name: "Mohd Arif",
                    id: "OA002",
                    image: "https://avatars.worldcubeassociation.org/uploads/user/avatar/2012JAME04/1704019172.jpg",
                },
            ],
        },
    ];
    res.json(departments);
}