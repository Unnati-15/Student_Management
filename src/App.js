import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import './App.css';
import NavBar from "./component/common/NavBar.js";
import AddStudents from "./component/student/AddStudents.js";
import EditStudents from "./component/student/EditStudents.js";
import StudentsView from './component/student/StudentsView';
import Home from './Home';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      
      <Router>
      <NavBar/>
      
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/view_students" element={<StudentsView/>}></Route>
          <Route exact path="/add_students" element={<AddStudents/>}></Route>
          <Route exact path="/view_students/edit_students/:id" element={<EditStudents/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
