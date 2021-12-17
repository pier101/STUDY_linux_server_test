import Axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  let navigate = useNavigate();

  const logoutButton = () => {
    Axios.get(`/api/logout`)
      .then(response => {
        if (response.status === 200) {
          navigate('/');
        } else {
          alert('Log Out Failed')
        }
      });
  };

  return (
    <div>
      <ul>
        <li>
          <Link to="./login">login</Link>
        </li>
        <li>
          <Link to="./register">register</Link>
        </li>
        <li>
          <div onClick={logoutButton}>logout</div>
        </li>
      </ul>
    </div>
  )
}

export default Home
