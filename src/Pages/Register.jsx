import React from "react"
import Axios from "axios"
import swal from "sweetalert"

import emailValidation from "../Supports/Functions/emailValidation"
import passwordValidation from "../Supports/Functions/passwordValidation"

import linkAPIUsers from "../Supports/Constants/LinkAPIUsers"

class Register extends React.Component {

    state = {
        errEmail: null,
        emailSubmit: null,
        emailValid: false,
        errPass: null,
        passSubmit: null,
        passValid: false,
        errConfPass: null,
    }

    emailCheck = () => {
        let emaiInput = this.refs.emailInput.value
        let emailValidRes = emailValidation (emaiInput)

        if (emailValidRes !== true) {
            this.setState ({errEmail: "Incorrect email format"})
        
        } else {
            this.setState ({errEmail: null})

            Axios.get (linkAPIUsers + `?email=${emaiInput}`)

            .then ((res) => {
                if (res.data.length > 0 ) {
                    this.setState ({errEmail: "This email has been registered"})
                
                } else {
                    this.setState ({emailSubmit: emaiInput})
                    this.setState ({emailValid: true})
                } 

            })

            .catch ((err) => {
                console.log (err)
            })

        }


    }

    passwordCheck = () => {
        let passInput = this.refs.passwordInput.value
        let passValidRes = passwordValidation (passInput)

        if (passValidRes !== true) {
            this.setState ({errPass: "Min. password length is 8 letters "})
        
        } else {
            this.setState ({errPass: null})

            Axios.get (linkAPIUsers + `?password=${passInput}`)

            .then ((res) => {
                if (res.data.length > 0) {
                    this.setState ({errPass: "This password has been registered"})
                }
            })

            .catch ((err) => {
                console.log (err)
            })
        }
    }

    passConfirmCheck = () => {
        let passInput = this.refs.passwordInput.value
        let confPassInput = this.refs.confPassInput.value

        if (confPassInput === passInput) {
            this.setState ({errConfPass: null})
            this.setState ({passSubmit: passInput})
            this.setState ({passValid: true})
        
        } else {
            this.setState ({errConfPass: "Your password doesn't match with confirmed password"})
        }
        

    }


    register = () => {
        // this.emailCheck ()
        // this.passwordCheck ()
        // this.passConfirmCheck ()

        let dataToSend = {
            email: this.state.emailSubmit,
            password: this.state.passSubmit
        }

        console.log ("Before Axios")
        console.log (this.state.passValid)
        console.log (this.state.emailValid)

        if (this.state.passValid === true && this.state.emailValid === true) {
            console.log ("Check statement")
            
            Axios.post (linkAPIUsers, dataToSend) 

            .then ((res) => {
                // console.log (res)

                if (res.status === 201) {

                    swal ({
                        title: "Registered",
                        text: "Your data has been registered",
                        icon: "success",
                    })

                    this.refs.emailInput = ""
                    this.refs.passwordInput = ""
                    this.refs.confPassInput = ""

                    localStorage.setItem ("id", res.data.id)
                    
                    setTimeout (function () {window.location = "/"}, 1000)
                    // window.location = "/"
                
                } else {

                    swal ({
                        title: "Error",
                        text: `Error code ${res.status}`,
                        icon: "error",
                    })

                }
            })

            .catch ((err)=> {
                console.log (err)
            })

        } else {
            swal ({
                title: "Error",
                text: `You have to fill every datafield.`,
                icon: "error",
            })
        }

    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <h1>
                        Register
                    </h1>
                    <div className="bg-success col-12" style={{height:"5px"}}></div>
                    <div className="mx-auto mt-3">
                        {
                            this.state.errEmail ?
                                <div class="alert alert-danger" role="alert">
                                    {
                                        this.state.errEmail
                                    }
                                </div>
                            :
                                null
                        }

                        {   
                            this.state.errPass ?
                                <div class="alert alert-danger" role="alert">
                                    {
                                        this.state.errPass
                                    }
                                </div>
                            :
                                null
                        }

                        {   
                            this.state.errConfPass ?
                                <div class="alert alert-danger" role="alert">
                                    {
                                        this.state.errConfPass
                                    }
                                </div>
                            :
                                null
                        }

                    </div>
                </div>

                
                <div className="row flex-column align-items-center mt-3">
                    <div className="col-6 shadow">
                        <div className="col-12">
                            <label htmlFor="emailInput">Email: </label>
                            <input type="text" className="form-control" ref="emailInput" onChange={this.emailCheck}/>
                            <small className="text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="col-12">
                            <label htmlFor="passwordInput">Password: </label>
                            <input type="password" ref="passwordInput" className="form-control" onChange={this.passwordCheck}/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="confPassInput">Confirm Password: </label>
                            <input type="password" className="form-control" ref="confPassInput" onChange={this.passConfirmCheck}/>
                        </div>

                        <div className="col-12 my-3 d-flex justify-content-end">
                            <input type="button" value="Register" className="btn btn-success" onClick={this.register}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register