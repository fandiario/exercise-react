import React from "react"
import Axios from "axios"
import swal from "sweetalert"

import linkAPIProducts from "../Supports/Constants/LinkAPIProducts"
import linkAPICarts from "../Supports/Constants/LinkAPICarts"

class DetailProduct extends React.Component {
    state = {
        dataProducts : null,
        dataSameCatProducts: null
    }

    getDataProducts = () => {
        let idProduct = this.props.location.pathname.split("/")[2]
        // console.log (idProduct)

        Axios.get (linkAPIProducts+`/${idProduct}`)

        .then ((res) => {
            this.setState ({dataProducts: res.data})
            this.getSameDataCatProducts ()
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    getSameDataCatProducts = () => {
        Axios.get (linkAPIProducts +`?category=${this.state.dataProducts.category}`)

        .then ((res) => {
            this.setState ({dataSameCatProducts: res.data})
        })

        .catch ((err) => {
            console.log (err)
        })

    }

    goToDetail = (id) => {
        window.location = `/detail-product/${id}`
    }

    addToCart = () => {
        let idUser = localStorage.getItem ("id")
        let idProduct = this.state.dataProducts.id

        if (idUser === null) {
            swal({
                title: "Error",
                text: "You have to log in first !",
                icon: "error",
            })
        
        } else {

            let dataToCart = {
                userId : idUser,
                productId : idProduct,
                quantity : 1 
            }

            Axios.post (linkAPICarts, dataToCart) 

            .then ((res) => {

                swal ({
                    title: "Success",
                    text: "Successfully add product to cart!",
                    icon: "success",
                })

            })

            .catch ((err) => {
                console.log (err)
            })

        }
    }

    mapDataProducts = () => {
        return this.state.dataSameCatProducts.map ((el, i) => {
            return (
                <div key={i}>
                    <div className="col-6 m-3 shadow" style={{width: "18rem"}}>
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
    }


    componentDidMount () {
        this.getDataProducts ()
        // this.getSameDataCatProducts ()
    }

    render () {

        if (this.state.dataProducts === null || this.state.dataSameCatProducts === null) {
            return (
                <div className="container">
                    <div className="row mt-3">
                        <h1>
                            Detail Product
                        </h1>

                        <div className="bg-success col-12" style={{height:"5px"}}></div>
                    </div>

                    <div className="row mt-3">
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
                            Detail Product
                        </h1>
    
                        <div className="bg-success col-12" style={{height:"5px"}}></div>
                    </div>
    
                    <div className="row mt-5 shadow">
                        <div className="col-6 my-3 d-flex justify-content-center align-items-center">
                            <img src={this.state.dataProducts.image1} className="img-fluid" style={{width:"auto", height:"250px"}} alt=""/>
                        </div>

                        <div className="col-6 my-3">
                            <div className="col-12">
                                <h2>
                                    {
                                        this.state.dataProducts.name
                                    }
                                </h2>
                            </div>

                            <div className="col-12">
                                Brand : {this.state.dataProducts.brand}
                            </div>

                            <div className="col-12">
                                Category : {this.state.dataProducts.category}
                            </div>

                            <div className="col-12">
                                Stock : {this.state.dataProducts.stock} items
                            </div>

                            {
                                this.state.dataProducts.stock <= 3 ?
                                    <div className="col-12 my-3">
                                        <h5>
                                            Almost Out
                                        </h5>

                                    </div>  
                                :
                                    null
                            }

                            <div className="col-12 my-3">
                                <h3>
                                    Rp. {(this.state.dataProducts.price).toLocaleString ("id-Id")}
                                </h3>
                            </div>

                            

                            <div className="col-12 my-5">
                                <input type="button" value="Add To Cart" className="btn btn-success" onClick ={this.addToCart}/>
                            </div>

                        </div>
    
                    </div>

                    <div className="row mt-5">
                        <h3>
                            Same Category :
                        </h3>

                        <div className="bg-success col-12" style={{height:"5px"}}></div>
                    </div>

                    <div className="row mt-3">
                            {
                                this.mapDataProducts ()
                            }
                    </div>
                </div>
            )

        }


        
    }
}

export default DetailProduct
