import tensorflow as tf
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout, Input
from keras.callbacks import EarlyStopping, ModelCheckpoint
import matplotlib.pyplot as plt

# ✅ Set dataset paths
train_dir = "dataset/train"
val_dir = "dataset/val"

# ✅ Load datasets
img_size = (128, 128)
batch_size = 32

raw_train_data = tf.keras.utils.image_dataset_from_directory(
    train_dir,
    image_size=img_size,
    batch_size=batch_size,
    label_mode="categorical"
)

raw_val_data = tf.keras.utils.image_dataset_from_directory(
    val_dir,
    image_size=img_size,
    batch_size=batch_size,
    label_mode="categorical"
)

# ✅ Store class names
class_names = raw_train_data.class_names
print("Detected classes:", class_names)

# ✅ Prefetch for performance
AUTOTUNE = tf.data.AUTOTUNE
train_data = raw_train_data.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
val_data = raw_val_data.cache().prefetch(buffer_size=AUTOTUNE)

# ✅ CNN Model
model = Sequential([
    Input(shape=(128,128,3)),
    Conv2D(32, (3,3), activation="relu"),
    MaxPooling2D(2,2),

    Conv2D(64, (3,3), activation="relu"),
    MaxPooling2D(2,2),

    Conv2D(128, (3,3), activation="relu"),
    MaxPooling2D(2,2),

    Flatten(),
    Dense(256, activation="relu"),
    Dropout(0.5),
    Dense(len(class_names), activation="softmax")
])

model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])
model.summary()

# ✅ Callbacks
checkpoint = ModelCheckpoint("waste_model.h5", save_best_only=True, monitor="val_accuracy", mode="max")
early_stop = EarlyStopping(monitor="val_loss", patience=5, restore_best_weights=True)

# ✅ Train
history = model.fit(
    train_data,
    validation_data=val_data,
    epochs=20,
    callbacks=[checkpoint, early_stop]
)

print("✅ Training complete. Model saved as waste_model.h5")

# ---------------------------
# 📊 Accuracy & Loss Graphs
# ---------------------------

# Accuracy graph
plt.figure(figsize=(8,6))
plt.plot(history.history["accuracy"], label="Training Accuracy")
plt.plot(history.history["val_accuracy"], label="Validation Accuracy")
plt.title("Model Accuracy")
plt.xlabel("Epoch")
plt.ylabel("Accuracy")
plt.legend()
plt.grid(True)
plt.show()

# Loss graph
plt.figure(figsize=(8,6))
plt.plot(history.history["loss"], label="Training Loss")
plt.plot(history.history["val_loss"], label="Validation Loss")
plt.title("Model Loss")
plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.legend()
plt.grid(True)
plt.show()
