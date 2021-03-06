import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import { logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';


import { Provider } from 'react-redux'
import store from './store'


import './App.css';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Employees from './components/employees/Employees';
import AddEmployee from './components/employees/AddEmployee';
import EditEmployee from './components/employees/EditEmployee';
import Leaves from './components/leaves/Leaves';
import AddLeave from './components/leaves/AddLeave';
import ViewLeaves from './components/leaves/ViewLeaves';
import EditLeave from './components/leaves/EditLeave';

//Check for token

if(localStorage.jwtToken){
	//set auth token to header
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	// set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now()/1000;
	if(decoded.exp < currentTime){
		// logout the user
		store.dispatch(logoutUser());
		// clear current user
		store.dispatch(clearCurrentProfile());
		// Redirect to login
		window.location.href = '/login'
	}
}


class App extends Component {
  render() {
    return (
      <Provider store = { store }>
	      <Router>
		      <div className="App">
			      <Navbar />
			      <Route exact path='/' component = { Landing } />
			      <div className='container'>
			      	<Route exact path='/register' component = { Register } />
			      	<Route exact path='/login' component = { Login } />
			      	<Switch>
			      		<PrivateRoute exact path='/dashboard' component = { Dashboard } />
			      	</Switch>
			      	<Switch>
			      		<PrivateRoute exact path='/employees' component = { Employees } />
			      	</Switch>
			      	<Switch>
			      		<PrivateRoute exact path='/addemployee' component = { AddEmployee } />
			      	</Switch>
			      	<Switch>
			      		<PrivateRoute exact path='/edit-employee/:id' component = { EditEmployee } />
			      	</Switch>
			      	<Switch>
			      		<PrivateRoute exact path='/leaves' component = { Leaves } />
			      	</Switch>
			      	<Switch>
			      		<PrivateRoute exact path='/add-leave/:id' component = { AddLeave } />
			      	</Switch>
			      	<Switch>
			      		<PrivateRoute exact path='/view-leave/:id' component = { ViewLeaves } />
			      	</Switch>
			      	<Switch>
			      		<PrivateRoute exact path='/edit-leave/:id' component = { EditLeave } />
			      	</Switch>
			      </div>
			      <Footer />
		      </div>
		  </Router>
	  </Provider>
    );
  }
}

export default App;
