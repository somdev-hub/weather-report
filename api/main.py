from fastapi import FastAPI, UploadFile, File
import uvicorn
import numpy as np
from pydantic import BaseModel
import pickle
import os
from fastapi.middleware.cors import CORSMiddleware


script_dir = os.path.dirname(os.path.realpath(__file__))

file_path_temp = os.path.join(script_dir, "models/temperature.pkl")
file_path_humidity = os.path.join(script_dir, "models/humidity.pkl")
file_path_condition = os.path.join(script_dir, "models/condition.pkl")
file_path_pressure = os.path.join(script_dir, "models/pressure.pkl")
file_path_moon = os.path.join(script_dir, "models/moon_phase.pkl")

app=FastAPI()
origins = [
    "http://localhost:5173",  # Allow requests from this origin
    # Add more origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TemperaturePredictionInput(BaseModel):
    latitude: float
    longitude: float
    wind_kph: float
    wind_degree: float
    pressure_mb: float
    humidity: float
    cloud: float
    
class HumidityPredictionInput(BaseModel):
    #'latitude','longitude','wind_kph','wind_degree','temperature_celsius','pressure_mb','cloud'
    latitude: float
    longitude: float
    wind_kph: float
    wind_degree: float
    temperature_celsius: float
    pressure_mb: float
    cloud: float
    
class ConditionPredictionInput(BaseModel):
    #'latitude','longitude','wind_kph','wind_degree','pressure_mb','temperature_celsius','humidity','cloud','air_quality_Carbon_Monoxide', 'air_quality_Ozone', 'air_quality_Nitrogen_dioxide'
    
    latitude: float
    longitude: float
    wind_kph: float
    wind_degree: float
    pressure_mb: float
    temperature_celsius: float
    humidity: float
    cloud: float
    air_quality_Carbon_Monoxide: float
    air_quality_Ozone: float
    air_quality_Nitrogen_dioxide: float
    
class PressurePredictionInput(BaseModel):
    #'latitude','longitude','wind_kph','wind_degree','temperature_celsius','humidity','cloud'
    latitude: float
    longitude: float
    wind_kph: float
    wind_degree: float
    temperature_celsius: float
    humidity: float
    cloud: float
    
class MoonPhasePredictionInput(BaseModel):
    #'latitude','longitude','sunrise','sunset','moonrise','moonset','moon_illumination'
    latitude: float
    longitude: float
    sunrise: float
    sunset:float
    moonrise:float
    moonset:float
    moon_illumination:float
    
    
    
@app.get("/")
async def read_root():
    return "Hello World"

@app.post("/predict/temperature")
async def predict_temperature(input_data: TemperaturePredictionInput):
    #'latitude','longitude','wind_kph','wind_degree','pressure_mb','humidity','cloud'
    print(input_data)
    # return input_data
    latitude=input_data.latitude
    longitude=input_data.longitude
    wind_kph=input_data.wind_kph
    wind_degree=input_data.wind_degree
    pressure_mb=input_data.pressure_mb
    humidity=input_data.humidity
    cloud=input_data.cloud
    
    # Load the model
    with open(file_path_temp,'rb') as f:
        model=pickle.load(f)
        predicted_data=model.predict([[latitude,longitude,wind_kph,wind_degree,pressure_mb,humidity,cloud]])
        return {"temperature":str(predicted_data[0])+"°C"}
    
    
@app.post("/predict/pressure")
async def predict_pressure(input_data: PressurePredictionInput):
    #'latitude','longitude','wind_kph','wind_degree','temperature_celsius','humidity','cloud'
    latitude=input_data.latitude
    longitude=input_data.longitude
    wind_kph=input_data.wind_kph
    wind_degree=input_data.wind_degree
    temperature_celsius=input_data.temperature_celsius
    humidity=input_data.humidity
    cloud=input_data.cloud
    
    # Load the model
    with open(file_path_pressure,'rb') as f:
        model=pickle.load(f)
        predicted_data=model.predict([[latitude,longitude,wind_kph,wind_degree,temperature_celsius,humidity,cloud]])
        return {"pressure":str(predicted_data[0])+"mb"}
    
@app.post("/predict/humidity")
async def predict_humidity(input_data: HumidityPredictionInput):
    #'latitude','longitude','wind_kph','wind_degree','pressure_mb','humidity','cloud'
    latitude=input_data.latitude
    longitude=input_data.longitude
    wind_kph=input_data.wind_kph
    wind_degree=input_data.wind_degree
    temperature_celsius=input_data.temperature_celsius
    pressure_mb=input_data.pressure_mb
    cloud=input_data.cloud
    
    # Load the model
    with open(file_path_humidity,'rb') as f:
        model=pickle.load(f)
        predicted_data=model.predict([[latitude,longitude,wind_kph,wind_degree,temperature_celsius,pressure_mb,cloud]])
        return {"humidity":str(predicted_data[0])+"%"}
    
@app.post("/predict/condition")
async def predict_condition(input_data: ConditionPredictionInput):
    #'latitude','longitude','wind_kph','wind_degree','pressure_mb','temperature_celsius','humidity','cloud','air_quality_Carbon_Monoxide', 'air_quality_Ozone', 'air_quality_Nitrogen_dioxide'
    
    conditions=['Partly cloudy', 'Sunny', 'Cloudy', 'Mist', 'Patchy rain possible',
       'Overcast', 'Patchy light rain with thunder', 'Light rain shower',
       'Moderate or heavy rain shower', 'Clear', 'Light rain',
       'Torrential rain shower', 'Fog', 'Thundery outbreaks possible',
       'Patchy light drizzle', 'Moderate rain', 'Patchy light rain',
       'Moderate rain at times', 'Heavy rain', 'Heavy rain at times',
       'Light drizzle', 'Moderate or heavy rain with thunder',
       'Patchy snow possible', 'Moderate or heavy snow showers',
       'Light snow showers', 'Moderate or heavy snow with thunder',
       'Patchy light snow with thunder', 'Light sleet',
       'Light freezing rain', 'Patchy light snow', 'Patchy moderate snow',
       'Light snow', 'Moderate snow', 'Overcast ', 'Clear ', 'Cloudy ',
       'Partly Cloudy ', 'Patchy rain nearby',
       'Thundery outbreaks in nearby', 'Heavy snow',
       'Patchy light snow in area with thunder',
       'Patchy light rain in area with thunder', 'Light sleet showers',
       'Moderate or heavy snow in area with thunder',
       'Moderate or heavy rain in area with thunder', 'Patchy heavy snow',
       'Patchy snow nearby', 'Patchy sleet nearby',
       'Moderate or heavy sleet', 'Partly Cloudy']
    
    latitude=input_data.latitude
    longitude=input_data.longitude
    wind_kph=input_data.wind_kph
    wind_degree=input_data.wind_degree
    pressure_mb=input_data.pressure_mb
    temperature_celsius=input_data.temperature_celsius
    humidity=input_data.humidity
    cloud=input_data.cloud
    air_quality_Carbon_Monoxide=input_data.air_quality_Carbon_Monoxide
    air_quality_Ozone=input_data.air_quality_Ozone
    air_quality_Nitrogen_dioxide=input_data.air_quality_Nitrogen_dioxide
    
    # Load the model
    with open(file_path_condition,'rb') as f:
        model=pickle.load(f)
        predicted_data=model.predict([[latitude,longitude,wind_kph,wind_degree,pressure_mb,temperature_celsius,humidity,cloud,air_quality_Carbon_Monoxide, air_quality_Ozone, air_quality_Nitrogen_dioxide]])
        return {"condition":conditions[int(predicted_data[0])]}
    
@app.post("/predict/moon_phase")
async def predict_moon_phase(input_data:MoonPhasePredictionInput):
    moon_phases={
        0: "First Quarter",
        1: "Full Moon",
        2: "Last Quarter",
        3: "New Moon",
        4: "Waning Crescent",
        5: "Waning Gibbous",
        6: "Waxing Crescent",
        7: "Waxing Gibbous",
    }
    
    latitude=input_data.latitude
    longitude=input_data.longitude
    sunrise=input_data.sunrise
    sunset=input_data.sunset
    moonrise=input_data.moonrise
    moonset=input_data.moonset
    moon_illumination=input_data.moon_illumination
    
    with open(file_path_moon,"rb") as f:
        model=pickle.load(f)
        predicted_data=model.predict([[latitude,longitude,sunrise,sunset,moonrise,moonset,moon_illumination]])
        
        return {"moon_phase":moon_phases[int(predicted_data[0])]}

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)