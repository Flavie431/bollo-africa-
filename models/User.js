const  {Schema, model} = require('mongoose');

 const  UserSchema = new Schema({
    name: {type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
   //  country: {type:String, required: true},
    isActive: {type:Boolean, default:true},
    isVerified: {type:Boolean,  default:false},
    wallet_id: String,
    purchases:{type: Array},
    phone: String,
    role: {type:String, required: true, default:"user"},
    registered: {type:Date, default:Date.now(),
    },
    updatedAt: {type:Date}
    

 });

 const User = model('User',UserSchema)
 
 module.exports = User;