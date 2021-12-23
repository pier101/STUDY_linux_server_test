import axios from 'axios';
import React,{useEffect} from 'react'


const Room1 = () => {


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

  
  return (
    <div>
      <h1>여기는 1번 방입니다</h1>
    </div>
  )
}

export default Room1
