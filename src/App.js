import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import NavbarPage from './component/navbar'
import CarouselPage from './component/slider'
import Home from './pages/home'
import { Route, Switch } from 'react-router-dom'
import  LoginPage from './pages/Login'
import Register from './pages/Register'
import { API_URL } from './support/API_URL'
import MovieDetail from './pages/MovieDetail'
import Axios from 'axios';
import { connect } from 'react-redux';
import { Login } from './redux/Action'
import seatreservation from './pages/seatreservation';
import editmovie from './pages/editmovie'
import Cart from './pages/Cart'
import NotFound from './pages/pageNotFound';
import Admin from './pages/addmovies';
import usertransaction from './pages/usertransaction'
import admintransaction from './pages/admintransaction'
import changepassword from './pages/changepassword'

class App extends Component{
  componentDidMount(){
    let username = localStorage.getItem('username')
    if(username){
      Axios.get(API_URL + `/users?username=${username}`)
      .then((res) => {
        this.props.Login(res.data[0])
      })
    }
  }

  render(){
    return(
      <div>
        <NavbarPage/>
      <Switch>
        <Route path = '/' component = { Home } exact/>
        <Route path = '/login' component = { LoginPage }/>
        <Route path = '/register' component = { Register } />
        <Route path = '/movie-detail' component = { MovieDetail } />
        <Route path = '/reservation' component = { seatreservation}/>
        <Route path='/editmovie' component={ editmovie } />
        <Route path='/changepassword' component={ changepassword } />
        <Route path='/manageMovies' component={ Admin }/>
        <Route path='/Cart' component={Cart}/>
        <Route path='/usertransaction' component={usertransaction}/>
        <Route path='/admintransaction' component={admintransaction}/>
        <Route path='/*' component={NotFound}/>
      </Switch>
      </div>
    )
  }
}
export default connect(null, { Login })(App);



