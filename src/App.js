import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Redirect
} from "react-router-dom"

// Component
import Navbar from "./Components/Navbar"

// Pages
import LandingPage from "./Pages/LandingPage"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import DetailProduct from "./Pages/DetailProduct"
import Cart from "./Pages/Cart"
import Payment from "./Pages/Payment"
import TransactionHistory from "./Pages/TransactionHistory"

// CSS
import "./Stylesheets/Utility.css"


class App extends React.Component {
  render () {
    return (
      <>
      <Router>
        <Navbar></Navbar>

        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route path="/detail-product/:idProduct" component={DetailProduct}></Route>
          <Route path="/cart/:idUser" component={Cart}></Route>
          <Route path="/payment/:idTransaction" component={Payment}></Route>
          <Route path="/user/:idUser/user-history" component={TransactionHistory}></Route>

          {
            localStorage.getItem ("id") ?
              <Redirect to={{pathname: "/"}}></Redirect>
            :
              <Route path="/register" component={Register}></Route>
              
          }

          {
            localStorage.getItem ("id") ?
              <Redirect to={{pathname: "/"}}></Redirect>
            :
              <Route path="/login" component={Login}></Route>
          }

          

          

        </Switch>

      </Router>
      </>
    )
  }
}

export default App;
