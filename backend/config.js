const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        mongoose.set('strictQuery', false);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection failed', err);
        process.exit(1);
    }
};

module.exports = connectDB;
