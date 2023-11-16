import { seatsArr } from "../../data";
import { ADD, REMOVE, THANH_TOAN } from "../constant/paraNames";

let initialState = {
  seats: seatsArr,
  cart: [],
  totalPrice: null,
  bill: [],
};

export let bookingTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD: {
      //ghe is object, hang is string
      let newCart = [...state.cart];

      // find soGhe in newCart
      let index = newCart.findIndex(
        (ele) => ele.soGhe === action.payload.ghe.soGhe
      );

      let newSeats = [...state.seats];
      // find position of hang in newSeats
      let indexHang = newSeats.findIndex(
        (item) => item.hang === action.payload.hang
      );

      //lấy ra object chứa hàng đó trong seats vd {hang: "A", danhSachGhe: Array(16)}
      let newHang = newSeats[indexHang];
      //lấy ra danh sách ghế từ object trên
      let newHangGhe = [...newHang.danhSachGhe];
      //lấy ra vị trí ghế trong danh sách ghế trên
      let indexSeat = newHangGhe.findIndex((item) => {
        return item.soGhe === action.payload.ghe.soGhe;
      });
      //cập nhật trạng thái daDat
      state.seats[indexHang].danhSachGhe[indexSeat] = {
        ...newHangGhe[indexSeat],
        daDat: true,
      };

      if (index === -1) {
        let newGhe = { ...action.payload.ghe, dangChon: true };
        newCart.push(newGhe);
      }
      let totalPrice = 0;
      newCart.forEach((item) => {
        totalPrice += item.gia;
      });
      state.totalPrice = totalPrice;
      state.cart = newCart;

      //cập nhật seats = array mới newSeats
      return { ...state, seats: [...newSeats] };
    }
    case REMOVE: {
      let hang = action.payload.substring(0, 1);
      let newSeats = [...state.seats];
      let indexHang = newSeats.findIndex((item) => item.hang === hang);
      let newChairsList = [...newSeats[indexHang].danhSachGhe];
      let indexSeat = newChairsList.findIndex(
        (item) => item.soGhe === action.payload
      );
      state.seats[indexHang].danhSachGhe[indexSeat] = {
        ...newChairsList[indexSeat],
        daDat: false,
      };

      let ghe = state.cart.find((item) => item.soGhe === action.payload);
      let newCart = state.cart.filter((ghe) => ghe.soGhe !== action.payload);
      state.totalPrice -= ghe.gia;
      state.cart = newCart;

      return { ...state, seats: [...newSeats] };
    }
    case THANH_TOAN: {
      let gheDaDat = state.cart.map((item) => {
        return { ...item, daDat: true, dangChon: false };
      });
      state.bill = [...gheDaDat];
      state.cart = [];
      state.totalPrice = null;
      return { ...state };
    }

    default:
      return state;
  }
};
