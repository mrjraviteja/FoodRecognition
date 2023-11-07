import { useState } from 'react';
import './ImageUploader.css';

function ImageUploader({ onPredictedIngredients }) {
  const [images, setImages] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files);

    // Create default predictions for the new images
    const newPredictions = Array(newImages.length).fill({ class: 'Predicting...', confidence: 'N/A' });

    setImages(newImages);
    setPredictions(newPredictions);
  }

  const handleUpload = async () => {
    const newPredictions = [...predictions];
    const predictedIngredients = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const imgElement = document.createElement('img');
      imgElement.src = URL.createObjectURL(image);

      const predictions = await detectImage(imgElement);

      if (predictions.length === 0) {
        newPredictions[i] = { class: 'Unable to predict', confidence: 'N/A' };
      } else {
        const confidencePercentage = (predictions[0].confidence * 100).toFixed(2); // Convert to percentage
        newPredictions[i] = { class: predictions[0].class, confidence: `${confidencePercentage}%` };
        predictedIngredients.push(predictions[0].class);
      }
    }

    setPredictions(newPredictions);
    onPredictedIngredients(predictedIngredients); // Send predicted ingredients to the parent component
    setSearched(true);
  }

  const handleManualEntry = (index) => {
    const manualIngredient = prompt('Enter the ingredient name:');
    if (manualIngredient) {
      const newPredictions = [...predictions];
      newPredictions[index] = { class: manualIngredient, confidence: 'Manual Entry' };
      setPredictions(newPredictions);
      const predictedIngredients = newPredictions.map((prediction) => prediction.class);
      onPredictedIngredients(predictedIngredients); // Update the ingredients list
    }
  }

  const detectImage = (imgElement) => {
    return new Promise((resolve) => {
      window.roboflow.auth({
        publishable_key: 'rf_JzonULkvQlbg7XzVXXsavziEAez2'
      }).load({
        model: 'fooditems-jqto0',
        version: 2
      }).then(function (model) {
        model.detect(imgElement).then(function (predictions) {
          resolve(predictions);
        });
      });
    });
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} multiple />
      <button onClick={handleUpload}>Upload Images</button>
      <div className="image-predictions-container">
        {images.map((image, index) => (
          <div key={index} className="image-predictions-item">
            <img src={URL.createObjectURL(image)} alt={`Selected ${index}`} />
            <p>Predicted Class: {predictions[index].class}</p>
            <p>Confidence: {predictions[index].confidence}</p>
            {predictions[index].class === 'Unable to predict' && (
              <button onClick={() => handleManualEntry(index)}>Manual Entry</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;
