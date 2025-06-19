import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { useContext } from "react";
import { SearchContext } from "../../components/store/search-context";

const API_URL = process.env.REACT_APP_API_URL;
const List = () => {
  const { data, setData } = useContext(SearchContext);
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [hotels, setHotels] = useState([]);
  const [countSearch, setCountSearch] = useState(0); // ép component render lại khi click search
  const navigate = useNavigate();
  useEffect(() => {
    try {
      async function fetchData() {
        const res = await fetch(
          API_URL +
            "/search?city=" +
            data.destination +
            "&startDate=" +
            data.date[0].startDate.getTime() +
            "&endDate=" +
            data.date[0].endDate.getTime() +
            "&adult=" +
            data.options.adult +
            "&children=" +
            data.options.children +
            "&room=" +
            data.options.room
        );
        const resData = await res.json();
        setHotels(resData.results);
        // console.log(resData.results);
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [countSearch]);

  function handleSearch() {
    setCountSearch((prev) => prev + 1);
    setData({ destination: destination, date: date, options: options });
    navigate("/hotels", { state: { destination, date, options } });
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                value={destination}
                type="text"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={options.adult}
                    name="adult"
                    onChange={(e) =>
                      setOptions((prev) => {
                        return {
                          ...prev,
                          [e.target.name]: +e.target.value,
                        };
                      })
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                    name="children"
                    onChange={(e) =>
                      setOptions((prev) => {
                        return {
                          ...prev,
                          [e.target.name]: +e.target.value,
                        };
                      })
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                    name="room"
                    onChange={(e) =>
                      setOptions((prev) => {
                        return {
                          ...prev,
                          [e.target.name]: +e.target.value,
                        };
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="listResult">
            {/* <SearchItem />
            <SearchItem />
            <SearchItem /> */}
            {hotels &&
              hotels.map((hotel, index) => (
                <SearchItem
                  key={index}
                  _id={hotel._id}
                  name={hotel.name}
                  distance={hotel.distance}
                  tag={hotel.city} // ?
                  type={hotel.type}
                  description={hotel.desc}
                  free_cancel={hotel.city} // ?
                  price={hotel.cheapestPrice}
                  rate={hotel.rating}
                  rate_text={hotel.city}
                  img_url={hotel.photos[0]}
                />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
