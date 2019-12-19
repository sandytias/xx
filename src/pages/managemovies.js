import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
import {connect} from 'react-redux' 
// import Carousel from '../Components/Carousel'
import Axios from 'axios';
import { Redirect } from 'react-router-dom'


class Managemovies extends Component {

    state={
        movie:[]
    }

    componentDidMount(){
        Axios.get('http://localhost:2000/movies')
        .then((res) =>  {
            this.setState({movie:res.data})  // Memasukkan dari 'axios.get' kedalam array dataa dalam state

            console.log(this.state.movie)
        })
      }     

    tampilsynopsis = (kalimat) =>{
        var sentence = kalimat.split(' ')
        var hasil = '';
        for(var i=0; i<=5; i++){
            hasil += sentence[i] + ' ';
        }
        return `${hasil}...`
    }

    delete = (id) => {
        Axios.delete(`http://localhost:2000/movies/${id}`)
        .then((res) =>  {
          console.log(res.data);
          this.componentDidMount()
        })
    }

    isitabel = () =>{
        return this.state.movie.map((val, index) =>{
            return(
                <tr id={index}>
                        <th scope="row" style={{verticalAlign:'middle'}}>{index+1}</th>
                        <td style={{verticalAlign:'middle'}}>{val.name}</td>
                        <td style={{verticalAlign:'middle'}}>
                        {val.genre.map((genre) =>{
                        return <p>{genre}</p>
                        })
                        }
                        </td>
                        <td style={{verticalAlign:'middle'}}>{val.director}</td>
                        <td style={{verticalAlign:'middle'}}>
                        {val.casts.map((casts) =>{
                        return <p>{casts}</p>
                        })
                        }
                        </td>
                        <td style={{verticalAlign:'middle'}}>{this.tampilsynopsis(val.synopsis)}</td>
                        <td><img src={val.image} style={{height:180}}/></td>
                        <td style={{verticalAlign:'middle', textAlign:'center'}}>
                            <Link to={`/editmovie/${val.id}`}><button class='btn btn21'>Edit</button></Link>
                            <button class='btn btn21' onClick={() => { if (window.confirm('Are You Sure You Wish To Delete This Movie?')) this.delete(val.id) } } >Delete</button>
                        </td>
                </tr>
            )
        })
    }

    render() { 
        return (
            <div>
                <br/>
                <center><h1>Movie List</h1>
                    <table class="table" style={{width:1000}}>
                    <thead>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Movie Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Director</th>
                        <th scope="col">Casts</th>
                        <th scope="col" style={{width:200}}>Synopsis</th>
                        <th scope="col">Poster</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.isitabel()}
                    </tbody>
                    </table>
                </center>
            </div>
          );
    }
}
 
export default Managemovies;