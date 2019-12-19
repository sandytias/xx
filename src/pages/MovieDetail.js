import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../support/API_URL';
import { Button } from 'reactstrap';
import Loader from 'react-loader-spinner';
import { Redirect } from 'react-router-dom'
import { Login } from '../redux/Action'


class MovieDetail extends Component{
    state = {
        data: [],
        redirectLogin: false,
        redirectPurchase: false,
    }

    componentDidMount(){
        let id = this.props.location.search.split('=')[1];
        console.info('id slected', id)
        Axios.get(API_URL+`/movies/${id}`)
        .then((res) => {
            this.setState({data: res.data}, () => {
                console.log(this.state.data)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderGenreButton = () => {
        let { genre } = this.state.data
        if(genre){
            return genre.map((val, index) => {
                return <Button className='btn-custom' color='danger' key={index}>{val}</Button>
            })
        }
    }

    renderCasts = () => {
        let { casts } = this.state.data
        if(casts){
            return casts.map((val) => {
                return(
                    <div>
                        <h5>{val}</h5>
                    </div>
                )
            })
        }
    }

    onBtnReseervation = () => {
        let { username } = this.props;
        if(username){
            this.setState({ redirectPurchase: true})
        }else{
            this.setState({ redirectLogin: true})
        }
    }

    render(){
        let{ data, redirectLogin, redirectPurchase } = this.state
        if(redirectLogin){
            return(
                <Redirect to='/login' />
            )
        }else if(redirectPurchase){
            return(
                <Redirect to={{ pathname: '/reservation', state: this.state.data}}/>
            )
        }
        if(data === []){
            return(
                <div className='d-flex justify-content-center'>
                    <loader
                       type='Circles'
                       color='#DC3545'
                       height={200}
                       width={200} 
                       />
                </div>
            )
        }else{
            return(
                <div className='container full-height'>
                    <div className='row'>
                        <div className='col-4'>
                            <img src={data.image} alt='display poster'/>
                        </div>
                        <div className='col-8'>
                            <div className='vertical-spacing'>
                                <h2>
                                    {data.name}
                                </h2>
                            </div>
                            {this.renderCasts()}
                            <div className='vertical-spacing'>
                                {data.director}
                            </div>
                            <div className='vertical-spacing'>
                                Duration: { data.duration} Minutes
                            </div>
                            <div className='vertical-spacing'>
                                {this.renderGenreButton()}
                            </div>
                            <div className='vertical-spacing'>
                                {data.synopsis}
                            </div>
                            <div className='vertical-spacing' style={{ marginTop: '100px', float:'right'}}>
                                <button color='danger' className='btn-custom' onClick={this.onBtnReseervation}>Choose my seats</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStatetoProps = state => {
    return{
        username: state.user.username
    }
}
export default connect(mapStatetoProps, {Login})(MovieDetail);