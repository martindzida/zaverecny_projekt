import React, { Component } from "react";

class Board extends Component {
  state = {
    months: [
      "Leden",
      "Únor",
      "Březen",
      "Duben",
      "Květen",
      "Červen",
      "Červenec",
      "Srpen",
      "Září",
      "Říjen",
      "Listopad",
      "Prosinec",
    ],
    monthIndex: 11,
    year: 2020,
  };

  //Metoda pro změnu roku dozadu
  handleYearDecrement = () => {
    if (this.state.year > 2010) {
      this.setState({
        year: this.state.year - 1,
      });
    }
  };

  //Metoda pro změnu roku dopředu
  handleYearIncrement = () => {
    let cur_date = new Date();
    let cur_month = cur_date.getMonth();
    let max_year = cur_date.getFullYear();
    if (this.state.year < max_year) {
      if (
        !(this.state.year === max_year - 1 && this.state.monthIndex > cur_month)
      ) {
        this.setState({
          year: this.state.year + 1,
        });
      }
    }
  };

  //Metoda pro změnu měsíce dozadu
  handleMonthDecrement = () => {
    if (this.state.monthIndex === 0 && this.state.year > 2010) {
      this.setState({
        monthIndex: 11,
        year: this.state.year - 1,
      });
    } else {
      if (this.state.year >= 2010 && this.state.monthIndex >= 1) {
        this.setState({
          monthIndex: this.state.monthIndex - 1,
        });
      }
    }
  };

  //metoda pro změnu měsíce dopředu
  handleMonthIncrement = () => {
    //Práce s aktuálním datem
    let cur_date = new Date();
    let cur_month = cur_date.getMonth();
    let max_year = cur_date.getFullYear();
    if (this.state.monthIndex === 11 && this.state.year < max_year) {
      this.setState({
        monthIndex: 0,
        year: this.state.year + 1,
      });
    } else {
      if (this.state.year < 2020) {
        this.setState({
          monthIndex: this.state.monthIndex + 1,
        });
      } else {
        if (this.state.monthIndex < cur_month) {
          this.setState({
            monthIndex: this.state.monthIndex + 1,
          });
        }
      }
    }
  };

  render() {
    return (
      <div>
        <div className="row p-3 m-3">
          <div className="col-1 text-left">
            <button
              id="year_left"
              className="btn"
              onClick={this.handleYearDecrement}
            >
              <i
                className="fa fa-angle-double-left fa-3x"
                aria-hidden="true"
                style={{ color: "white" }}
              ></i>
            </button>
          </div>
          <div className="col-1 text-left">
            <button
              id="mnth_left"
              className="btn"
              onClick={this.handleMonthDecrement}
            >
              <i
                className="fa fa-angle-left fa-3x"
                aria-hidden="true"
                style={{ color: "white" }}
              ></i>
            </button>
          </div>
          <div className="col-8 text-center">
            <h3 className="display-4 ">
              {this.state.months[this.state.monthIndex] + " " + this.state.year}
            </h3>
          </div>
          <div className="col-1 text-right">
            <button
              id="mnth_right"
              className="btn"
              onClick={this.handleMonthIncrement}
            >
              <i
                className="fa fa-angle-right fa-3x"
                aria-hidden="true"
                style={{ color: "white" }}
              ></i>
            </button>
          </div>
          <div className="col-1 text-right">
            <button
              id="year_right"
              className="btn"
              onClick={this.handleYearIncrement}
            >
              <i
                className="fa fa-angle-double-right fa-3x"
                aria-hidden="true"
                style={{ color: "white" }}
              ></i>
            </button>
          </div>
        </div>
        <div className="row m-4">
          <div className="col-12">
            <table className="table">
              <thead>
                <tr scope="row">
                  <th className="bg-info">Neodstartováno</th>
                  <th className="bg-danger">V průběhu</th>
                  <th className="bg-warning">Pozastaveno</th>
                  <th className="bg-primary">Dokončuje se</th>
                  <th className="bg-success">Hotovo</th>
                </tr>
              </thead>
              <tbody>
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
