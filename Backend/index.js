import express from 'express';
import cors from 'cors';
import { connectDB } from './connection.js';
import userModel from './models.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 8000;

let total_get_requests = 0;
let total_specific_get_requests = 0;
let total_post_requests = 0;
let total_put_requests = 0;
connectDB();

app.get("/users", async (req, res) => {
    try {
        const data = await userModel.find({});
        total_get_requests++;
        console.log("get all data called", total_get_requests, "times");
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/user", async (req, res) => {
    total_post_requests++;
    console.log("post data called", total_post_requests, "times");
    try {
        console.log("inside post");
        console.log("req.body", req.body);
        // console.log("req.body json", JSON.parse(req.body));
        let data = req.body;
        let str_id = Date.now().toString();
        let new_id = str_id.substr(-6);
        let newUserData = {
            name: data.name,
            hobbies: [data.hobby1, data.hobby2, data.hobby3],
            address: {
                streetAddress: data.streetAddress,
                pincode: data.pincode,
                state: data.state,
                city: data.city,
                country: data.country
            },
            custom_id: new_id
        };
        console.log("\n\n\n\n\n\n\n", newUserData);
        const newUser = new userModel(newUserData);
        await newUser.save();
        console.log("saved");
        res.status(201).json(newUser);
    } catch (error) {
        console.log("error", error);
        res.status(400).json({ message: error.message });
    }
});

app.get("/user/:customId", async (req, res) => {
    let request_Id = req.params.customId;
    total_specific_get_requests++;
    console.log("get specific data called", total_specific_get_requests, "times");
    try {
        console.log("in try");
        
        const user_data = await userModel.findOne({ custom_id: request_Id });
        console.log("after getting", user_data);
        if (user_data == null) {
            return res.status(404).json({ message: "cant find user" });
        }
        else {
            res.status(200).json(user_data);
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

app.put("/user/:customId", async (req, res) => {
    let request_Id = req.params.customId;
    let request_data = req.body;
    console.log("put specific data called", total_put_requests, "times");
    try {

        let required_user_data = await userModel.findOne({ custom_id: request_Id });
        let oldUserData = {
            name: required_user_data.name,
            // hobbies: [data.hobby1, data.hobby2, data.hobby3],
            hobby1: required_user_data.hobbies[0],
            hobby2: required_user_data.hobbies[1],
            hobby3: required_user_data.hobbies[2],
            streetAddress: required_user_data.address.streetAddress,
            pincode: required_user_data.address.pincode,
            state: required_user_data.address.state,
            city: required_user_data.address.city,
            country: required_user_data.address.country
        }
        // console.log("typeof", typeof (required_user_data));
        if(request_data.name!=oldUserData.name){
            required_user_data.name=request_data.name;
        }
        if(request_data.streetAddress!=oldUserData.streetAddress){
            required_user_data.address.streetAddress=request_data.streetAddress;
        }
        if(request_data.city!=oldUserData.city){
            required_user_data.address.city=request_data.city;
        }
        if(request_data.state!=oldUserData.state){
            required_user_data.address.state=request_data.state;
        }
        if(request_data.country!=oldUserData.country){
            required_user_data.address.country=request_data.country;
        }
        if(request_data.hobby1!=oldUserData.hobby1){
            required_user_data.hobbies[0]=request_data.hobby1;
        }
        if(request_data.hobby2!=oldUserData.hobby2){
            required_user_data.hobbies[1]=request_data.hobby2;
        }
        if(request_data.hobby3!=oldUserData.hobby3){
            required_user_data.hobbies[2]=request_data.hobby3;
        }
        // required_user_data.name = request_data.name || required_user_data.name;
        //     required_user_data.hobbies = request_data.hobbies || required_user_data.hobbies;
        //     required_user_data.hobbies = request_data.hobbies || required_user_data.hobbies;
        //     required_user_data.hobbies = request_data.hobbies || required_user_data.hobbies;
        //     required_user_data.address = request_data.address || required_user_data.address;
            await required_user_data.save();
            res.json(required_user_data);
        }
    catch (error) {
            console.log("error", error);
            return res.status(400).json({ message: error.message });
        }
    });

app.delete("/user/:customId", async (req, res) => {
    let request_Id = req.params.customId;
    try {
        userModel.findOneAndDelete({ custom_id: request_Id }, (err, docs) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("deleted user");
            }
        });
        return res.json("User Deleted");
    }
    catch (error) {
        // console.log("error", error);
        return res.status(500).json({ message: error.message });
    }
});



app.listen(port, (err) => console.log(`${port} listen`, err));