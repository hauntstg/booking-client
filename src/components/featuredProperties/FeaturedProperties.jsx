import { useEffect, useRef, useState } from "react";
import "./featuredProperties.css";

const API_URL = process.env.REACT_APP_API_URL;
const FeaturedProperties = () => {
  const [data, setData] = useState();
  const contentRef = useRef(null);
  useEffect(() => {
    try {
      async function fetchData() {
        const res = await fetch(API_URL + "/rate");
        const resData = await res.json();
        setData(resData.result.slice(0, 3));
        console.log(resData);
      }
      fetchData();
    } catch (err) {}
  }, []);
  const text = "";
  useEffect(() => {
    if (contentRef.current) {
      if (data) {
        data.map((item) => {});
      }
    }
  }, [data]);
  return (
    <div className="fp" ref={contentRef}>
      {data &&
        data.map((item) => (
          <div className="fpItem" key={item._id}>
            <img
              src={
                item.photos[0].startsWith("http")
                  ? item.photos[0]
                  : `${API_URL}/${item.photos[0]}`
              }
              alt=""
              className="fpImg"
            />
            <span className="fpName">
              <a href={"./hotels/" + item._id} target="_blank">
                {item.name}
              </a>
            </span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
          </div>
        ))}
    </div>
  );
};

export default FeaturedProperties;
