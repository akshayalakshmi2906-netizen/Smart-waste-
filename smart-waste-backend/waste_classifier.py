# waste_classifier.py
import tensorflow as tf
from keras.models import load_model
from keras.preprocessing import image
import numpy as np
import json

# Load trained CNN model
model = load_model("waste_model.h5")

# ✅ Load class names (must match training order)
class_names = ['E-waste', 'Glass', 'Metal', 'Organic', 'Paper', 'Plastic']

# Tips dictionary
tips = {
    "Plastic": "Clean and send plastics to recycling centers. Avoid single-use plastic.",
    "Paper": "Reuse paper if possible. Recycle in dry condition.",
    "Glass": "Rinse glass items and recycle. Broken glass needs special handling.",
    "Metal": "Scrap metal can be recycled. Keep separate from other waste.",
    "Organic": "Compost kitchen waste to make natural fertilizer.",
    "E-waste": "Dispose e-waste at certified collection centers."
}

def classify_waste(img_path):
    img = image.load_img(img_path, target_size=(128,128))  
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    
    prediction = model.predict(img_array)[0]
    idx = np.argmax(prediction)
    
    result = {
        "class": class_names[idx],
        "confidence": f"{prediction[idx]:.2f}",
        "tip": tips[class_names[idx]]
    }
    return result
