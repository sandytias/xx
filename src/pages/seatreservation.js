import React, { Component } from 'react';
import {connect, useDispatch} from 'react-redux';  // Harus ada untuk akses global state
import Axios from 'axios';
import { Redirect } from 'react-router-dom'
import { MdEventSeat } from 'react-icons/md';
import { FaBeer } from 'react-icons/fa';
import {API_URL} from '../support/API_URL'

class seatreservation extends Component{
    state = {
        movies:[],
        chosen: [],
        price: 0,
        count: 0,
        booked: []
    }

    componentDidMount(){
        var id = this.props.location.state.id;
        console.log('page id : ' + id)
        Axios.get(`http://localhost:2000/movies/${id}`)
        .then((res) => {
            this.setState({
                movies:res.data,
                booked:res.data.booked
            })  
            // console.log(this.state.movie)       // Memasukkan dari 'axios.get' kedalam array dataa dalam state
        })
    }

    renderseats = () => {
       
        var { chosen, booked } = this.state
        var udadibook = booked
        console.log(udadibook)
        var arr = []
        for(var i=0; i<4; i++){
            arr.push([])
            for(var j=1; j<=20; j++){
                arr[i].push(1)
            }
        }
        if(typeof(udadibook)!= 'undefined'){
            for(var l=0; l<udadibook.length; l++){
                arr[udadibook[l][0]][udadibook[l][1]] = 3
            }
        }

        for(var k=0; k<chosen.length; k++){
            arr[chosen[k][0]][chosen[k][1]] = 2
        }
        console.log(arr)


        return arr.map((val, row) => {
            return(
                <div style={{marginBottom:10}}>
                    {String.fromCharCode((row+1) +64)} {
                        val.map((val1, no) => {
                            if(val1 == 1){
                                return(
                                    <a onClick={() => this.PilihSeat([row, no])}><MdEventSeat size='25'/></a>
                                )
                            }else if(val1 == 2){
                                return(
                                    <a onClick={() => this.Cancel([row,no])}><MdEventSeat size='25' style={{color:'blue'}}/></a>
                                )
                            } else if(val1 == 3){
                                return(
                                    <a><MdEventSeat size='25' style={{color:'red'}}/></a>
                                )
                            }
                        })
                    }
                </div>
            )
        })
    }

    PilihSeat = (arr) => {
        let { price,count,chosen } = this.state;
        chosen.push(arr);
        this.setState({
            price: price + 50000,
            count: count + 1,
            chosen: chosen
        })
        console.log(this.state)
    }

    Cancel = (arr) => {
        let{ price,count,chosen } = this.state;
        let output = chosen.filter((val) => {
            return val.join('') !== arr.join('')
        })
        this.setState({
            price: price - 50000,
            count: count - 1,
            chosen: output
        })
        console.log(this.state)
    }

    book = () => {
        let {chosen} = this.state;
        console.log(this.state.movies)
        var book = this.state.movies.booked;
        for(var i=0; i<chosen.length; i++){
            book.push(chosen[i])
        }
        var tanggal = new Date().getDate()
        var bulan = new Date().getMonth() + 1
        var tahun = new Date().getFullYear()
        var fulldate = `${tanggal}/${bulan}/${tahun}`
        console.log(book)
        Axios.patch(`http://localhost:2000/movies/${this.state.movies.id}`,{
            booked: book
        })
        .then((res) => {
            Axios.post(`http://localhost:2000/transaction`,{
                username: this.props.username,
                movies: this.state.movies.name,
                ticket_amount: this.state.count,
                totalprice: this.state.price,
                seat: this.state.chosen,
                status: 'Unpaid',
                date: fulldate
              })
              this.setState({
                  chosen: [],
                  price: 0,
                  count: 0
              })
              alert('Booking Succesfull!')
              this.setState({ redirect: true })
        })
    }

    render() { 
        const { redirect } = this.state;
        let {name} = this.props.location.state
        if (redirect) {
          return <Redirect to={`/`}/>;
        }
           return (
               <div>
                   <center>
                       <div className='row' style={{marginBottom:100, marginTop:100}}>
   
                           <div style={{marginLeft:300, marginRight:100}}>
                               <img src={this.state.movies.image}/>
                           </div>
   
                           <div>
                           <h2>Tickets For {name}</h2><br/>
                           {this.renderseats()}
                           <br/>
                           <h4>Tickets: {this.state.count}</h4>
                           <h4>Total Price: Rp.{this.state.price.toLocaleString()}</h4>
                           <button className='btn btn21' onClick={() => { if (window.confirm('Are You Sure You Wish To Book Your Ticket?')) this.book()} }>Book</button>
                           </div>
   
                       </div>
                   </center>
               </div>
             );
       }
   }
   
   const mapStatetoProps = (state) =>{ // Function yang akan terima global state
       return{
         username: state.user.username, //state.user(merujuk ke index.js reducer).username(masuk ke global state di authReducer)
       }
   }
    
   export default connect(mapStatetoProps)(seatreservation);