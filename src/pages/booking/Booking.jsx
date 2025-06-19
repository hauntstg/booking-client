import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { DateRange } from "react-date-range";
import classes from "./booking.module.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const API_URL = process.env.REACT_APP_API_URL;
let hotelBooking = [];
export default function Booking() {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  const { username, fullName, phoneNumber, email } =
    JSON.parse(localStorage.getItem("user")) || {};
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState([]);
  const navigate = useNavigate();
  const [finalPrice, setFinalPrice] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [err, setErr] = useState({});

  const numberRoomRefs = useRef(new Map());
  const fullNameRef = useRef("");
  const emailRef = useRef("");
  const phoneNumberRef = useRef("");
  const cardNumberRef = useRef("");
  const paymentMethodRef = useRef("");

  let totalDays, totalPrice;
  useEffect(() => {
    try {
      async function fetchData() {
        const res = await fetch(
          API_URL +
            "/search?startDate=" +
            date[0].startDate.getTime() +
            "&endDate=" +
            date[0].endDate.getTime()
        );
        const resData = await res.json();
        setHotel(resData.results.find((h) => h._id === hotelId));
        setCheckedItems({});
        setFinalPrice(0);
        hotelBooking = [];
      }
      fetchData();
      numberRoomRefs.current = new Map();
    } catch (err) {
      console.log(err);
    }
  }, [date]);

  async function handleReserve() {
    const fullNameInput = fullNameRef.current.value.trim();
    const emailInput = emailRef.current.value.trim();
    const phoneNumberInput = phoneNumberRef.current.value.trim();
    const cardNumberInput = cardNumberRef.current.value.trim();
    const paymentMethodInput = paymentMethodRef.current.value;
    if (
      fullNameInput.length === 0 ||
      emailInput.length === 0 ||
      phoneNumberInput.length === 0 ||
      cardNumberInput.length === 0 ||
      paymentMethodInput === "0"
    ) {
      return setErr({
        message:
          "Vui lòng nhập đầy đủ thông tin và lựa chọn phương thức thanh toán!",
      });
    } else {
      setErr({});
    }

    const roomsChecked = Array.from(numberRoomRefs.current.values())
      .filter((checkbox) => checkbox?.checked)
      .map((checkbox) => checkbox.value);

    if (roomsChecked.length === 0) {
      return setErr({ message: "Vui lòng lựa chọn phòng muốn đặt!" });
    } else {
      setErr({});
    }
    // console.log(roomsChecked);
    let dataRoomsBooked = [];
    if (roomsChecked.length > 0) {
      roomsChecked.map((item) => {
        const [idRoom, priceRoom, numberRoom] = item.split("_");
        dataRoomsBooked.push({
          idRoom,
          priceRoom: Number(priceRoom),
          numberRoom: Number(numberRoom),
        });
      });
    }

    const mergedRooms = Object.values(
      dataRoomsBooked.reduce((acc, { idRoom, priceRoom, numberRoom }) => {
        if (!acc[idRoom]) {
          acc[idRoom] = { roomId: idRoom, roomBooked: [] };
        }
        acc[idRoom].roomBooked.push(numberRoom);
        return acc;
      }, {})
    );
    // console.log(mergedRooms);
    const dataBooking = {
      username,
      hotelId,
      room: mergedRooms,
      price: finalPrice,
      payment: paymentMethodRef.current.value,
      dateStart: date[0].startDate,
      dateEnd: date[0].endDate,
      totalDays:
        (date[0].endDate - date[0].startDate) / (1000 * 60 * 60 * 24) + 1,
    };
    console.log(dataBooking);
    const res = await fetch(API_URL + "/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataBooking),
    });
    const resData = await res.json();
    console.log(resData);
    navigate("/transactions");
  }

  const handleCheck = (idRoom, price, numberRooms) => {
    const id = idRoom + "_" + numberRooms;
    console.log(!checkedItems[id]);
    if (!checkedItems[id]) {
      hotelBooking.push({ idRoom, price, numberRooms });
    } else {
      const indexRemove = hotelBooking.findIndex(
        (room) => room.idRoom === idRoom && room.numberRooms === numberRooms
      );
      hotelBooking.splice(indexRemove, 1);
    }
    totalPrice = hotelBooking.reduce((acc, sum) => acc + sum.price, 0);
    totalDays =
      (date[0].endDate - date[0].startDate) / (1000 * 60 * 60 * 24) + 1;
    // console.log(hotelBooking);
    setFinalPrice(totalDays * totalPrice);
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle trạng thái checked/uncheck
    }));
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className={classes.listContainer}>
        <div className={classes.listWrapper}>
          {hotel && (
            <div className={classes.descHotel}>
              <h1>{hotel.name}</h1>
              <p>{hotel.desc}</p>
            </div>
          )}
          {hotel && (
            <div className={classes.priceHotel}>
              <h2>{hotel && <b>${hotel.cheapestPrice}</b>} (1 nights)</h2>
              <button onClick={handleReserve}>Reserve or Book Now!</button>
            </div>
          )}
          <div className={classes.dateRangeHotel}>
            <h2>Dates</h2>
            <div>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()}
              />
            </div>
          </div>
          <div className={classes.formReserveHotel}>
            <h2>Reserve Info</h2>
            <label htmlFor="">Your Full Name:</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              ref={fullNameRef}
              defaultValue={fullName ?? ""}
            />
            <label htmlFor="">Your Email:</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              ref={emailRef}
              defaultValue={email ?? ""}
            />
            <label htmlFor="">Your Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              ref={phoneNumberRef}
              defaultValue={phoneNumber ?? ""}
            />
            <label htmlFor="">Your Identity Card Number:</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              ref={cardNumberRef}
            />
          </div>
          {hotel && (
            <div className={classes.selectRoomsHotel}>
              <h2>Select Rooms</h2>
              <div className={classes.detailRoomsWrap}>
                {hotel.rooms?.map((room, index) => (
                  <div key={index} className={classes.roomsWrap}>
                    <div className={classes.detailRooms}>
                      <p>
                        <strong>{room.title}</strong>
                      </p>
                      {/* <p>{room.desc}</p> */}
                      {/* <p>{room._id}</p> */}
                      <p>
                        Max people: <strong>{room.maxPeople}</strong>
                      </p>
                      <p>
                        <strong>${room.price}</strong>
                      </p>
                    </div>
                    <div className={classes.selectRooms}>
                      {room.roomNumbers.length === 0 ? (
                        <div className={classes.checkboxRooms}>
                          <p>Hết phòng</p>
                          <p>(Fully booked)</p>
                        </div>
                      ) : (
                        room.roomNumbers.map((num, index) => (
                          <div
                            className={classes.checkboxRooms}
                            key={room._id + "_" + num}
                          >
                            <label htmlFor={room._id + "_" + num}>{num}</label>
                            <input
                              type="checkbox"
                              checked={!!checkedItems[room._id + "_" + num]}
                              onChange={() =>
                                handleCheck(room._id, room.price, num)
                              }
                              value={room._id + "_" + room.price + "_" + num}
                              id={room._id + "_" + num}
                              ref={(el) => {
                                if (el) {
                                  const key =
                                    room._id + "_" + room.price + "_" + num;
                                  if (!numberRoomRefs.current.has(key)) {
                                    numberRoomRefs.current.set(key, el);
                                  }
                                }
                              }}
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {hotel && (
            <div className={classes.payRoomsHotel}>
              {<h2>Total Bill: ${finalPrice}</h2>}
              <div className={classes.selectPay}>
                <select ref={paymentMethodRef}>
                  <option value="0">Select Payment Method:</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                </select>
                <button onClick={handleReserve}>Reserve Now</button>
              </div>
              {err && <p>{err.message}</p>}
            </div>
          )}
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
}
