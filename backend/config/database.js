const mongoose = require("mongoose")

 exports.databaseConnection = () =>{
    mongoose.connect(process.env.MONGO_URL)
    .then((conn)=>{
        console.log(`Database is connected ${conn.connection.host}`)
    })
    .catch((err)=>{
        console.log(err)
    })
}

