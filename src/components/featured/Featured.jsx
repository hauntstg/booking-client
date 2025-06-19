import { useEffect, useRef, useState } from "react";
import "./featured.css";

const API_URL = process.env.REACT_APP_API_URL;
const Featured = () => {
  const [data, setData] = useState();
  const contentRef = useRef(null);

  useEffect(() => {
    try {
      async function fetchData() {
        const res = await fetch(API_URL + "/city");
        const resData = await res.json();
        // console.log(resData.result);
        setData(resData.result);
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);
  let text = "";
  useEffect(() => {
    if (contentRef.current) {
      if (data) {
        // console.log("Dữ liệu data đã được cập nhật:", data);
        data.map((item) => {
          Object.keys(item).forEach((key) => {
            const array = item[key]; // Mảng trong từng thuộc tính
            // console.log(`Đang xử lý ${key}:`, array);
            switch (key) {
              case "TPHCM":
                text += `<div class="featuredItem">
                    <img
                      src="/images/HCM.jpg"
                      alt=""
                      class="featuredImg"
                    />
                    <div class="featuredTitles">
                      <h1>Ho Chi Minh</h1>
                      <h2>${array.length} properties</h2>
                    </div>
                  </div>`;
                break;
              case "TPHN":
                text += `<div class="featuredItem">
                    <img
                      src="/images/Ha Noi.jpg"
                      alt=""
                      class="featuredImg"
                    />
                    <div class="featuredTitles">
                      <h1>Ha Noi</h1>
                      <h2>${array.length} properties</h2>
                    </div>
                  </div>`;
                break;
              case "TPDN":
                text += `<div class="featuredItem">
                    <img
                      src="/images/Da Nang.jpg"
                      alt=""
                      class="featuredImg"
                    />
                    <div class="featuredTitles">
                      <h1>Da Nang</h1>
                      <h2>${array.length} properties</h2>
                    </div>
                  </div>`;
                break;
            }
          });
        });
      }
      contentRef.current.innerHTML = text;
    }
  }, [data]);

  return <div className="featured" ref={contentRef}></div>;
};

export default Featured;
