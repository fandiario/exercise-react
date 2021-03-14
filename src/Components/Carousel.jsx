import React from "react"
import Axios from "axios"
import Slider from "react-slick"

import linkAPIProducts from "../Supports/Constants/LinkAPIProducts"

// Import css files
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

class carousel extends React.Component {

    state ={
        dataProducts: null,
        sortedDataProducts: null
    }

    getDataProducts = () => {
        Axios.get (linkAPIProducts)

        .then ((res) => {
            // console.log (res.data)
            this.setState ({dataProducts: res.data})
            this.sortDataProducts ()
        })

        .catch ((err) => {
            console.log (err)
        })

    }

    sortDataProducts = () => {
        // First Try
        let result = []
        let arrData = this.state.dataProducts
        // console.log (arrData)
        this.setState ({sortedDataProducts: arrData})
        // console.log (this.state.sortedDataProducts)

        let sortDataRes = arrData.sort ((a, b) => {
            return a.price - b.price
        })

        for (let i = 0; i < 10; i++) {
            result.push (sortDataRes[i])
        }

        this.setState ({sortedDataProducts: result})


        
        // From json-server
        // Axios.get (linkAPIProducts +`?_sort=price&_order=asc&_limit=10`)

        // .then ((res) => {
        //     // console.log (res)
        //     this.setState ({sortedDataProducts: res.data})
        // })

        // .catch ((err)=> {
        //     console.log (err)
        // })

    }

    goToDetail = (id) => {
        window.location = `/detail-product/${id}`
    }

    mapDataProducts = () => {
        return this.state.sortedDataProducts.map ((el, i) => {
            return (
                <div key = {i}>
                    <div className="col-6 shadow m-3" style={{width: "18rem"}}>
                        <div className="mt-3">
                            <img src={el.image1} alt="" className="img-fluid" style={{width: "auto", height: "100px"}}/>
                        </div>
                        <div>
                            {el.name}
                        </div>
                        <div className="mb-3">
                            Rp. {(el.price).toLocaleString ("id-Id")}
                        </div>
                        <div className="mb-3">
                            <input type="button" className="btn btn-success mb-3" value="More Detail..." onClick={() => {this.goToDetail (el.id)}}/>
                        </div>

                    </div>
                    
                </div>
            )
        })

        // console.log (this.state.sortedDataProducts)

    }   

    componentDidMount () {
        this.getDataProducts ()
        // this.sortDataProducts ()
    }

    render () {

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3
        }

        if (this.state.dataProducts === null || this.state.sortedDataProducts === null) {
            return (
                <div className="container">
                    <div className="row mt-3">
                        <h1>
                            Top product :
                        </h1>
                        <div className="bg-success col-12" style={{height:"5px"}}></div>
                        
                        <div className="d-flex justify-content-center mt-5">
                            <div className="spinner-grow" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            )

        } else {

            return (
                <div className="container">

                    <div className="row mt-3">
                        <h1>
                            Top product :
                        </h1>
                        <div className="bg-success col-12" style={{height:"5px"}}></div>
                    </div>

                    <div className="col-12 my-3 shadow">
                        <div>
                            <Slider {...settings}>
                                {   
                                    this.mapDataProducts()   
                                }
                            </Slider>
                        </div>
                        
                    </div>
    
                </div>
            )

        }

       
    }
}

export default carousel