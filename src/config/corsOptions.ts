import cors from "cors";
import appConfig from "./appConfig";

const corsOptions = {
  origin: appConfig.frontendUrl, // Allow frontend domain
  methods: "GET,POST", // Allowed HTTP methods
  credentials: true, // Allow cookies if needed
};

export default cors(corsOptions);
