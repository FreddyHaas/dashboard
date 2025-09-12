import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  console.error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT || '8000', 10),
};
