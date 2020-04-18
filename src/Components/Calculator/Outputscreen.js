import React from "react";
import "./Outputscreen.css";

export default class Outputscreen extends React.Component {
  render() {
    return (
      <div className="fulloutput">
        <input
          type="text"
          className="disp"
          value={this.props.result}
          readOnly
        />
        <input type="text" className="disp" value={this.props.calc} readOnly />
      </div>
    );
  }
}
