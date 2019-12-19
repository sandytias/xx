import React, { Component } from 'react'
import Axios from 'axios'
import { API_URL } from '../support/API_URL'
import { Button } from 'reactstrap'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Cart extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        //id ambil dari global state
        //connect dari react redux
        var usercart = localStorage.getItem('username')
        Axios.get(API_URL + `/transaction?username=${usercart}`)
            .then((res) => {
                this.setState({ data: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    totalTiket = () => {
        let output = 0
        this.state.data.map((val) => {
            return output += val.ticket_amount
        })
    }

    totalHarga = () => {
        let output = 0
        this.state.data.map((val) => {
            return output += val.price
        })
    }

    renderNum = (arr) => {
        let alpha = 'EDCBA'
        let arr2 = ''
        let output = []
        let output2 = []
        for(var i =0; i<arr.length; i++){
            arr2= parseInt(arr[i][1])+1
            output = (alpha[arr[i][0]] + arr2) + '; '
            output2.push(output)
        }
        return output2
    }

    onBtnCancel = (id,seat,movies) =>{
        Axios.delete(API_URL + `/transaction/${id}`)
        .then((res) => {
            this.componentDidMount()
        })
        .catch((err) => {
            console.log(err)
        })

        Axios.get(API_URL + `/movies?name=${movies}`)
        .then((res) => {
            var book = res.data[0].booked;
            var id = res.data[0].id;

            for(var i=0; i<seat.length; i++){
                for(var j=0; j<book.length; j++){
                    if(seat[i][0]===book[j][0] && seat[i][1]===book[j][1]){
                        console.log(j)
                        book.splice(j, 1);
                    }
                }
            }
        
        Axios.patch(API_URL + `/movies/${id}`, {
            booked: book })
        .then((res) => {
            alert('Booking Cancelled')
        })
        .catch((err) => {
            console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    Checkout = (id) => {
        Axios.get(API_URL + `/transaction?username=${id}`)
            .then((res) => {
                console.log(res.data)
                res.data.forEach(element => {
                    Axios.patch(API_URL + `/transaction/${element.id}`, { status: 'paid'})
                });
                alert('Sukses!')
                window.location.reload()
                this.componentDidMount()
            })
            .catch((err) => {
                console.log(err)
            })
    }


    renderCart = () => {
        return this.state.data.map((val, index) => {
            return (
                <tr key={val.id}>
                    <td>{index + 1}</td>
                    <td>{val.date}</td>
                    <td>{val.movies}</td>
                    <td>{this.renderNum(val.seat)}</td>
                    <td>{val.ticket_amount}</td>
                    <td>Rp. {val.totalprice}</td>
                    <td>{val.status}</td>
                    <td>
                        <Button color="secondary" onClick={() => this.onBtnCancel(val.id, val.seat, val.movies)}>Cancel</Button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div style={{ backgroundColor: "white", height: '60vh', marginTop: "90px", marginBottom: "143px" }}>
                <MDBTable bordered>
                    <MDBTableHead>
                        <tr>
                            <td>Id</td>
                            <td>Your Transaction</td>
                            <td>Movie Title</td>
                            <td>Seats</td>
                            <td>Amount</td>
                            <td>Total Price</td>
                            <td>Status</td>
                            <td>Action</td>
                            
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.renderCart()}
                    </MDBTableBody>
                </MDBTable>
                <Link to='/'>
                <Button style={{ float: 'right', marginRight: '50px', color: 'white' }} onClick={() => {this.Checkout(this.props.username) }}>
                    Checkout
                </Button>
                </Link>
           
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        username: state.user.username
    }
}

export default connect(mapStatetoProps)(Cart);