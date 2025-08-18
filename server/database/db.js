import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

// Environment variables
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD; 


const Connection = async () => {
    const URL =`mongodb+srv://${username}:${password}@cluster1.serfbkn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1` 
    try {
        await mongoose.connect(URL,
            {useUnifiedTopology: true, useNewUrlParser: true}
        );
        console.log('Database Connected Succesfully ');
    } catch (error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;