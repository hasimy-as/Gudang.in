import express from 'express';

const Route = express.Router();

Route.get('/', (req, res) => res.end('respon terakhir'));

export default Route;
