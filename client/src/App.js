import './App.css';
import Login from './Components/LoginSystem/Login/Login';
import Register from './Components/LoginSystem/Register/Register';
import TeacherProfile from './Components/Teachers/TeacherProfile/TeacherProfile';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import AddSubject from './Components/Teachers/AddSubjects/AddSubject';
import StudentProfile from './Components/Students/StudentProfile/StudentProfile';
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register/:userType" exact component={Register} />
        <Route path="/teacher/profile/:id" exact component={TeacherProfile} />
        <Route path="/student/profile/:id" exact component={StudentProfile} />
        <Route path="/addSubject/:id" exact component={AddSubject} />
      </Switch>
    </Router>
  );
}

export default App;
