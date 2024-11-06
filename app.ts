import * as dotenv from "dotenv";
dotenv.config()
import express, { Express } from 'express';
import bodyParser from 'body-parser'
import routes from './src/routes'
import cors from "cors"
import Knex from 'knex'
import { Model } from 'objection'
import environments from './knexfile';

express.json({ limit: 2000, type: 'application/json' });

const app: Express = express();
// Initialize knex.
// let theEnv = process.env.NODE_ENV || "production";
const knex = Knex(environments["development"]);

// Bind all Models to the knex instance. 
// You only need to do this once before you use any of
// your model classes.
Model.knex(knex);
// parse application/json
const corsOptions = { 
        origin: "*"
 } 
app.use(cors(corsOptions))
app.use(bodyParser.json())
// Initialize knex.

app.use(routes)



export default app;
