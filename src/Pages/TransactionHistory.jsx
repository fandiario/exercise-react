import React from "react"
import Axios from "axios"

import linkAPITransactions from "../Supports/Constants/LinkAPITransactions"

class TransactionHistory extends React.Component {
    state={
        dataTransaction : null
    }

    getDataTransaction = () => {
        let idUser = localStorage.getItem ("id")
        Axios.get (linkAPITransactions + `?idUser=${idUser}`)

        .then ((res) => {
            this.setState ({dataTransaction: res.data})
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    goToPayment = (idTransaction) => {
        window.location=`/payment/${idTransaction}`
    }

    mapDataTransaction = () => {
        return this.state.dataTransaction.map ((el, i) => {
            return (
                <div key={i}>
                    <div className="d-flex flex-column shadow">
                        
                        <div className="col-6">
                            <div>
                                Status: {el.status}
                            </div>
                            <div>
                                User : {el.idUser}
                            </div>
                        </div>
                        
                        <div className="col-8">
                            {el.detail.map ((val, j) => {
                                return (
                                    <div key={j}>
                                        <div className="row">
                                            <div className="col-3">
                                                <img src={val.productImage} className="img-fluid" style={{width: "auto", height: "100px"}} alt=""/>
                                            </div>
                                            

                                            <div className="col-8">
                                                <h5>
                                                    {val.productName}
                                                </h5>
                                            </div>
                                        </div>
                                        
                                    </div>
                                )
                            })}
                        </div>

                        

                        
                        
                        <div className="col-12 d-flex justify-content-end my-3">
                            {
                                el.status === "unpaid" ?
                                    <input type="button" value="Pay Now" className="btn btn-success" onClick={() => this.goToPayment(el.id)}/>
                                :
                                    null

                            }
                        </div>

                    </div>
                </div>
            )
        })
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
                            History Transaction
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
                            History Transaction
                        </h1>
    
                        <div className="bg-success col-12" style={{height:"5px"}}></div>
                    </div>
    
                    <div className="row mt-3">
                            {this.mapDataTransaction ()}
                    </div>
                </div>
            )
        }
        
    }
}

export default TransactionHistory