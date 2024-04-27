import React, { useState } from "react";
import axios from "axios";
import Background from "./Background";

const Temperature = () => {
  const [temperatureParams, setTemperatureParams] = useState({
    city: "",
    wind_kph: 0,
    wind_degree: 0,
    pressure_mb: 0,
    humidity: 0,
    cloud: 0
  });

  const [predictedTemp, setPredictedTemp] = useState("");

  const handleChange = (e) => {
    setTemperatureParams({
      ...temperatureParams,
      [e.target.name]: e.target.value
    });
  };

  const getCoordinates = async (city) => {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=0abffed2c0094e47a6eef66d21908c23`
    );
    const coordinates = response.data.results[0].geometry;
    return coordinates;
  };

  //   const getTemperature=async(temperature_obj)=>{
  //     const response=axios.post
  //   }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const coordinates = await getCoordinates(temperatureParams.city);
    console.log(coordinates);
    const { city, ...otherParams } = temperatureParams;
    if (coordinates) {
      const predicted_temp = await axios.post(
        "http://localhost:8000/predict/temperature",
        {
          ...otherParams,
          latitude: coordinates.lat,
          longitude: coordinates.lng
        }
      );
      if (predicted_temp.status === 200) {
        setPredictedTemp(predicted_temp?.data?.temperature);
        console.log(predictedTemp);
      }
      //   console.log(predicted_temp);
      //   console.log({
      //     ...otherParams,
      //     latitude: coordinates.lat,
      //     longitude: coordinates.lng
      //   });
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
          Temperature
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
                  value={temperatureParams.city}
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
                <label htmlFor="">Wind kph</label>
                <input
                  type="text"
                  name="wind_kph"
                  value={temperatureParams.wind_kph}
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
                <label htmlFor="">Wind degree</label>
                <input
                  type="text"
                  name="wind_degree"
                  value={temperatureParams.wind_degree}
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
                <label htmlFor="">Pressure mb</label>
                <input
                  type="text"
                  name="pressure_mb"
                  value={temperatureParams.pressure_mb}
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
                <label htmlFor="">Humidity</label>
                <input
                  type="text"
                  name="humidity"
                  value={temperatureParams.humidity}
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
                <label htmlFor="">Cloud</label>
                <input
                  type="text"
                  name="cloud"
                  value={temperatureParams.cloud}
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
              Predicted temperature is: {predictedTemp}
            </h3>
          )}
        </div>
      </div>
 
  );
};

export default Background(Temperature);
