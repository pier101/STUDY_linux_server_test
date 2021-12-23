import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Link, useNavigate,Route, Switch } from 'react-router-dom';


const Home = () => {
  let navigate = useNavigate();
  const [isLogged,setIsLogged] =useState(false)

  useEffect(() => {
    axios.get('/api/auth/loginCheck').then(res=>{
      if (res.data.loggedIn) {
        setIsLogged(true)
        console.log(res.data.loginData)
        console.log("로그인 유지중")
      } else {
        console.log(res.data.loginData)
        console.log("로그인 안 한 상태")
      }
    })
    .catch()
  }, [])

  const logoutButton = () => {
    axios.post(`/api/auth/logout`)
      .then(res => {
        console.log(res.data)
        console.log(res.status)
        if (res.status == 200) {
          alert("로그아웃 완료")
          setIsLogged(false)
          navigate('/');
        } else {
          alert('Log Out Failed')
        }
      });
  };
  
  return (
    <div>
      <ul>
        {isLogged ? 
        <li>
          <a href='#' onClick={logoutButton}>logout</a>
        </li>  
        :
        <>
        <li>
          <Link to="./login">login</Link>
        </li>
        <li>
          <Link to="./register">register</Link>
        </li>
        </>
        }
        <li>
          <Link to="./room1">1번 방</Link>
        </li>
        <li>
          <Link to="./room2">2번 방</Link>
        </li>
      </ul>
      <h1>여긴 홈 입니다</h1>
    </div>
  )
}

export default Home
