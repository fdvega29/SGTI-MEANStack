const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/SGTI-BD', { useNewUrlParser: true,
                                                        useUnifiedTopology: true,
                                                        useFindAndModify: false 
} )

    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

process.on('SIGINT', () =>{
    mongoose.connection.close(() => {
        console.log(`Database is disconnected`);
        process.exit(0)
    });
});

module.exports = mongoose;  