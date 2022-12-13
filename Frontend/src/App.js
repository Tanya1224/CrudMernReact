import { BrowserRouter, Routes, Route } from "react-router-dom"
import AddUser from "./component/addUser";
import GetAllUsers from "./component/getAllUsers";
import EditUser from "./component/editUser";
import Navbar from "./component/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>

                <Route path="/" element={<AddUser />} />
                <Route path="/user" element={<AddUser />} />
                <Route path="/allusers" element={<GetAllUsers />} />
                <Route path="/edituser/:customId" element={<EditUser />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
