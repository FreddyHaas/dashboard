import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  // ToDo fix port assertion
  port: parseInt(process.env.PORT!!, 10),

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI, // ToDo

  /**
   * Agendash config
   */
  agendash: {
    user: 'agendash',
    password: '123456',
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
};
