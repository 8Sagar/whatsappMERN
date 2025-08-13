import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@ac-ea8cdrd-shard-00-00.serfbkn.mongodb.net:27017,ac-ea8cdrd-shard-00-01.serfbkn.mongodb.net:27017,ac-ea8cdrd-shard-00-02.serfbkn.mongodb.net:27017/?ssl=true&replicaSet=atlas-4n86li-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster1`;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;