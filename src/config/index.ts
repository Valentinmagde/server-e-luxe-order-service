import local from'./local';
import development from './dev';
import production from'./prod';
import dotenv from "dotenv";

dotenv.config();

let config: typeof development  = development;

if (process.env.NODE_ENV === 'production') config = production;
else if(process.env.NODE_ENV === 'development') config = development;
else config = local;

export default config;
