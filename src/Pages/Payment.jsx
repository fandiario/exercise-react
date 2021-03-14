import React from "react"
import Axios from "axios"

import linkAPITransactions from "../Supports/Constants/LinkAPITransactions"

class Payment extends React.Component {
    state={
        dataTransaction : null
    }

    getDataTransaction = () => {
        let idTransaction = this.props.location.pathname.split ("/")[2]
        Axios.get (linkAPITransactions + `/${idTransaction}`)
        
        .then ((res) => {
            // console.log (res.data)
            this.setState ({dataTransaction: res.data})
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    mapDataTransaction = () => {
        return this.state.dataTransaction.detail.map ((el, i) => {
            return (
                <div key = {i}>
                    <div className="row">
                        <div className="col-3">
                            <img src={el.productImage} className="img-fluid" style={{width: "auto", height: "100px"}} alt=""/>
                        </div>

                        <div className="col-3">
                            <h5>
                                {el.productName}
                            </h5>
                        </div>
                        
                        <div className="col-3">
                            {el.quantity} item(s)
                        </div>

                        <div className="col-3">
                            Rp. {(el.quantity * el.productPrice).toLocaleString ("id-Id")}
                        </div>

                    </div>
                    

                </div>
            )
        })
    }

    proceedPayment = () => {
        let idTransaction = this.props.location.pathname.split ("/")[2]
        let idUser = localStorage.getItem ("id")

        let pastDate = this.state.dataTransaction.createdAt
        let pastDay = pastDate.split (" ")[0]
        console.log (pastDay)

        let date = new Date ()
        date = date.toString ()
        let newDate = date.split (" ")[2] + "-" + date.split (" ")[1] + "-" + date.split (" ")[3] + " " + date.split (" ")[4]
        let newDay = date.split (" ")[2] + "-" + date.split (" ")[1] + "-" + date.split (" ")[3]
        console.log (newDay)

        if (newDay === pastDay) {
            Axios.patch (linkAPITransactions + `/${idTransaction}`, {status: "paid", createdAt: newDate})

            .then ((res)=> {
                window.location = `/user/${idUser}/user-history/`
            })

            .catch ((err) => {
                console.log (err)
            })

        } else {
            Axios.patch (linkAPITransactions + `/${idTransaction}`, {status: "canceled", createdAt: newDate})
        
            .then ((res)=> {
                window.location = `/user/${idUser}/user-history/`
            })

            .catch ((err) => {
                console.log (err)
            })
            
        }
        
        
    
    
    }   

    componentDidMount () {
        this.getDataTransaction ()

    }
    render () {

        if (this.state.dataTransaction === null) {
            return (
                <div className="container">
                    <div className="row mt-3">
                        <h1>
                            Payment
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
                            Payment
                        </h1>
                        <div className="bg-success col-12" style={{height:"5px"}}></div>
                    </div>

                    <div className="row mt-3 shadow">
                        {
                            this.mapDataTransaction ()
                        }
                    </div>

                    <div className="row mt-3">
                        <h5>
                        Total : Rp. {(this.state.dataTransaction.totalPrice).toLocaleString ("id-Id")}
                        </h5>
                    </div>

                    <div className="row mt-5">
                        <input type="button" value="Proceed" className="btn btn-success" onClick={this.proceedPayment}/>
                    </div>
                </div>
            )
        }
        
    }
}

export default Payment