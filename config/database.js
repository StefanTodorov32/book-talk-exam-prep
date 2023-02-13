const mongoose = require('mongoose')
// TODO: change db name
const DB_STRING = 'mongodb://127.0.0.1:27017/booktalkdb'

module.exports = async () =>{
      try{
            mongoose.set('strictQuery', false);
            await mongoose.connect(DB_STRING, {
                  useNewUrlParser: true,
                  useUnifiedTopology: true
            })
            console.log("Database Connected!")
      }catch(err){
            console.error(err.message)

      }
}