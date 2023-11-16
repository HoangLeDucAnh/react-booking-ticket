import React, { Component } from "react";
import { connect } from "react-redux";
import { REMOVE, THANH_TOAN } from "./redux/constant/paraNames";

class Cart extends Component {
  render() {
    const { cart, removeFromCart, totalPrice, thanhToan } = this.props;
    return (
      <div>
        <h1 className="mb-3 text-center text-2xl">DANH SÁCH GHẾ BẠN CHỌN</h1>
        <div className="flex items-center gap-1 mb-3">
          <span
            style={{
              width: "25px",
              height: "25px",
              backgroundColor: "orange",
              display: "inline-block",
              borderRadius: "5px",
            }}
          ></span>
          <span>Ghế đã đặt</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <span
            style={{
              width: "25px",
              height: "25px",
              backgroundColor: "green",
              display: "inline-block",
              borderRadius: "5px",
            }}
          ></span>
          <span>Ghế đang chọn</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <span
            style={{
              width: "25px",
              height: "25px",
              backgroundColor: "gray",
              display: "inline-block",
              borderRadius: "5px",
            }}
          ></span>
          <span>Ghế chưa chọn</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Số ghế</th>
              <th>Giá</th>
              <th>Hủy</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.soGhe}</td>
                  <td>{item.gia}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        removeFromCart(item.soGhe);
                      }}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>Tổng tiền: {totalPrice}</td>
              <td>
                <div className="btn btn-success" onClick={() => thanhToan()}>
                  Thanh Toán
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    cart: state.cart,
    totalPrice: state.totalPrice,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (id) => {
      let action = {
        type: REMOVE,
        payload: id,
      };
      dispatch(action);
    },
    thanhToan: () => {
      let action = {
        type: THANH_TOAN,
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
