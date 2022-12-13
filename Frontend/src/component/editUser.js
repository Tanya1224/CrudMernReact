// import { mongo } from 'mongoose';
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from './navbar';

export default function EditUser() {
    const [found, setFound] = useState(0);
    const [isDeleted, setIsDeleted] = useState(0);
    const [editedUser, seteditedUser] = useState({
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
    let [request_data, setRequestData] = useState([]);
    const { customId } = useParams();
    useEffect(() => {
        const fetcher = async () => {
            let response = await fetch(`http://localhost:8000/user/${customId}`, {
                method: "GET"
            });
            if (response.status == 200) {
                let data = await response.json();
                editedUser.name = data.name;
                setFound(1);
                editedUser.hobby1 = data.hobbies[0];
                editedUser.hobby2 = data.hobbies[1];
                editedUser.hobby3 = data.hobbies[2];
                editedUser.streetAddress = data.address.streetAddress;
                editedUser.pincode = data.address.pincode;
                editedUser.state = data.address.state;
                editedUser.city = data.address.city;
                editedUser.country = data.address.country;
                setRequestData(data);
            }
            if (response.status == 404) {
                setFound(0);
            }
        };
        fetcher();
        console.log("editedUser insideeee effect", editedUser);
        console.log("request_data inside effect", request_data);
    }, []);
    const submitEditData = async (e) => {
        e.preventDefault();
        const newEdit = { ...editedUser };
        console.log(newEdit);
        await fetch(`http://localhost:8000/user/${customId}`, {
            method: "PUT",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(newEdit)
        }).then(resp => { console.log("resp=", resp) })
    };
    const deleteUser = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:8000/user/${customId}`, {
            method: "DELETE",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }
        }).then(resp => {
            console.log("resp=", resp)
            if (resp.status == 200) {
                setIsDeleted(1);
            }
        })
    };
    return (
        <div className="container w-50">
            <h1>Edit User</h1>
            {(found != 1 && isDeleted != 1) ? <h1>Not Found</h1> : <></>}
            {
                (isDeleted != 1) ? <div>
                    <h2 className='text-center'>ID={customId}</h2>
                    <h3>Add new name</h3>
                    < input type="text" name="name" id="e_name" placeholder="Enter Name Here"
                        value={editedUser.name}
                        onChange={(e) => seteditedUser({ ...editedUser, name: e.target.value })}
                    />
                    <h3>Add new streetAddress</h3>
                    <input type="text" name="streetAddress" id="e_streetAddress" placeholder="Enter street Address Here"
                        value={editedUser.streetAddress}
                        onChange={(e) => seteditedUser({ ...editedUser, streetAddress: e.target.value })}
                    />
                    <h3>Add new pincode</h3>
                    <input type="text" name="pincode" id="e_pincode" placeholder="Enter pincode Here"
                        value={editedUser.pincode}
                        onChange={(e) => seteditedUser({ ...editedUser, pincode: e.target.value })}
                    />
                    <h3>Add new state</h3>
                    <input type="text" name="state" id="e_state" placeholder="Enter state Here"
                        value={editedUser.state}
                        onChange={(e) => seteditedUser({ ...editedUser, state: e.target.value })}
                    />
                    <h3>Add new city</h3>
                    <input type="text" name="city" id="e_city" placeholder="Enter city Here"
                        value={editedUser.city}
                        onChange={(e) => seteditedUser({ ...editedUser, city: e.target.value })}
                    />
                    <h3>Add new country</h3>
                    <input type="text" name="country" id="e_country" placeholder="Enter country Here"
                        value={editedUser.country}
                        onChange={(e) => seteditedUser({ ...editedUser, country: e.target.value })}
                    />
                    <h3>Add new hobby1</h3>
                    <input type="text" name="hobby1" id="e_hobby1" placeholder="Enter Hobby 1 Here"
                        value={editedUser.hobby1}
                        onChange={(e) => seteditedUser({ ...editedUser, hobby1: e.target.value })}
                    />
                    <h3>Add new hobby2</h3>
                    <input type="text" name="hobby2" id="e_hobby2" placeholder="Enter Hobby 2 Here"
                        value={editedUser.hobby2}
                        onChange={(e) => seteditedUser({ ...editedUser, hobby2: e.target.value })}
                    />
                    <h3>Add new hobby3</h3>
                    <input type="text" name="hobby3" id="e_hobby3" placeholder="Enter Hobby 3 Here"
                        value={editedUser.hobby3}
                        onChange={(e) => seteditedUser({ ...editedUser, hobby3: e.target.value })}
                    />
                    <br />
                    <br />
                    <div className='text-center'>
                    <button type="submit" className="btn btn-success mx-1 w-25" onClick={submitEditData}>Update</button>
                    <button className='btn btn-danger mx-1 w-25' id="btn_delete" onClick={deleteUser}> delete user</button>
                    </div>
                </div>
                    : <h1>Deleted the user</h1>}
        </div>
    )
}