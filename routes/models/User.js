const {Schema, model, Types}=require('mongoose')

const schema = new Schema({
    email: { type: String, required:true, unique: true},
    password: { type: String, required:true},
    name: { type: String, required:false},
    familyName: { type: String, required:false},
    loginName: { type: String, required:false},
    phone: { type: String, required:false}, 
    companyName: { type:Types.ObjectId, ref:'Company', required:true, default:'TODO'}
})

module.exports = model('User', schema)