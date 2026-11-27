import path from "path";
import dotenv from "dotenv";

// Unique .env du projet, à la racine du monorepo.
// Les scripts du backend (pnpm, nodemon, pm2) tournent toujours depuis backend/.
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });
