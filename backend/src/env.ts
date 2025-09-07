if (!process.env.PUBLIC_BACKEND_PORT)
  throw new Error("PUBLIC_BACKEND_PORT environment value is required");
if (!process.env.FRONT_URL)
  throw new Error("FRONT_URL environment value is required");
if (!process.env.PAYLOAD_SECRET)
  throw new Error("PAYLOAD_SECRET environment value is required");
if (!process.env.MONGODB_URL)
  throw new Error("MONGODB_URL environment value is required");
if (!process.env.SMTP_HOST)
  throw new Error("SMTP_HOST environment value is required");
if (!process.env.SMTP_USER)
  throw new Error("SMTP_USER environment value is required");
if (!process.env.SMTP_PASS)
  throw new Error("SMTP_PASS environment value is required");
if (!process.env.MEDIA_DIR)
  throw new Error("MEDIA_DIR environment value is required");

export const env = {
  PUBLIC_BACKEND_PORT: process.env.PUBLIC_BACKEND_PORT,
  FRONT_URL: process.env.FRONT_URL,
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
  MONGODB_URL: process.env.MONGODB_URL,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  MEDIA_DIR: process.env.MEDIA_DIR,
} as const;
