const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '500mb' }));

app.use(cors({
    origin: ['http://localhost:5173', 'http://192.168.1.80:5173'],
    methods: ['GET', 'POST']
}));

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to mongodb');
    })
    .catch(err => console.log(`Error to connect to mongodb: ${err}`));

const base_route = '/api/v1';

const meRouter = require('./routes/me');
const authRouter = require('./routes/auth');
const storeRouter = require('./routes/store');
const authMiddleware = require('./middleware/auth');

app.use(base_route + '/me', authMiddleware, meRouter);
app.use(base_route + '/auth', authRouter);
app.use(base_route + '/store', storeRouter);

process
    .setMaxListeners(0)
    .on("uncaughtException", err => console.error(err))
    .on("unhandledRejection", err => console.error(err));