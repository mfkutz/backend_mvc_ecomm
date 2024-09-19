import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || process.env.LOCAL,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  SIGN_COOKIE: process.env.SIGN_COOKIE,

  mailer: {
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    from: process.env.MAILER_FROM,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD,
    },
  },
};
