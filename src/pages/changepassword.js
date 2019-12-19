import React, { Component } from 'react';
import {connect} from 'react-redux'
import Axios from 'axios'
import { MDBInput, MDBBtn } from "mdbreact";
import {API_URL} from '../support/API_URL'


class ChangePass extends Component {
    state = {}

    changePassword = () => {
        let username = this.props.username
        let pass = this.pass.value
        let newPass = this.newPass.value
        let confirmPass = this.confirmPass.value
        if(newPass === confirmPass) {
            Axios.get(API_URL + `/users?username=${username}&password=${pass}`)
            .then((res) => {
                console.log(res.data)
                if(res.data.length === 0){
                    alert('invalid username or password')
                } else {
                    Axios.patch(API_URL + `/users/${res.data[0].id}`, {
                        password: newPass
                    })
                    .then((res) => {
                        console.log(res.data)
                        alert('Edit Password Successful')
                        this.setState({ redirect: true })
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    render() {
        return(
        
        <div className='container-change'>       
            <div className='inputBox'>
                <h3 style={{textAlign: "center"}}>Change Password</h3>
            <MDBInput type='password' label="Old Password" outline inputRef={(pass) => this.pass = pass}/>
            <MDBInput type="password" label="New Password" outline inputRef={(newPass) => this.newPass = newPass} />
            <MDBInput type="password" label="Confirm Password" outline inputRef={(confirmPass) => this.confirmPass = confirmPass} />
            <MDBBtn rounded outline color="primary" onClick={this.changePassword}>Submit</MDBBtn>
            </div>
        </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return{
        username : state.user.username
    }
}

export default connect(mapStatetoProps)(ChangePass);