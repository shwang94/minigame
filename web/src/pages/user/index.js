import React, { useState, useEffect } from 'react';
import {GetUsers} from '../../services/UserService'
import './style.css'

const UserPage = () => {
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await GetUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users :', error);
      }
    };
    loadData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Result</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.username}>
            <td>{user.username}</td>
            <td>{user.loginType}</td>
            <td>{user.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserPage;
