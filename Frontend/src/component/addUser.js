import React, { useState } from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import './adduser.css';
export default function AddUser() {
    const [user, setUser] = useState({
        name: "",
        hobby1: "",
        hobby2: "",
        hobby3: "",
        streetAddress: "",
        pincode: "",
        state: "",
        city: "",
        country: ""
    });
    async function userAdd(e) {
        e.preventDefault();
        const newUser = { ...user };
        console.log(newUser);
        await fetch("http://localhost:8000/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(resp => { console.log("resp=", resp) })
    };
    const fillData = (e) => {
        return setUser((prev) => {
            setUser({ ...prev, [e.target.name]: e.target.value });
        })
    };

    return (
        <>
            <div className="container p-5 w-100 text-center d-inline">
                <h1>Enter New User Data</h1>
                <form className='container p-5 w-50'>
                    <div className="form-group">
                        <h3>Name</h3>
                        <input required className="" type="text" name="name" id="c_name" placeholder="Enter Name Here"
                            onChange={fillData}
                        />
                        <h3>Street Address </h3>
                        <input required className="" type="text" name="streetAddress" id="c_streetAddress" placeholder="Enter street Address Here"
                            onChange={fillData}
                        />
                        <h3>Pincode </h3>
                        <input required className="" type="text" name="pincode" id="c_pincode" placeholder="Enter pincode Here"
                            onChange={fillData}
                        />
                        <h3>State </h3>
                        <input required className="" type="text" name="state" id="c_state" placeholder="Enter state Here"
                            onChange={fillData}
                        />
                        <h3>City </h3>
                        <input required className="" type="text" name="city" id="c_city" placeholder="Enter city Here"
                            onChange={fillData}
                        />
                        <h3>Country </h3>
                        <input required className="" type="text" name="country" id="c_country" placeholder="Enter country Here"
                            onChange={fillData}
                        />
                        <h3>Hobby 1 </h3>
                        <input required className="" type="text" name="hobby1" id="c_hobby1" placeholder="Enter Hobby 1 Here"
                            onChange={fillData}
                        />
                        <h3>Hobby 2 </h3>
                        <input required className="" type="text" name="hobby2" id="c_hobby2" placeholder="Enter Hobby 2 Here"
                            onChange={fillData}
                        />
                        <h3>Hobby 3 </h3>
                        <input required className="" type="text" name="hobby3" id="c_hobby3" placeholder="Enter Hobby 3 Here"
                            onChange={fillData}
                        />
                        <br />
                        <br />
                        <button className="btn btn-lg w-25 btn-success" onClick={userAdd} type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}