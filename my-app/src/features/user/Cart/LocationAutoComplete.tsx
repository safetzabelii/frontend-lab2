import React, { useState } from 'react';
import axios from 'axios';

const LocationAutocomplete: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [predictions, setPredictions] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);

    if (value.length > 2) {
      fetchPredictions(value);
    } else {
      setPredictions([]);
    }
  };

  const fetchPredictions = async (value: string) => {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=YOUR_API_KEY&types=(cities)`
    );

    if (response.data.predictions) {
      const predictionOptions = response.data.predictions.map(
        (prediction: any) => prediction.description
      );
      setPredictions(predictionOptions);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search location"
      />
      <ul>
        {predictions.map((prediction) => (
          <li key={prediction}>{prediction}</li>
        ))}
      </ul>
    </div>
  );
};

export default LocationAutocomplete;
