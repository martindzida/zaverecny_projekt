import React, { Component } from "react";
import Board from "./Board";
import UpdateLog from "./UpdateLog";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import UserRemoveModal from "./modals/UserRemoveModal";
import woke from "../images/woke.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

class Main extends Component {
  state = {
    logs: [
      <UpdateLog key={1} id={1} imgSrc={woke} name="Prokop" content="GG" />,
      <UpdateLog key={5} id={5} imgSrc={woke} name="Buben" content="WP" />,
      <UpdateLog key={7} id={7} imgSrc={woke} name="Lukáš" content="GLHF" />,
    ],
    users: [
      { key: 1, id: 1, imgSrc: "", name: "Franta Vopršálek" },
      { key: 2, id: 2, imgSrc: "", name: "Pepa Zdepa" },
      { key: 3, id: 3, imgSrc: "", name: "Karel Jednička" },
      { key: 4, id: 4, imgSrc: "", name: "Franta Vopršálek" },
      { key: 5, id: 5, imgSrc: "", name: "Pepa Zdepa" },
      { key: 6, id: 6, imgSrc: "", name: "Karel Jednička" },
    ],
    modal: false,
    modalValue: null,
    removeUserId: null,
    removeUserName: "",
  };

  //Načtení dat z backendu

  /*componentDidMount() {
    axios.get("/profiles").then((res) => {
      const users = res.data;
      //Uložení pole komponentů UpdateLog do this.state.logs
      const receivedData = users.map((user) => (
        <UpdateLog
          key={user.id}
          id={user.id}
          name={user.first_name}
          content={user.last_name}
          imgUrl={user.profile_pic}
        />
      ));
      this.setState({
        logs: receivedData,
      });
    });
  }*/

  //Metoda na seřazení logů a k ním příslušným komentářům, která je teď naprosto zbytečná :))))))

  /*postSorting() {
    let output = [];
    let logs = this.state.logs;
    let comments = this.state.comments;
    let usedIds = [];
    let sortedComments = [];
    let filtered = [];
    let index;
    comments.map((comment) => {
      if (!usedIds.includes(comment.props.parentId)) {
        filtered = comments.filter(
          (filter) => filter.props.parentId === comment.props.parentId
        );
        sortedComments.push(filtered);
        usedIds.push(comment.props.parentId);
      }
    });
    logs.map((log) => {
      output.push(log);
      if (usedIds.find((item) => item === log.props.id)) {
        index = usedIds.indexOf(log.props.id);
        output.push(sortedComments[index]);
      }
    });

    return output;
  }*/

  getModalValue = (value) => {
    this.setState({
      modal: false,
      modalValue: value,
    });
  };

  render() {
    return (
      <div>
        <UserRemoveModal
          show={this.state.modal}
          value={this.getModalValue}
          name={this.state.removeUserName}
        />
        <Navbar isLoggedIn={true} />
        <div className="wrapper">
          <Sidebar
            users={this.state.users}
            handleRemoveUser={(id, name) => {
              this.setState({
                modal: true,
                removeUserId: id,
                removeUserName: name,
              });
            }}
          />
          <div className="container">
            <div className="p-3 m-5">
              <Board />
            </div>
            <div className="row p-3 m-5">
              <div className="col-12">{this.state.logs}</div>
            </div>
            <div className="row center p-3 m-4">
              <div className="col-12">
                <button className="btn btn-success p-2">
                  <i className="fa fa-plus m-1" aria-hidden="true"></i> Přidat
                  příspěvek
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Main;
