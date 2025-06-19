import { useEffect, useRef, useState } from "react";
import "./propertyList.css";

const API_URL = process.env.REACT_APP_API_URL;
const PropertyList = () => {
  const [data, setData] = useState();
  const contentRef = useRef(null);

  useEffect(() => {
    try {
      async function fetchData() {
        const res = await fetch(API_URL + "/type");
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
        data.map((item) => {
          Object.keys(item).forEach((key) => {
            const array = item[key];
            // console.log(array.length);
            switch (key) {
              case "Hotel":
                text += `<div class="pListItem">
                      <img
                        src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
                        alt=""
                        class="pListImg"
                      />
                      <div class="pListTitles">
                        <h1>${key}</h1>
                        <h2>${array.length + " " + key.toLocaleLowerCase()}</h2>
                      </div>
                    </div>`;
                break;
              case "Apartments":
                text += `<div class="pListItem">
                      <img
                        src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
                        alt=""
                        class="pListImg"
                      />
                      <div class="pListTitles">
                        <h1>${key}</h1>
                        <h2>${array.length + " " + key.toLocaleLowerCase()}</h2>
                      </div>
                    </div>`;
                break;
              case "Resorts":
                text += `<div class="pListItem">
                      <img
                        src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
                        alt=""
                        class="pListImg"
                      />
                      <div class="pListTitles">
                        <h1>${key}</h1>
                        <h2>${array.length + " " + key.toLocaleLowerCase()}</h2>
                      </div>
                    </div>`;
                break;
              case "Villas":
                text += `<div class="pListItem">
                      <img
                        src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
                        alt=""
                        class="pListImg"
                      />
                      <div class="pListTitles">
                        <h1>${key}</h1>
                        <h2>${array.length + " " + key.toLocaleLowerCase()}</h2>
                      </div>
                    </div>`;
                break;
              case "Cabins":
                text += `<div class="pListItem">
                      <img
                        src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
                        alt=""
                        class="pListImg"
                      />
                      <div class="pListTitles">
                        <h1>${key}</h1>
                        <h2>${array.length + " " + key.toLocaleLowerCase()}</h2>
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
  return (
    <div className="pList" ref={contentRef}>
      {/* <div className="pListItem">
        <img
          src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Hotels</h1>
          <h2>233 hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Apartments</h1>
          <h2>2331 hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Resorts</h1>
          <h2>2331 hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Villas</h1>
          <h2>2331 hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Cabins</h1>
          <h2>2331 hotels</h2>
        </div>
      </div> */}
    </div>
  );
};

export default PropertyList;
