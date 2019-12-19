import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'

class editmovie extends Component {
    state = { 
        detail:[
            {
            }
        ]
     }

    componentDidMount(){
        var id = window.location.pathname;
        id = id.replace('/editmovie/', '')  
        console.log(id)
        Axios.get(`http://localhost:2000/movies?id=${id}`)
        .then((res) =>  {
            this.setState({detail:res.data})  // Memasukkan dari 'axios.get' kedalam array dataa dalam state
        })
        }

    edit = (id) =>{
        var title = this.refs.title.value
        var genre = this.refs.genre.value
        var director = this.refs.director.value
        var casts = this.refs.casts.value
        var duration = parseInt(this.refs.duration.value)
        var url = this.refs.url.value
        var synopsis = this.refs.synopsis.value
        genre = genre.split(',')
        casts = casts.split(',')
      Axios.put(`http://localhost:2000/movies/${id}`, {
        name: title,
        genre: genre,
        director: director,
        duration: duration,
        synopsis: synopsis,
        image: url,
        casts: casts
      })
      .then((res) =>  {
        console.log(res.data);
        alert('Movie Edited Successfully!')
        this.setState({ redirect: true })
      })
    }
    
    render() { 
     const { redirect } = this.state;
     if (redirect) {
       return <Redirect to='/managemovies'/>;
     }
        return (
            <div>
                <br/>
                <center>
                <h1>Edit Movie</h1>
                    <div style={{width:500, marginTop:50, marginBottom:100}}>
                        <img src={this.state.detail[0].image}/><br/><br/>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Movie Title</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1"  ref="title" defaultValue={this.state.detail[0].name}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Genre</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" ref="genre" defaultValue={this.state.detail[0].genre}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Director</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" ref="director" defaultValue={this.state.detail[0].director}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Casts</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" ref="casts" defaultValue={this.state.detail[0].casts}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Duration (Minutes)</label>
                            <input type="number" min='0' class="form-control" id="exampleFormControlInput1" ref="duration" defaultValue={this.state.detail[0].duration}/>
                        </div> 
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Image URL</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" ref="url" defaultValue={this.state.detail[0].image}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Synopsis</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" ref="synopsis" defaultValue={this.state.detail[0].synopsis}></textarea>
                        </div>
                        <button type="button" class="btn btn21" onClick={() => { if (window.confirm('Are You Sure You Wish To Edit This Movie?')) this.edit(this.state.detail[0].id)} }>Edit Movie</button>
                    </div>
                </center>
            </div>
          );
    }
}
 
export default editmovie;