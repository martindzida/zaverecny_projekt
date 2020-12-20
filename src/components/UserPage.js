import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import woke from "../images/woke.jpg";

class UserPage extends Component {
  state = {};

  // Nahrání údajů o uživateli (jméno, příjmení, obrázek, popisek atd.)
  //componentDidMount() {}

  render() {
    return (
      <div>
        <Navbar isLoggedIn={true} />
        <div className="container">
          <div className="card center p-5 m-5 bg-dark border-primary text-white">
            <div className="row p-5 m-2">
              <div className="col-4">
                <img
                  src={woke}
                  alt="nefunguje to xd"
                  width={100}
                  height={100}
                  className="rounded-circle"
                />
              </div>
              <div className="col-8">
                <h1>Franta Brambor</h1>
              </div>
            </div>
            <div className="row center p-3 m-2">
              <div className="col-12">
                <div className="card bg-dark border-primary text-white">
                  <p>Profile bio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default UserPage;
