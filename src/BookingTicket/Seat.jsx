import React, { Component } from "react";
import { ADD, REMOVE } from "./redux/constant/paraNames";
import { connect } from "react-redux";
class Seat extends Component {
  handleChoose = (id, cart) => {
    let index = cart.findIndex((ele) => ele.soGhe === id);
    //nhấn lần 1, chưa có trong cart, return false ==> addToCart
    //nhấn lần 2, có trong cart, lúc này addToCart thêm dangChon: true, return true ==> removeFromCart
    if (index !== -1) {
      return cart[index].dangChon;
    } else {
      return false;
    }
  };
  clicked = true;
  render() {
    const { ghe, addToCart, removeFromCart, hang, cart } = this.props;

    return (
      <div
        className={
          this.handleChoose(ghe.soGhe, cart)
            ? "bg-success"
            : ghe.daDat
            ? "bg-warning"
            : ""
        }
        id={ghe.soGhe}
      >
        <input
          type="checkbox"
          style={{
            position: "absolute",
            opacity: 0,
            width: "20px",
            height: "20px",
            cursor: "pointer",
          }}
          onChange={() => {
            if (this.handleChoose(ghe.soGhe, cart)) {
              removeFromCart(ghe.soGhe);
            } else {
              addToCart({ ghe, hang });
            }
          }}
        />

        {ghe.soGhe}
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (value) => {
      let action = {
        type: ADD,
        payload: value,
      };
      dispatch(action);
    },
    removeFromCart: (id) => {
      let action = {
        type: REMOVE,
        payload: id,
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Seat);
