import { config } from "dotenv";

// parse the .env file to extract the envirnoment variables  
const { parsed } = config();
// export the variables that we need them in the applications 
export const {
    PORT,
 
} = parsed