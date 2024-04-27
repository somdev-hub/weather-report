import pickle
import os

script_dir = os.path.dirname(os.path.realpath(__file__))

file_path = os.path.join(script_dir, "temperature.pkl")

with open(file_path,'rb') as f:
    model=pickle.load(f)
    predicted_data=model.predict([[28.7041,77.1025,10,120,1010,90,50]])
    print(str(predicted_data[0])+"°C")