import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: 'storage10x',
  api_key: '119343689196578',
  api_secret: 'OMFLGWK1O43L-85sGFGwUpgEQHM',
});

export default cloudinary;
