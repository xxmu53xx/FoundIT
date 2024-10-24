import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const UserCrud = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    userID: '',
    schoolEmail: '',
    schoolId: '',
    password: '',
    bio: '',
    currentPoints: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8083/api/users/getAllUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission for creating/updating a user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update user
        await axios.put(`http://localhost:8083/api/users/putUserDetails/?id=${user.userID}`, user);
        alert('User updated successfully!');
      } else {
        // Create new user
        await axios.post('http://localhost:8083/api/users/postUsers', user);
        alert('User created successfully!');
      }
      fetchUsers(); // Refresh the user list
      setIsEditing(false);
      resetForm(); // Reset the form
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Error saving user. Please try again.'); // Alert the user in case of an error
    }
  };

  // Handle editing a user
  const handleEdit = (userToEdit) => {
    setUser(userToEdit);
    setIsEditing(true);
  };

  // Handle deleting a user
  const handleDelete = async (userID) => {
    try {
      await axios.delete(`http://localhost:8083/api/users/deleteUserDetails/${userID}`);
      alert('User deleted successfully!');
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Reset form
  const resetForm = () => {
    setUser({
      userID: '',
      schoolEmail: '',
      schoolId: '',
      password: '',
      bio: '',
      currentPoints: 0,
    });
    setIsEditing(false);
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>User Management</li>
          <li>Other Entities</li>
        </ul>
      </div>
      
      <div className="content">
        <h1>{isEditing ? 'Edit User' : 'Create New User'}</h1>
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label>Email: &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;</label>
            <input
              type="text"
              name="schoolEmail"
              placeholder="School Email"
              value={user.schoolEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>School ID:&nbsp;</label>
            <input
              type="text"
              name="schoolId"
              placeholder="School ID"
              value={user.schoolId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:&nbsp;</label>
            <input
              type="password" // Set to password type for security
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Biography:&nbsp;</label>
            <input
              type="text"
              name="bio"
              placeholder="Bio"
              value={user.bio}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Points: &nbsp; &nbsp; &nbsp;&nbsp;</label>
            <input
              type="number"
              name="currentPoints"
              placeholder="Current Points"
              value={user.currentPoints}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn">{isEditing ? 'Update User' : 'Create User'}</button>
            {isEditing && <button type="button" className="cancel-btn" onClick={resetForm}>Cancel Edit</button>}
          </div>
        </form>

        <h2>Users List</h2>
        <div className="user-list-container">
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.userID} className="user-item">
                <p>Email: {user.schoolEmail}</p>
                <p>School ID: {user.schoolId}</p>
                <p>Bio: {user.bio}</p>
                <p>Current Points: {user.currentPoints}</p>
                <div className="user-actions">
                  <button className="btn" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(user.userID)}>Delete</button>
                </div>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating Action Button for Creating User */}
      <button 
        className="fab" 
        onClick={resetForm}
        title="Create New User"
      >
        +
      </button>
    </div>
  );
};

export default UserCrud;
