import React, { useEffect, useState } from 'react';
import Login from './Components/LoginSystem/Login/Login';
import Register from './Components/LoginSystem/Register/Register';
import TeacherProfile from './Components/Teachers/TeacherProfile/TeacherProfile';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import AddSubject from './Components/Teachers/AddSubjects/AddSubject';
import StudentProfile from './Components/Students/StudentProfile/StudentProfile';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Channels from './Components/Students/Channels/Channels';
axios.defaults.withCredentials = true;

function App() {
  const [auth, setauth] = useState(false)
  const [type, settype] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/auth/getLoggedIn").then((data) => {
      setauth(data.data.auth)
      settype(data.data.userType)
      console.log(auth, type)
    }).catch((error) => {
      setauth(false)
      console.log(error.message)
    })
  },[type, auth])

  return (
    <Router>
      <NavigationBar auth={auth} type={type} setauth={setauth} setType={settype} />

      <Route path="/login" exact component={Login} />
      <Route path="/register/:userType" exact component={Register} />

      {/* Teacher */}
      <Route path="/teacher/profile" exact component={TeacherProfile} />
      <Route path="/addSubject" exact component={AddSubject} />

      {/* Student */}
      <Route path="/student/profile/" exact component={StudentProfile} />
      <Route path="/channels" exact component={Channels} />
    </Router>
  );
}

export default App;
