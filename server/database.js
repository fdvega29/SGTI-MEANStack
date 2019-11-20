const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database_sgti', { useNewUrlParser: true })

    .then(db => console.log('Database is connected'))
    .catch(err => console.error(err));

process.on('SIGINT', () =>{
    mongoose.connection.close(() => {
        console.log(`Database is disconnected`);
        process.exit(0)
    });
});    

module.exports = mongoose;    
