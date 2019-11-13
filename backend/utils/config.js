require('dotenv').config()

let PORT = process.env.PORT

if(process.env.NODE_ENV === 'production1'){
    DB_URI = process.env.PRO1_MONGODB_URI
}else{
    DB_URI = process.env.PRO2_MONGODB_URI
}



module.exports =  {PORT, DB_URI}