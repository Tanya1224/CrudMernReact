import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import './adduser.css';
export default function GetAllUsers(props) {
    const [Users, setUsers] = useState([]);
    useEffect(() => {
        async function fetcher() {
            await fetch("http://localhost:8000/users", {
                method: "GET"
            }).then(res => res.json())
                .then(data => {
                    setUsers(data);
                    console.log("data", data)
                    console.log("typeof (data)", typeof (data));
                    console.log("Users", Users);
                    return data;
                });
        };
        const request_response = fetcher();
        console.log("request_response", request_response);
    }, []);
    return (
        <div className="container">
            <h1>Listing All Users</h1>
            <table className="table table-light">
                <thead>
                    <tr align="center">
                        <th></th>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Street Address</th>
                        <th>Pincode</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Hobby 1</th>
                        <th>Hobby 2</th>
                        <th>Hobby 3</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Users.length > 0 ?
                            Users.map((user) => {
                                console.log("<td>{user.custom_id}</td>", user.custom_id);
                                return <tr>
                                    <td><Link to={"/edituser/" + user.custom_id}>Edit user</Link></td>
                                    <th style={{ cursor: "pointer" }} component={Link} to={`/edituser/${user.custom_id}`}>{user.custom_id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.address.streetAddress}</td>
                                    <td>{user.address.pincode}</td>
                                    <td>{user.address.city}</td>
                                    <td>{user.address.state}</td>
                                    <td>{user.address.counrty}</td>
                                    <td>{user.hobbies[0]}</td>
                                    <td>{user.hobbies[1]}</td>
                                    <td>{user.hobbies[2]}</td>
                                </tr>
                            })
                            : <h1>Loading Data</h1>
                    }
                </tbody>
            </table>
        </div>
    )
}