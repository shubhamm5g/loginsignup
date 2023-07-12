const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/loginInformation')
.then(()=>{
    console.log("mongo connected");
})
.catch(()=>{
    console.log('failed to connect')
})

const LogInSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    contactno:{
        type:String,
        required:true
    },
    flatno:{
        type:String,
        required:true
    },
    wingname:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    }
})



module.exports=mongoose.model('Basic Members Information',LogInSchema)