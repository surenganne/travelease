import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Wind } from 'lucide-react';

interface WeatherData {
  date: string;
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'windy';
}

interface WeatherForecastProps {
  destination: string;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ destination }) => {
  const [forecast, setForecast] = useState<WeatherData[]>([]);

  useEffect(() => {
    // In a real application, you would fetch weather data from an API
    const fetchWeatherData = () => {
      const mockForecast: WeatherData[] = [
        { date: '2024-06-01', temperature: 28, condition: 'sunny' },
        { date: '2024-06-02', temperature: 27, condition: 'cloudy' },
        { date: '2024-06-03', temperature: 26, condition: 'rainy' },
        { date: '2024-06-04', temperature: 29, condition: 'sunny' },
        { date: '2024-06-05', temperature: 25, condition: 'windy' },
      ];
      setForecast(mockForecast);
    };

    fetchWeatherData();
  }, [destination]);

  const getWeatherIcon = (condition: WeatherData['condition']) => {
    switch (condition) {
      case 'sunny': return <Sun className="text-yellow-400" />;
      case 'cloudy': return <Cloud className="text-gray-400" />;
      case 'rainy': return <CloudRain className="text-blue-400" />;
      case 'windy': return <Wind className="text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Weather Forecast for {destination}</h2>
      <div className="grid grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="text-center">
            <p className="font-semibold">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <div className="my-2">{getWeatherIcon(day.condition)}</div>
            <p className="text-lg">{day.temperature}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;