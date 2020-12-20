import React, { Component } from "react";
import { Link } from "react-router-dom";
import woke from "../images/woke.jpg";

class Sidebar extends Component {
  state = {};

  handleDelete = (event) => {
    this.props.handleRemoveUser(
      event.target.id,
      this.props.users[event.target.id - 1].name
    );
  };

  render() {
    let usersArr = this.props.users.map((user) => (
      <div key={user.id} className="row p-1">
        <div className="col-2">
          <img
            src={woke}
            alt="hihi"
            className="mr-2 p-1 img-responsive rounded-circle"
            width={33}
            height={33}
          />
        </div>
        <div className="col-8">
          <Link to={`/users/${user.id}`} style={{ color: "white" }}>
            {user.name}
          </Link>
        </div>
        <div className="col-2">
          <button className="btn p-1 mx-2" onClick={this.handleDelete}>
            <i className="fa fa-user-times" id={user.id} aria-hidden="true"></i>
          </button>
        </div>
      </div>
    ));
    return (
      <nav id="sidebar" className="py-5 px-4">
        <div className="sidebar-header pb-4">
          <h5>Členové skupiny</h5>
        </div>
        <div className="sidebar-body mt-5">{usersArr}</div>
      </nav>
    );
  }
}

export default Sidebar;
