import React from "react"
import Axios from "axios"

import linkAPICarts from "../Supports/Constants/LinkAPICarts"
import linkAPIProducts from "../Supports/Constants/LinkAPIProducts"
import linkAPITransactions from "../Supports/Constants/LinkAPITransactions"

class Cart extends React.Component {
    state = {
        dataCart: null,
        dataProducts: null,
        totalPrice: null,
        idTransaction: null
    }

    getDataCart = () => {
        let idUser = localStorage.getItem ("id")

        Axios.get (linkAPICarts +`?userId=${idUser}`)

        .then ((res) => {
            this.setState ({dataCart: res.data})
            this.getDataProduct ()
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    getDataProduct = () => {
        let arr = []

        for (let i = 0; i < (this.state.dataCart).length; i++) {
            Axios.get (linkAPIProducts +`/${this.state.dataCart[i].productId}`)

            .then ((res) => {
                arr.push (res.data)

                this.setState ({dataProducts: arr})
                this.getTotalPrice ()
            })

            .catch ((err) => {
                console.log (err)
            })
        }
    }

    mapDataCart = () => {
        return this.state.dataProducts.map ((el, i) => {
            return (
                <div key = {i}>
                    <div className="row shadow mt-3">
                        <div className="col-6">
                            <img src={el.image1} className="img-fluid" style={{width: "auto", height: "100px"}} alt=""/>
                        </div>

                        <div className="col-6">
                            <div>
                                <h5>
                                    {el.name}
                                </h5>
                            </div>

                            <div>
                                Quantity : {this.state.dataCart[i].quantity} item(s)
                            </div>

                            <div>
                                Rp. {(el.price).toLocaleString ("id-Id")}
                            </div>
                        </div>

                    </div>

                </div>
            )
            
        })
    }

    mapDataSummary = () => {
        return this.state.dataProducts.map ((el, i) => {
            return (
                <div key={i} className="container">
                    <div className="row">
                        <div className="col-3">
                            {el.name}
                        </div>

                        <div className="col-3">
                            {this.state.dataCart[i].quantity} item(s)
                        </div>

                        <div className="col-3">
                            @ Rp.{(el.price).toLocaleString ("id-Id")}
                        </div>

                        <div className="col-3">
                            Rp. {((el.price) * (this.state.dataCart[i].quantity)).toLocaleString ("id-Id")}
                        </div>

                    </div>

                </div>
            )
        })
    }

    getTotalPrice = () => {
        let arrQuantity = []
        let arrPrice = []
        let result = 0

        for (let i = 0 ; i < (this.state.dataCart).length; i++) {
            arrQuantity.push (this.state.dataCart[i].quantity)
        }

        for (let j = 0; j < (this.state.dataProducts).length; j++) {
            arrPrice.push (this.state.dataProducts[j].price)
        }

        for (let k = 0; k < arrQuantity.length; k++) {
            result += (arrQuantity[k] * arrPrice[k])
        }

        this.setState ({totalPrice: result})
        // console.log (result)
        return result
    }

    toCheckOut= () => {
        // Id User
        let idUser = localStorage.getItem ("id")

        // Date
        let date = new Date ()
        date = date.toString ()
        
        let newDate = date.split (" ")[2] + "-" + date.split (" ")[1] + "-" + date.split (" ")[3] + " " + date.split (" ")[4] 

        // Total Price
        let total = this.state.totalPrice

        // DataDetail
        let detailItems = this.state.dataCart.map ((el, i) => {
            return {
                productName: this.state.dataProducts[i].name,
                productPrice: this.state.dataProducts[i].price,
                quantity: el.quantity,
                productImage: this.state.dataProducts[i].image1
            }
        })

        // Data
        let dataToSend = {
            idUser: idUser,
            status: "unpaid",
            createdAt: newDate,
            totalPrice: total,
            detail: detailItems
        }
        
        Axios.post (linkAPITransactions, dataToSend) 

        .then ((res) => {
            this.setState ({idTransaction: res.data.id})
            this.deleteCart ()
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    deleteCart = () => {
        this.state.dataCart.forEach ((el, i) => {

            Axios.delete (linkAPICarts + `/${el.id}`)

            .then ((res) => {
                window.location = `/payment/${this.state.idTransaction}`
            })

            .catch ((err) => [
                console.log (err)
            ])
        })
    }

    componentDidMount () {
        this.getDataCart ()
        // this.getDataProduct ()
    }

    

    render () {
        if (this.state.dataCart === null || this.state.dataProducts === null || this.state.totalPrice === null) {
            return (
                <div className="container">
                    <div className="row mt-3">
                        <h1>
                            Cart
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
                            Cart
                        </h1>
        
                        <div className="bg-success col-12" style={{height:"5px"}}></div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-6">
                            <h3>
                                Items :
                            </h3>
                            {
                                this.mapDataCart ()
                            }
                        </div>

                        <div className="col-6">
                            <div className="col-12">
                                <h3>
                                    Summary Order :
                                </h3>
                                {
                                    this.mapDataSummary ()
                                }
                            </div>

                            <div className="col-12">
                                <div className="container">
                                    <h4>
                                        Total : Rp. {(this.state.totalPrice).toLocaleString ("id-Id")}
                                    </h4>
                                </div>
                            </div>


                            <div className="col-6">
                                <div className="container">
                                    <input type="button" value="Payment" className="btn btn-success" onClick={this.toCheckOut}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )

        }

        
    }
}

export default Cart