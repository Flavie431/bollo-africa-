const  {Schema, model} = require('mongoose');

 const  ContractSchema = new Schema({
    status:{type:String, default:"Incomplete"},
    seller: {required:true, type:Object, ref:"User"},
    buyer: {required:true, type:Object, ref:"User"},
    amount: Number,
    gig: {required:true, type:Object, ref:"User"},
    messages:{type:Array},
    expectedDelivery:String,
    created: {type:Date, default:Date.now(),
    },
    updatedAt: {type:Date}
    

 });

 const Contract = model('Contract',ContractSchema)
 
 module.exports = Contract;