// import './App.css'
// import Homepage from "./components/homepage/homepage"
// import Login from "./components/login/login"
// import Register from "./components/register/register"
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { useState } from 'react';

// function App() {
//     const [ user, setLoginUser] = useState({})
//   return (
//     <div className="App">
//     <Router>
//       <Switch>
//         <Route exact path="/">
//           {
//             user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>
//           }
//         </Route>
//         <Route path="/login">
//           <Login setLoginUser={setLoginUser}/>
//         </Route>
//         <Route path="/register">
//           <Register />
//         </Route>
//       </Switch>
//     </Router>
//   </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';

function App() {
    const [user, setLoginUser] = useState({});

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />} />
                    <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

