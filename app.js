const express=require('express');
const config=require('config')
const mongoose=require('mongoose')

const app=express();
const PORT=config.get('port')||5000;

app.use('/api/auth', require('./routes/auth.routes'))
async function startMongooseConnect(){
    try {
console.log("Start connection to MongoDB - waiting for it ... ");

        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser:true,
            useUnifiedTopology: true
        })
        app.listen(PORT, ()=> console.log("server started! on port =", PORT))
    }
    catch(err) {
    console.log("startMongooseConnect ERROR -> err", err)
    process.exit(1)
        
    }
}

startMongooseConnect()



