import React, { Component } from "react";
import SeatsView from "./SeatsView";
import Cart from "./Cart";

export default class HomePage extends Component {
  render() {
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <SeatsView />
        </div>
        <Cart />
      </div>
    );
  }
}
