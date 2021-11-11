 const mongoose=require('mongoose');
const bankDetailsSchema=new mongoose.Schema({
    cust_id:{type :Number},
    name:{type:String},
    ifsc:{type:String},
    accnmbr:{type:String},
    ph :{type:String}

});
module.exports=mongoose.model('bankdetails',bankDetailsSchema);