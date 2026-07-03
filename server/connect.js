import mongoose from "mongoose";

 const uri="mongodb+srv://mhk:aa9SCebvIicy7gjV@royal.nkyxxbt.mongodb.net/Royal?appName=Royal"

const connectDB=()=>{
    return mongoose.connect(uri);
    
}
export default connectDB;