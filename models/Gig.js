const  {Schema, model} = require('mongoose');

 const  GigSchema = new Schema({
    title: {type:String, required: true},
    description: {type:String, required: true},
    amount: {type:String, required: true},
    isActive: {type:Boolean, default:true},
    skills: {type:Array},
    image_url:String,
    ordered_times:Number,
    inQueue:{type:Number ,default:0},
    expecteDuration:String,
    rating:{type:Array},
    owner: {required:true, type:Schema.Types.ObjectId, ref:"User"},
    created: {type:Date, default:Date.now(),
    },
    updatedAt: {type:Date}
    

 });

 const Gig = model('Gig',GigSchema)
 
 module.exports = Gig;