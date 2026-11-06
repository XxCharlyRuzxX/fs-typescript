import { useEffect, useState } from 'react'
import axios from 'axios'
import { DiariesForm } from './components/DiariesForm';

type WeatherEntry = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
type VisibilityEntry = 'great' | 'good' | 'ok' | 'poor';

export interface Diaries {
  id: number;
  weather: WeatherEntry;
  visibility: VisibilityEntry;
  date: string;
  comment?: string;
}


function App() {
  const [diaries, setDiaries] = useState<Diaries[]>([])

  const fetchEntries = async () => {
    try {
      await axios.get<Diaries[]>('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data);
    })
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  }

  useEffect(() => {
    void fetchEntries();
  }, [])


  return (
    <>
    <div>
      <h1>Flight diary</h1>
      <DiariesForm />
    </div>
    <div>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>Weather: {diary.weather}</p>
          <p>Visibility: {diary.visibility}</p>
          {diary.comment && <p>Comment: {diary.comment}</p>}
        </div>
      ))}
    </div>
      </>
  )
}

export default App
