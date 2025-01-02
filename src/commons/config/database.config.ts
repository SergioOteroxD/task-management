import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  mongo_uri: process.env.MONGO_URI || 'mongodb://mongo:27017/nestdb',
}));
