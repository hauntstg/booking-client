import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

import classes from "./transaction.module.css";
import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;
export default function Transaction() {
  const { username, userId } = JSON.parse(localStorage.getItem("user")) || {};
  const [transactions, setTransactions] = useState([]);
  // console.log(userId, username);

  useEffect(() => {
    try {
      async function fetchData() {
        const res = await fetch(
          API_URL + "/transactions?username=" + username + "&userId=" + userId
        );
        const resData = await res.json();

        // làm phẳng thuộc tính room
        const transactionData = resData.results.map((transaction) => {
          return {
            ...transaction,
            room: transaction.room.map((r) => r.roomBooked).flat(),
          };
        });
        setTransactions(transactionData);
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className={classes.listContainer}>
        <div className={classes.listWrapper}>
          <h1>Your Transactions</h1>
          <table>
            <thead>
              <tr>
                <th>&nbsp;#&nbsp;</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions &&
                transactions.map((tran, index) => (
                  <tr key={index}>
                    <th>&nbsp;{String(index + 1).padStart(2, "0")}&nbsp;</th>
                    <th>{tran.hotel.name}</th>
                    <th>{tran.room.join(", ")}</th>
                    <th>
                      {new Date(tran.dateStart).toLocaleDateString("vi-VN")} -{" "}
                      {new Date(tran.dateEnd).toLocaleDateString("vi-VN")}
                    </th>
                    <th>${tran.price}</th>
                    <th>{tran.payment}</th>
                    <th className={classes[`${tran.status.toLowerCase()}`]}>
                      <span>{tran.status}</span>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
}
