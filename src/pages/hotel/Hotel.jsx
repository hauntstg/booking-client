import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;
const Hotel = () => {
  const navigate = useNavigate();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [hotel, setHotel] = useState();
  const param = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(API_URL + "/hotel/" + param.hotelId);
        const resData = await res.json();
        // console.log(resData.result[0]);
        setHotel(resData.result[0]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  let photos = [];
  if (hotel) {
    photos = hotel.photos.map((photo) => {
      return photo.startsWith("http")
        ? { src: photo }
        : { src: API_URL + "/" + photo };
    });
  }
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button
            className="bookNow"
            onClick={() => {
              navigate("/booking/" + param.hotelId);
            }}
          >
            Reserve or Book Now!
          </button>
          {hotel && <h1 className="hotelTitle">{hotel.name}</h1>}
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            {hotel && <span>{hotel.address}</span>}
          </div>
          {hotel && (
            <span className="hotelDistance">
              Excellent location – {hotel.distance}m from center
            </span>
          )}
          {hotel && (
            <span className="hotelPriceHighlight">
              Book a stay over ${hotel.cheapestPrice} at this property and get a
              free airport taxi
            </span>
          )}
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              {hotel && <h1 className="hotelTitle">{hotel.name}</h1>}
              {hotel && <p className="hotelDesc">{hotel.desc}</p>}
            </div>
            <div className="hotelDetailsPrice">
              {/* <h1>Perfect for a 9-night stay!</h1>
              {hotel && (
                <span>
                  Located in the real heart of {hotel.city}, this property has
                  an excellent location score of {hotel.rating}!
                </span>
              )} */}
              <h2>{hotel && <b>${hotel.cheapestPrice}</b>} (1 nights)</h2>
              <button
                onClick={() => {
                  navigate("/booking/" + param.hotelId);
                }}
              >
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
