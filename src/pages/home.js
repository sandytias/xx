import React from 'react';
import Axios from 'axios';
import { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon, Button } from 'mdbreact';
import CarouselPage from '../component/slider'
import MoveCard from '../component/MovCard'




class Home extends Component {
    state = {
        data: []
    }

    componentDidMount = () => {
        Axios.get('http://localhost:2000/movies')
            .then((res) => {
                this.setState({ data: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }


    render

    renderUserData = () => {
        return (
            this.state.data.map((val, index) => {
                return (
                    <div key = {val.id}>
                        <div className='col-4 custom-card'>
                            <MoveCard
                                // key={index + 5}
                                id={val.id}
                                title={val.name}
                                genre={val.genre}
                                director={val.director}
                                duration={val.duration}
                                image={val.image}
                            />
                        </div>
                    </div>
                )
            })
        )
    }

    render() {
        console.log(this.state.data)
        return (
            <div> HOME
                <MDBRow md='10' style={{ margin: 'auto', padding: '20px 150px' }}>
                    <CarouselPage />
                    {this.renderUserData()}
                </MDBRow>
            </div>

        )
    }
}

const mapStatetoProps = ({ state }) => {
    return {
        username: state.username
    }
}

export default Home;