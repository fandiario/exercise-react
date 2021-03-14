import React from "react"
import Axios from "axios"
import swal from "sweetalert"

import linkAPIUsers from "../Supports/Constants/LinkAPIUsers"

class Login extends React.Component {

    state = {
        errEmail: null,
        emailValid: false,
        errPassword: null,
        passwordValid: false,   
        dataUser: null
    }

    checkEmail = () => {
        let emailInput = this.refs.emailLogin.value

        Axios.get (linkAPIUsers + `?email=${emailInput}`)

        .then ((res) => {
            if (res.data.length === 1) {
                this.setState ({errEmail: null})
                this.setState ({emailValid: true})
            
            } else {
                this.setState ({errEmail: "Email is not found."})
            }
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    checkPassword = () => {
        let emailInput = this.refs.emailLogin.value
        let passInput = this.refs.passLogin.value

        Axios.get (linkAPIUsers + `?email=${emailInput}`)

        .then ((res) => {
            if (res.data[0].password === passInput) {
                this.setState ({errPassword: null})
                this.setState ({passwordValid: true})
            
            } else {
                this.setState ({errPassword: "Password doesn't match"})
            }
        })

        .catch ((err) => {
            console.log (err)
        })
    }

    getLoggedIn = () => {
        let emailInput = this.refs.emailLogin.value

        if (this.state.emailValid === true && this.state.passwordValid === true) {

            Axios.get (linkAPIUsers + `?email=${emailInput}`)

            .then ((res) => {
                this.setState ({dataUser: res.data[0]})
                this.storeIdandEmail ()

                swal ({
                    title: "Logged In",
                    text: "Successfully logged in",
                    icon: "success",
                })

                setTimeout (function () {window.location = "/"}, 1000)
            })

            .catch ((err) => {
                console.log (err)
            })
        
        } else {
            swal ({
                title: "Error",
                text: "Failed to log in",
                icon: "error",
            })

        }

    }

    storeIdandEmail = () => {
        let idUser = this.state.dataUser.id
        let emailUser = this.state.dataUser.email

        localStorage.setItem("id", idUser)
        localStorage.setItem ("email", emailUser)
    }

    render () {
        return (
            <div className="container">
               <div className="row">
                   <h1>
                       Login
                   </h1>

                   <div className="bg-success col-12" style={{height:"5px"}}></div>
               </div>

               <div className="row flex-column align-items-center mt-3">
                   <div className="col-6 shadow">
                       <div className="col-12">
                           <label htmlFor="emailLogIn">Email</label>
                           <input type="text" className="form-control" ref="emailLogin" onChange={this.checkEmail}/>
                           {
                               this.state.errEmail ?
                                    <small className="text-muted">
                                        {this.state.errEmail}
                                    </small>
                                    
                                :
                                    null
                           }
                       </div>
                       <div className="col-12">
                            <label htmlFor="passLogIn">Password</label>
                            <input type="password" ref="passLogin" className="form-control" onChange={this.checkPassword}/>
                            {
                               this.state.errPassword ?
                                    <small className="text-muted">
                                        {this.state.errPassword}
                                    </small>
                                    
                                :
                                    null
                           }
                       </div>
                       <div className="col-12 d-flex justify-content-end my-3">
                           <input type="button" value="Login" className="btn btn-success" onClick={this.getLoggedIn}/>
                       </div>
                   </div>

               </div>
            </div>
        )
    }
}

export default Login