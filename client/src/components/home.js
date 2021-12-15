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
        {/* <li>
          <Link to="./logout">logout</Link>
        </li> */}
      </ul>
    </div>
  )
}

export default home
