const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const etablissementRoutes = require('./routes/etablissementRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const  prop= require('./routes/propRoutes');
const app = express();
const cors = require('cors');
app.use(cors());

require('dotenv').config();
connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/etablissements', etablissementRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/prop', prop);

app.get('/', (req, res) => res.send('API is running...'));

module.exports = app;
