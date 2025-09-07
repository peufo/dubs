import express from "express";
import payload from "payload";
import proxy from "express-http-proxy";
require("dotenv").config();
import { env } from "./env";

const app = express();

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: env.PAYLOAD_SECRET,
    express: app,
    email: {
      fromName: "Dubs-apiculture",
      fromAddress: `Dubs-apiculture <${env.SMTP_USER}>`,
      transportOptions: {
        host: env.SMTP_HOST,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
        port: 465,
      },
    },
    onInit: async () => {
      payload.logger.info(
        `Payload server listening http://localhost:${env.PUBLIC_BACKEND_PORT}`
      );
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  app.use(proxy(env.FRONT_URL));
  payload.logger.info(`Proxy to FRONT_URL actived: ${env.FRONT_URL}`);

  app.listen(env.PUBLIC_BACKEND_PORT);
};

start();
