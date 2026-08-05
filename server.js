require('dotenv').config();
const express = require('express');
const connectToDb = require('./db/db');
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');
const adminRoutes = require('./routes/admin-routes');


connectToDb();


const app = express();

const PORT = process.env.PORT || 3000;

//Middleware 
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);


app.listen(PORT, () => {
    console.log('SERVER IS LISTENING TO PORT ', PORT);
})