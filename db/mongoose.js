const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

exports.dbConnection = async () => {
    try {
        if (process.env.DB_URL) {
            var connection = await mongoose.connect(process.env.DB_URL)
        } else {
            var connection = await mongoose.connect('mongodb://localhost:27017/football')
        }
        console.log('db connection done !');
        return connection
    }
    catch (err) {
        console.error('Database error: ' + err);
        process.exit(1);
    }
};