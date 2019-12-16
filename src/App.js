import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import NavbarPage from './component/navbar'
// import CarouselPage from './component/slider'
import Home from './pages/home'
import { Route } from 'react-router-dom'
import  LoginPage from './pages/Login'
import Register from './pages/Register'
import { API_URL } from './support/API_URL'
import MovieDetail from './pages/MovieDetail'
import Axios from 'axios';
import { connect } from 'react-redux';
import { Login } from './redux/Action'

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
      {/* <Home/> */}
      <Route path = '/Login' component = { LoginPage } exact />
      {/* <Route path = '/register' component = { Register } /> */}
      <Route path = '/movie-detail' component = { MovieDetail } />
      </div>
    )
  }
}
export default connect(null, { Login })(App);



