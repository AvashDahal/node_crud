const mongoose = require('mongoose');

const db = async()=>{
  try
  {
    const connect = await mongoose.connect(process.env.DB_URI);
    console.log("Database connected successfully",connect.connection.name);

  }
  catch(err)
  {
    console.log(err);
    process.exit(1);
  }
};

module.exports= db;