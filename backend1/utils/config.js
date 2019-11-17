require('dotenv').config()

// let PORT = process.env.PORT
//using environment variables to switch the database
if(process.env.NODE_ENV === 'production1'){
    PORT = process.env.PRO1_PORT
    DB_URI = process.env.PRO1_MONGODB_URI

}else{
    PORT = process.env.PRO1_PORT
    DB_URI = process.env.PRO2_MONGODB_URI

}


module.exports =  {PORT, DB_URI}