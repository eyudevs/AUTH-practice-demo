const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config();

// Force DNS to use Google public DNS servers (fixes querySrv ECONNREFUSED)
dns.setServers(['8.8.8.8', '8.8.4.4']);


const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error(error)
    }
}


module.exports = connectToDb;