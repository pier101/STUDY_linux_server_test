import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  useEffect(() => {
    axios.get('/api/auth/loginCheck').then(res=>{
      if (res.data.loggedIn) {
        console.log(res.data.loginData)
        console.log("로그인 유지중")
      } else {
        console.log(res.data.loginData)
        console.log("로그인 안 한 상태")
      }
    })
    .catch()
  }, [])

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); 

    let body = {
      email: Email,
      password: Password,
    };

    axios.post('/api/auth/login', body)
      .then((res) => {
        if (res.data.loginSuccess) {
          console.log('로그인 성공')
          navigate('/')
        }
        if (!res.data.loginSuccess) {
          alert('로그인에 실패 아디 비번 확인 해주세요')
        }
      })  
  }



  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      with: '100%', height: '100vh'
    }}>
      <form style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type='email' value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type='password' value={Password} onChange={onPasswordHandler} />
        <br />
        <button type='submit'>
          Login
        </button>
      </form>
    </div>
  )
};

export default Login;
