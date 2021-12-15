import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('/api/login')
    .then(response => console.log(response.data))
  }, {})
  
  return (
    <div>
      LandingPage
    </div>
  )

}

export default App;
