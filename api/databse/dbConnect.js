import mongoose from 'mongoose'

const DatabaseConnect=async()=>{
try {
  
    
   await mongoose.connect(process.env.DATABASE_URI)
    console.log("Database Connected Successfully");
    
} catch (error) {
    console.log("DB Connection failed");
    
}
}
export {DatabaseConnect}