import cors from "cors";

const corsOptions = {
  origin: process.env.FRONTEND_URL, // Allow frontend domain
  methods: "GET,POST", // Allowed HTTP methods
  credentials: true, // Allow cookies if needed
};

export default cors(corsOptions);
