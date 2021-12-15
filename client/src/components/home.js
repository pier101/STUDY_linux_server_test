import React from 'react'
import { Link } from 'react-router-dom';

const home = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="./login">login</Link>
        </li>
        <li>
          <Link to="./register">register</Link>
        </li>
      </ul>
    </div>
  )
}

export default home
