import { useState } from "react";
import type { Diaries } from "../App";
import axios from "axios";

export const DiariesForm = () => {
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState<Diaries['weather']>('sunny');
  const [visibility, setVisibility] = useState<Diaries['visibility']>('great');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const newEntry: Omit<Diaries, 'id'> = {
      date,
      weather,
      visibility,
      comment: comment || undefined,
    };

    try {
      const response = await axios.post<Omit<Diaries, 'id'>>('http://localhost:3000/api/diaries', newEntry);
      console.log('Entry added:', response.data);
      setDate('');
      setWeather('sunny');
      setVisibility('great');
      setComment('');
    } catch (error) {
      console.error('Error adding entry:', error);
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data?.error;
        let reason: string;
        if (Array.isArray(serverError)) {
          reason = serverError.map((issue: { message?: string }) => issue.message ?? 'Invalid entry').join(', ');
        } else if (typeof serverError === 'string') {
          reason = serverError;
        } else {
          reason = error.message;
        }
        setErrorMessage(reason);
      } else {
        setErrorMessage('Could not add the diary entry.');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p style={{ color: 'red' }} role="alert">
        Error adding entry: {errorMessage}
      </p>}
      <div>
        <label htmlFor="date">Date:</label>
        <input required type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
          <legend>Weather:</legend>
          {(['sunny', 'rainy', 'cloudy', 'stormy', 'windy'] as const).map((option) => (
            <label key={option}>
              <input type="radio" name="weather" value={option} checked={weather === option} onChange={() => setWeather(option)} />
              {option}
            </label>
          ))}
      </div>
      <div>
          <legend>Visibility:</legend>
          {(['great', 'good', 'ok', 'poor'] as const).map((option) => (
            <label key={option}>
              <input type="radio" name="visibility" value={option} checked={visibility === option} onChange={() => setVisibility(option)} />
              {option}
            </label>
          ))}
        <label htmlFor="comment">Description:</label>
        <textarea
          id="comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
        <button type="submit">Add</button>
      </div>
    </form>
  )
}