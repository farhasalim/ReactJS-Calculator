import React from "react";
import Outputscreen from "./Outputscreen.js";
import "./Calculator.css";
//import Digits from "./Digits.js";
//import Header from "./Header/Header.js";

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 0,
      calc: "",
    };
  }

  onClickFunc = (e) => {
    const thenum = e.target.value;
    if (thenum === "C") {
      this.clearhandle();
    } else if (thenum === "CE") {
      this.backspace(this.state.calc);
    } else if (thenum === "Show Postfix Expression") {
      this.setState({
        result: this.itop(this.sepvals(this.state.calc)) + "",
      });
    } else if (thenum === "=") {
      this.findresult(this.state.calc);
    } else {
      this.setState(
        {
          result: 0,
          calc: this.state.calc + thenum + "",
        },
        () => {
          console.log(this.state.result);
          console.log(this.state.calc);
        }
      );
    }
  };

  clearhandle = () => {
    this.setState(
      {
        result: 0,
        calc: "",
      },
      () => {
        console.log(this.state.calc);
      }
    );
  };

  backspace = () => {
    this.setState({
      calc: this.state.calc.slice(0, -1),
    });
  };

  findresult = (exp) => {
    try {
      this.setState(
        {
          result: this.posteval(this.itop(this.sepvals(exp))) + "",
        },
        () => {
          console.log(this.posteval(this.itop(this.sepvals(exp))));
        }
      );
    } catch (e) {
      this.setState({
        result: "error",
      });
    }
  };

  sepvals = (exp) => {
    const vals = [];
    var numstring = "" + exp.charAt(0);
    for (var i = 1; i < exp.length + 1; i++) {
      if (!isNaN(exp.charAt(i))) {
        numstring += exp.charAt(i);
      } else if (exp.charAt(i) == "-" || "+" || "*" || "/") {
        vals.push(numstring);
        vals.push(exp.charAt(i));
        numstring = "";
      } else {
        numstring = "";
      }
    }
    vals.push(numstring);
    return vals;
  };

  prec = (op) => {
    switch (op) {
      case "+":
        return 1;

      case "-":
        return 1;

      case "*":
        return 2;

      case "/":
        return 2;

      default:
        return 0;
    }
  };

  peek = (x) => {
    return x[x.length - 1];
  };

  itop = (vals) => {
    const instack = [];
    const poststack = [];
    for (var i = 0; i < vals.length; i++) {
      if (!isNaN(vals[i])) {
        poststack.push(vals[i]);

        continue;
      } else if (this.prec(this.peek(instack)) < this.prec(vals[i])) {
        instack.push(vals[i]);
      } else if (this.prec(this.peek(instack)) >= this.prec(vals[i])) {
        var t = instack.pop();
        poststack.push(t);
        instack.push(vals[i]);
      } else {
        //var k = 0;
      }
    }
    while (instack.length !== 0) {
      var t = instack.pop();
      poststack.push(t);
    }
    return poststack;
  };

  posteval = (poststack) => {
    const opstack = [];
    for (var i = 0; i < poststack.length; i++) {
      if (!isNaN(poststack[i])) {
        opstack.push(poststack[i]);
      } else if (poststack[i] === "+" || "-" || "/" || "*") {
        var res = 0;
        var op2 = opstack.pop();
        var op1 = opstack.pop();
        switch (poststack[i]) {
          case "+":
            res = parseFloat(op1) + parseFloat(op2);
            break;

          case "-":
            res = parseFloat(op1) - parseFloat(op2);
            break;

          case "*":
            res = parseFloat(op1) * parseFloat(op2);
            break;

          case "/":
            res = parseFloat(op1) / parseFloat(op2);
            break;

          default:
            res = 0;
        }
        opstack.push(res);
      } else {
        //var k = 0;
      }
    }
    return opstack.pop();
  };

  render() {
    return (
      <div className="Calculator">
        <h1> CALCULATOR </h1>
        <div className="frame">
          <Outputscreen result={this.state.result} calc={this.state.calc} />
          <div className="keybox" onClick={this.onClickFunc}>
            <div className="row">
              <button id="clear" className="keys" value="C">
                {"C"}
              </button>
              <button id="pe" className="keys" value="Show Postfix Expression">
                {"Show Postfix"}
              </button>
            </div>
            <div className="row">
              <button className="keys" value="7">
                {7}
              </button>
              <button className="keys" value="8">
                {8}
              </button>
              <button className="keys" value="9">
                {9}
              </button>
              <button id="plus" className="keys" value="+">
                {"+"}
              </button>
            </div>
            <div className="row">
              <button className="keys" value="4">
                {4}
              </button>
              <button className="keys" value="5">
                {5}
              </button>
              <button className="keys" value="6">
                {6}
              </button>
              <button id="minus" className="keys" value="-">
                {"-"}
              </button>
            </div>
            <div className="row">
              <button className="keys" value="1">
                {1}
              </button>
              <button className="keys" value="2">
                {2}
              </button>
              <button className="keys" value="3">
                {3}
              </button>
              <button id="star" className="keys" value="*">
                {"*"}
              </button>
            </div>
            <div className="row">
              <button className="keys" value="=">
                {"="}
              </button>
              <button className="keys" value="0">
                {0}
              </button>
              <button className="keys" value="CE">
                {"CE"}
              </button>
              <button className="keys" value="/">
                {"/"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
