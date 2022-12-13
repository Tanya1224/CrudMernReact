import React from 'react'
import { Link } from 'react-router-dom';
import './nav.css';



function Navbar() {
    return (
        <>
            <nav className="navbar rounded-0 text-start" style={{ backgroundColor: "pink" }}>
                <div class="container">
                    <a class="nav-link fs-3 text-decoration-none text-black" ><Link to="/">Home</Link></a>
                    <a class="nav-link fs-3 text-decoration-none text-black" ><Link to="/user">Add user</Link></a>
                    <a class="nav-link fs-3 text-decoration-none text-dark" ><Link to="/allusers">See all users</Link></a>
                </div>
            </nav>
        </>
    )
}

export default Navbar;




