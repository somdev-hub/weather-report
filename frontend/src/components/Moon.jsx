import React, { useState } from "react";
import Background from "./Background";
import axios from "axios";

const Moon = () => {
  const [moonParams, setMoonParams] = useState({
    city: "",
    sunrise: "",
    sunset: "",
    moonrise: "",
    moonset: "",
    moon_illumination: ""
  });

  const [predictedTemp, setPredictedTemp] = useState("");

 const handleChange = (e) => {
    if (
      e.target.name === "sunrise" ||
      e.target.name === "sunset" ||
      e.target.name === "moonrise" ||
      e.target.name === "moonset"
    ) {
      const timeValue = e.target.value;
      const [hours, minutes] = timeValue.split(':').map(Number);
      setMoonParams({
        ...moonParams,
        [e.target.name]: hours * 60 + minutes
      });
    } else {
      setMoonParams({
        ...moonParams,
        [e.target.name]: e.target.value
      });
    }
};
  const getCoordinates = async (city) => {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=0abffed2c0094e47a6eef66d21908c23`
    );
    const coordinates = response.data.results[0].geometry;
    return coordinates;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(moonParams);

    const coordinates = await getCoordinates(moonParams.city);
    console.log(coordinates);
    const { city, ...otherParams } = moonParams;
    if (coordinates) {
      const predicted_temp = await axios.post(
        "http://localhost:8000/predict/moon_phase",
        {
          ...otherParams,
          latitude: coordinates.lat,
          longitude: coordinates.lng
        }
      );
      if (predicted_temp.status === 200) {
        setPredictedTemp(predicted_temp?.data?.moon_phase);
        console.log(predictedTemp);
      }
    }
  };

  return (
    <div className="temperature-container">
      <h1
        style={{
          color: "#1E0342",
          opacity: "0.7",
          fontSize: "2em",
          textAlign: "center",
          marginTop: "5%"
        }}
      >
        Moon phase
      </h1>
      <div
        className=""
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <form action="" style={{ width: "100%" }}>
          <div
            className=""
            style={{
              display: "flex",
              //   gap: "5%",
              width: "100%",
              justifyContent: "space-evenly"
            }}
          >
            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start"
              }}
            >
              <label htmlFor="">Enter city</label>
              <input
                type="text"
                name="city"
                value={moonParams.city}
                onChange={handleChange}
              />
            </div>
            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start"
              }}
            >
              <label htmlFor="">Sunrise</label>
              <input
                type="time"
                name="sunrise"
                // value={moonParams.sunrise}
                onChange={handleChange}
              />
            </div>
            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start"
              }}
            >
              <label htmlFor="">Sunset</label>
              <input
                type="time"
                name="sunset"
                // value={moonParams.sunset}
                onChange={handleChange}
              />
            </div>
          </div>
          <div
            className=""
            style={{
              display: "flex",
              //   gap: "5%",
              width: "100%",
              justifyContent: "space-evenly",
              marginTop: "1%"
            }}
          >
            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start"
              }}
            >
              <label htmlFor="">Moonrise</label>
              <input
                type="time"
                name="moonrise"
                // value={moonParams.moonrise}
                onChange={handleChange}
              />
            </div>
            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start"
              }}
            >
              <label htmlFor="">Moonset</label>
              <input
                type="time"
                name="moonset"
                // value={moonParams.moonset}
                onChange={handleChange}
              />
            </div>
            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start"
              }}
            >
              <label htmlFor="">Moon illumination</label>
              <input
                type="number"
                name="moon_illumination"
                value={moonParams.moon_illumination}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" onClick={handleSubmit}>
            Predict
          </button>
        </form>

        {predictedTemp && (
          <h3 style={{ marginTop: "5%" }}>
            Predicted moon phase is: {predictedTemp}
          </h3>
        )}
      </div>
    </div>
  );
};

export default Background(Moon);
