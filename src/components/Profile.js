import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SubmitButton from "./SubmitButton";
import ProfModal from "./modals/ProfModal";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getImage } from "../redux/actions/actions";
import { getUser } from "../redux/actions/actions";
import store from "../redux/store";
import axios from "axios";

class Profile extends Component {
  state = {
    firstName: "",
    lastName: "",
    comment: "",
    imageSrc: null,
    imageName: "Nahrát obrázek",
    password1: "",
    password2: "",
    modal: false,
    error: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    /*if (this.state.password1.localeCompare(this.state.password2) === 0) {
      axios
        .patch(
          "/auth/password/change",
          {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            comment: this.state.comment,
            new_password1: this.state.password1,
            new_password2: this.state.password2,
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.setState({
        modal: true,
      });
    }*/
    this.props.getUser();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFileSelect = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const fileType = event.target.files[0].type;
    const requiredTypes = ["image/png", "image/jpeg", "image/gif"];
    let correctType = false;

    //MAXIMÁLNÍ VELIKOST OBRÁZKU - 10MB
    //Ověřování formátu souboru, protože parametr accept u inputu se dá jaksi obejít
    requiredTypes.forEach((type) => {
      if (fileType === type) {
        correctType = true;
      }
    });

    //Metoda nahrávání souboru jako lokální url
    if (correctType) {
      /*const localImageUrl = window.URL.createObjectURL(file);
      this.setState({
        imageSrc: localImageUrl,
        imageName: file.name,
      });
      this.props.getImage(localImageUrl);*/

      //Metoda nahrávání souboru jako base64 string(oof)

      const reader = new FileReader();
      reader.onload = () => {
        this.setState({
          imageSrc: reader.result,
        });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      this.setState({
        imageSrc: null,
        imageName: "Nepodporovaný formát",
      });
      //this.props.getImage("");
    }
  };

  render() {
    console.log(store.getState().user);

    //Kontrola, jestli jsou obě zadaná hesla stejná
    let passwordsComp;
    if (this.state.password1.localeCompare(this.state.password2) !== 0) {
      passwordsComp = (
        <small className="text-danger">Hesla se neshodují.</small>
      );
    }

    let image;
    if (this.state.imageSrc !== null) {
      image = (
        <img
          src={this.state.imageSrc}
          alt="profile_image"
          width={100}
          height={100}
          className="rounded-circle"
        />
      );
    }
    let imageForm;
    if (this.state.imageSrc === null) {
      imageForm = (
        <div className="form-group row">
          <div className="col-4">
            <label className="col-form-label col-form-label-lg">
              Profilový obrázek
            </label>
          </div>
          <div className="col-8">
            <div className="custom-file">
              <input
                type="file"
                name="image"
                id="prof_image"
                accept={["image/png", "image/jpeg", "image/gif"]}
                className="border-primary form-control custom-file-input"
                onChange={this.handleFileSelect}
              ></input>
              <label className="custom-file-label">
                {this.state.imageName}
              </label>
            </div>
          </div>
        </div>
      );
    } else {
      imageForm = (
        <div className="form-group row">
          <div className="col-4">
            <label className="col-form-label col-form-label-lg">
              Profilový obrázek
            </label>
          </div>
          <div className="col-5">
            <div className="custom-file">
              <input
                type="file"
                name="image"
                id="prof_image"
                accept={["image/png", "image/jpeg", "image/gif"]}
                className="border-primary form-control custom-file-input"
                onChange={this.handleFileSelect}
              ></input>
              <label className="custom-file-label">
                {this.state.imageName}
              </label>
            </div>
          </div>
          <div className="col-3">{image}</div>
        </div>
      );
    }

    return (
      <div>
        <ProfModal
          show={this.state.modal}
          onHide={() => {
            this.setState({ modal: false });
          }}
        />
        <Navbar isLoggedIn={true} />
        <div className="container">
          <div className="row center p-3 m-5">
            <div className="col-12">
              <h1>Nastavení profilu</h1>
            </div>
          </div>
          <div className="card center p-5 m-5 bg-dark border-primary text-white">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <div className="col-4">
                  <label className="col-form-label col-form-label-lg">
                    Jméno
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="border-primary form-control"
                    placeholder="Zadejte jméno"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-4">
                  <label className="col-form-label col-form-label-lg">
                    Příjmení
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="border-primary form-control"
                    placeholder="Zadejte jméno"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              {imageForm}
              <div className="form-group row">
                <div className="col-4">
                  <label className="col-form-label col-form-label-lg">
                    Popisek
                  </label>
                </div>
                <div className="col-8">
                  <textarea
                    type="text"
                    name="comment"
                    id="comment"
                    className="border-primary form-control"
                    placeholder="Zadejte popisek"
                    maxLength={150}
                    rows={2}
                    value={this.state.comment}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-4">
                  <label className="col-form-label col-form-label-lg">
                    Heslo
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="password"
                    name="password1"
                    id="prof_password1"
                    className="border-primary form-control"
                    placeholder="Zadejte heslo"
                    value={this.state.password1}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-4">
                  <label className="col-form-label col-form-label-lg">
                    Potvrzení hesla
                  </label>
                </div>
                <div className="col-8">
                  <input
                    type="password"
                    name="password2"
                    id="prof_password2"
                    className="border-primary form-control"
                    placeholder="Zadejte znovu heslo"
                    value={this.state.password2}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
              <SubmitButton text="Odeslat" />
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(null, { getUser })(Profile);
