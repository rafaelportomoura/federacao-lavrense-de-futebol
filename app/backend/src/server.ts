
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import routes from './routes';
import CONFIG from './config/server';
import morgan from './Libs/Morgan'

const app = express();

const { PORT } = CONFIG;

app.use(cors());

const http = createServer(app); // Criando protocolo http
app.use(express.json());
app.use(morgan);
app.use(routes);

http.listen(PORT, () => console.log(`Server is running on port ${PORT}`));