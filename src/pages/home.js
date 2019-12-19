import React from 'react';
import Axios from 'axios';
import { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon, Button } from 'mdbreact';
import CarouselPage from '../component/slider'
// import MoveCard from '../component/MovCard'
import { Link } from 'react-router-dom'




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



    renderUserData = () => {
        return (
            this.state.data.map((val, index) => {
                return (
                    <div key={val.id}>
                        <MDBCard style={{ width: '22rem', margin: '20[x auto 10px auto' }}>
                            <Link to={`/movie-detail?=${val.id}`}>
                                <MDBCardImage style={{ height: '33rem' }} className='img-fluid' src={val.image} />
                            </Link>
                        </MDBCard>
                    </div>
                )
            })
        )
    }

    render() {
        const style = {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            backgroundColor: '#f2f2f2',
            padding: '50px 15px auto 15px',
            margin: '4% auto 0px auto'
        }

        return (
            <div style={style}>
                {this.renderUserData()}
                {/* <MDBRow md='10' style={{ margin: 'auto', padding: '20px 150px' }}>
                    <CarouselPage />
                    {this.renderUserData()}
                </MDBRow> */}
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