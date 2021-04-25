import dotenv from "dotenv";
import server from './server';

dotenv.config();
const port = parseInt(process.env.PORT || '4000');

const starter = new server().start(port)
  .then(port => console.log(`Running on port ${port}`))
  .catch(error => {
    console.log(error)
  });

export default starter;
