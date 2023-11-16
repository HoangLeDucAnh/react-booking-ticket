import React, { Component } from "react";
import { connect } from "react-redux";
import Seat from "./Seat";

class SeatsView extends Component {
  render() {
    const { seats } = this.props;
    return (
      <div>
        {seats?.map((item, index) => {
          return (
            <div key={index}>
              <span className="firstChar">{item.hang}</span>
              {item.danhSachGhe.map((ghe, index) => {
                return (
                  <span key={index} className="mx-2 rowNumber">
                    <Seat hang={item.hang} ghe={ghe} />
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    seats: state.seats,
  };
};
export default connect(mapStateToProps, null)(SeatsView);
