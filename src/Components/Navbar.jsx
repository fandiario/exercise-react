import React from "react"
import Axios from "axios"
import {Link} from "react-router-dom"
import swal from "sweetalert"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import emailShortener from "../Supports/Functions/emailShortener"
import linkAPICarts from "../Supports/Constants/LinkAPICarts"

class Navbar extends React.Component {
    state={
        emailUser: null,
        totalCart: null
    }

    getEmailUser = () => {
        let userEmail = localStorage.getItem ("email")
        if (userEmail === null) {
            this.setState ({emailUser: null})

        } else {
            let emailShortenRes = emailShortener (userEmail)

            this.setState ({emailUser: emailShortenRes})
        }
        
    }
    
    getLoggedOut = () => {
        swal({
            title: "Log Out ?",
            text: "Are you sure you want to log out ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })

        .then((willLogOut) => {
            if (willLogOut) {

                swal ({
                    title: "Logged Out",
                    text: "Successfully logged out",
                    icon: "success",
                })

                localStorage.removeItem ("id")
                localStorage.removeItem ("email")

                setTimeout (function () {window.location = "/"}, 1000)

            } else {
                swal ("Canceled")
            }
        })
    }

    getTotalCart = () => {
        let idUser = localStorage.getItem ("id")

        Axios.get (linkAPICarts + `?userId=${idUser}`)

        .then ((res) => {
            this.setState ({totalCart: res.data.length})
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    getToCartPage = () => {
        let userId = localStorage.getItem ("id")

        userId ?

        window.location = `/cart/${userId}`

        :

        window.location = "/"

    }

    componentDidMount () {
        this.getEmailUser ()
    }

    componentDidUpdate () {
        this.getTotalCart ()
    }


    render () {
        return (
            <>
                <div className="bg-success text-light">
                    <div className="container" style={{height: "40px"}}>
                        <div className="row justify-content-between pt-2 font-weight-bold">
                            <div>
                                <span>
                                    <Link to="/" className="batik-clickable-element batik-link mx-3">TokomBatik</Link> 
                                </span>
                            </div>
                            

                            <div>
                                {
                                    localStorage.getItem ("id") ?
                                    <span>
                                        <span>
                                            Hi, {this.state.emailUser}
                                        </span>

                                        <span className="mr-3 ml-1 batik-clickable-element" onClick={this.getLoggedOut}>
                                            /Log Out ? 
                                        </span>
                                    </span>
                                        
                                    :
                                        <span>
                                            <Link to="/login" className="batik-clickable-element batik-link mx-3">Log In ?</Link> 
                                        </span>
                                }
                                <span className="mr-2">
                                    <FontAwesomeIcon icon= {faUser}></FontAwesomeIcon>
                                </span>

                                <span className="mr-1 batik-clickable-element" onClick={this.getToCartPage}>
                                    <FontAwesomeIcon icon= {faShoppingCart}></FontAwesomeIcon>
                                </span>

                                {
                                    this.state.totalCart ?
                                        <span className="mr-2">
                                            {this.state.totalCart} item(s)
                                        </span>
                                    :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                    
                </div>
            </>
        )
    }
}

export default Navbar