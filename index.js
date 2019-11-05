import express from 'express';
import Route from './router/Route';

const Index = express();
const PORT = process.env.PORT || 3000;

Index.use('/', Route);

Index.listen(PORT, () => console.log(`Port ada di ${PORT}`));
