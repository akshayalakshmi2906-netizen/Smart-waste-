from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, classification_report
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# 1. Load trained model
model = load_model("waste_model.h5")

# 🔍 Automatically detect input size from model
_, img_height, img_width, _ = model.input_shape
print(f"✅ Model expects input size: ({img_height}, {img_width}, 3)")

# 2. Prepare dataset (using your validation set here as test set)
test_datagen = ImageDataGenerator(rescale=1./255)

test_generator = test_datagen.flow_from_directory(
    "dataset/val",               # ⚠️ using val as test since you don’t have dataset/test
    target_size=(img_height, img_width),  # <-- dynamically set from model
    batch_size=32,
    class_mode="categorical",
    shuffle=False
)

# 3. Predict
y_pred_probs = model.predict(test_generator)
y_pred = np.argmax(y_pred_probs, axis=1)
y_true = test_generator.classes

# 4. Metrics
acc = accuracy_score(y_true, y_pred)
prec = precision_score(y_true, y_pred, average="macro")
rec = recall_score(y_true, y_pred, average="macro")
f1 = f1_score(y_true, y_pred, average="macro")

print("✅ Accuracy:", acc)
print("✅ Precision:", prec)
print("✅ Recall:", rec)
print("✅ F1-score:", f1)

# 5. Detailed Report
print("\n📊 Classification Report:")
print(classification_report(y_true, y_pred, target_names=list(test_generator.class_indices.keys())))

# 6. Confusion Matrix
cm = confusion_matrix(y_true, y_pred)
print("\n🔎 Confusion Matrix:")
print(cm)

# 7. Plot confusion matrix
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt="d", cmap="Greens",
            xticklabels=list(test_generator.class_indices.keys()),
            yticklabels=list(test_generator.class_indices.keys()))
plt.xlabel("Predicted")
plt.ylabel("True")
plt.title("Confusion Matrix")
plt.show()
