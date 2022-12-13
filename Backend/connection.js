import mongoose from "mongoose";

// this is for atlas
// mongoose.connect("mongodb+srv://Tanya1224:tanyagup122422@cluster0.vj9e3ow.mongodb.net/?retryWrites=true&w=majority").then(() => {
export function connectDB() {
    console.log("check");
    mongoose.connect("mongodb://127.0.0.1:27017/St2_project", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Database connection successful')
        }).catch(err => {
            console.error('Database connection error', err)
        });
}
