import dotenv from "dotenv";

// Load env FIRST
dotenv.config({ path: "../../.env" });

import { JWT_SECRET } from "@repo/backend-common";

console.log("JWT_SECRET:", JWT_SECRET);
