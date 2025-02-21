import * as path from "node:path";


const rootPath  = __dirname;

const config =  {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    google:{
        client_id:process.env.GOOGLE_CLIENT_ID,
        secretId:process.env.GOOGLE_SECRET_ID,
    },
    db: 'mongodb://localhost/controlWork12Melnikova',
};


export default config;