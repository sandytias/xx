import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { API_URL } from '../support/API_URL';
import { Login } from '../redux/Action';
import { Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';



class Register extends Component {
    state = {
        loading: false,
        error: false
    }

    onBtnSignIn = () => {
        let username = this.refs.username.value
        let email = this.refs.email.value
        let password = this.refs.password.value
        let confirmPass = this.refs.password.value
        let myInput = document.getElementById("psw");
        let letter = document.getElementById("letter");
        let capital = document.getElementById("capital");
        let number = document.getElementById("number");
        let length = document.getElementById("length");
        if(username && password && email && confirmPass){
            if(password === confirmPass){
                Axios.get(API_URL + `/users?username=${username}`)
                .then((res) => {
                    if(res.data.length === 0){
                        Axios.post(API_URL + `/users`, {
                            username,
                            password,
                            email,
                            role: 'user'
                        })
                        .then((res) => {
                            this.props.Login(res.data)
                        })
                    }else{
                        alert('Username has been taken!')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }else{
                alert('Invalid Password')
            }
        }else{
            alert('please fill in all the forms!')
        }
    }

    render(){
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
                            <h1 style={{textAlign:"center"}}>Join Us!</h1>
                        <input type='text' ref='username' className='form-control mt-3' placeholder='Username' required/>
                        <input type='text' ref='email' className='form-control mt-3' placeholder='Email' required/>
                        <input type='password' ref='password' className='form-control mt-3' placeholder='Password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/>
                        <input type='password' ref='confirm' className='form-control mt-3' placeholder='Confirm Password' required/>
                        {
                            this.state.error
                            ?
                            <div className='alert alert-danger mt-3'>
                                {this.state.error}
                            <span onClick={() => this.setState({error:''})} style={{fontWeight:'bolder', cursor:'pointer', float:'right'}}></span></div>
                            :
                            null
                        }
                        {
                            this.state.loading
                            ?
                            <Loader style={{display:'flex', alignItems:'center', justifyContent:'center'}} type='ThreeDots' color='black'/>
                            :
                            <Button size='lg' style={{borderRadius:'24px', backgroundColor:'white', color:'black'}} onClick={this.onBtnSignIn} className='form-control mt-3 login-btn pb-1' >Sign Up</Button>
                        }
                        </div>
                        <div className='d-flex justify-content-center'>
                            <p className='mt-3 desc'>
                                
                            <h3>Password must contain the following:</h3>
                                <p id="letter" class="invalid">A <b>lowercase</b> letter</p>
                                <p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>
                                <p id="number" class="invalid">A <b>number</b></p>
                                <p id="length" class="invalid">Minimum <b>8 characters</b></p>


                                Already have an Account>
                                <Link to='/login'>
                                    <span style={{textDecoration:'underline'}}> Login! </span>
                                </Link>
                            </p>
                        </div>
                    </form>
            </div>
            </div>
        );
    }
}

const mapStatetoProps = (auth) => {
    return{
        username: auth.user.username
    }
}

export default connect(mapStatetoProps, { Login })(Register);