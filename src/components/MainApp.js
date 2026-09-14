import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import UserForm from "./UserForm";
import Users from "./Users";

function MainApp() {
  // we initialize the state
  // it holds all the users record
  const [users, setUsers] = useState((() =>{
    const stored= localStorage.getItem('users')
    return stored ? JSON.parse(stored): []
  }));
  
  // it holds latest uname and email
  const [formData, setFormData] = useState({ uname: "", email: "", city: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const addUser = (e) => {
    e.preventDefault();
    setUsers([...users, formData]);
    setFormData({ uname: "", email: "", city: "" });
  };
  const deleteUser = (uname) => {
    setUsers(users.filter((u) => u.uname !== uname));
  };

  //lifecycle method calls in 2 diff situations , during page load , during state change
  useEffect(()=>{
    localStorage.setItem('users',JSON.stringify(users))
  },[users])


  return (
    <>
      <Header />

      <div className="container mt-4">
        <div className="card shadow mb-4">
          <div className="card-header bg-success text-white">
            <i className="bi bi-person-plus me-2"></i>
            Add User
          </div>
          <div className="card-body">
            <UserForm fd={formData} hc={handleChange} au={addUser} />
          </div>
        </div>

        <div className="card-shadow">
          <div className="card-header bg-primary text-white">
            <i className="bi bi-table me-2"></i>
            Users List
          </div>
          <div className="card-body">
            <Users udata={users} du={deleteUser} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MainApp;
