import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../support/API_URL';
import { Redirect } from 'react-router-dom'
import { Login } from '../redux/Action'
import {Input, Button} from 'reactstrap'


class LoginPage extends Component{
    state = {
        error: false
    }


onBtnLogin = () => {
    // let { Login } = this.props;
    let username = this.username.value;
    let password = this.password.value;
    console.log(username)
    console.log(password)
    Axios.get(API_URL + `/users?username=${username}&password=${password}`)
    .then((res) => {
        if(res.data.length === 0){
            alert('Invalid Username or Password')
        }else{
            localStorage.setItem('username',username)
            this.props.Login(res.data[0])
        }
    })
    .catch((err) => {
        console.log(err)
    })
}
render() {
    console.log(this.props.username)
    if(this.props.username){
        return(
            <Redirect to='/'>

            </Redirect>
        )
    }
    return(
        <div className='container'>
            <div className='d-flex justify-content-center'>
                <form className='box'>
                <div className='p-5'>
                    <h1 style={{textAlign:'center'}}>Welcome Back!</h1>
                    <Input innerRef={(username)=>this.username=username} type='text' className='form-control mt-3' placeholder='Username'/>
                    <Input innerRef={(password)=>this.password=password} type='password' className='form-control mt-3' placeholder='Password'/>
                    {/* {
                        this.state.error
                        ?
                        <div className='alert alert-danger mt-3'>
                            {this.state.error}
                            <span onClick={() => this.state({error: ''})} style={{fontWeight:'bolder', cursor:'pointer', float:'right'}}>x</span></div>
                            :
                            null
                    } */}
                    <Button onClick={this.onBtnLogin} size='lg' style={{borderRadius:'24px', backgroundColor:'white', color:'black', marginTop:'20px'}} className='form-control login-btn' >Sign in</Button>    
                </div>
                <div className='d-flex justify-content-center'>
                    <p className='mt-3'>
                        Don't have an account?
                    {/* <link>
                        <span style={{textDecoration:'underline'}}> Create your today! </span>
                    </link> */}
                    </p>
                </div>
                </form>
            </div>
        </div>
    )

   }
}

const mapStatetoProps = ( state ) => {
    return{
        username: state.user.username
    }
}

export default connect(mapStatetoProps, { Login })(LoginPage);