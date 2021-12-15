import Axios from 'axios';
import React, { useState } from 'react';

const Register = (props) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword , setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    let body = {
      email: Email,
      password: Password,
      nick: Name,
    };
    
    console.log(body);
    Axios.post("/api/register", body)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          alert("회원가입 되었습니다.");
          props.history.push("/login");
        } else {
          alert("실패했습니다.");
        }
      });
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      with: '100%', height: '100vh'
    }}>
      <form style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        
        <label>Name</label>
        <input type='text' value={Name} onChange={onNameHandler} />

        <label>Email</label>
        <input type='email' value={Email} onChange={onEmailHandler} />

        <label>Password</label>
        <input type='password' value={Password} onChange={onPasswordHandler} />
        
        <label>Confirm Password</label>
        <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <br />
        <button type='submit'>
          Signup
        </button>
      </form>
    </div>
  )
};

export default Register;
