import dotenv from 'dotenv';

dotenv.config();

const portFromEnv = Number(process.env.PORT);
const port = Number.isFinite(portFromEnv) && portFromEnv > 0 ? portFromEnv : 8000;

export default {
  /**
   * Your favorite port
   */
  port,
};
