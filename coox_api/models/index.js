var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
};


module.exports = connectDb;
