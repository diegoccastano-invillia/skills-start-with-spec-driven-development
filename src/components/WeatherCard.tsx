import { formatTemperature } from "../lib/temperature";
import { getWmoDescription, getWmoEmoji } from "../lib/wmo";
import type { WeatherData } from "../types/weather";

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  const { location, current } = data;
  const weatherEmoji = getWmoEmoji(current.weather_code);
  const weatherDescription = getWmoDescription(current.weather_code);

  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md"
      aria-label={`Previsão para ${location.name}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{location.name}</h2>
          <p className="text-gray-500 text-sm">
            {location.admin1 ? `${location.admin1}, ` : ""}
            {location.country}
          </p>
        </div>
        <span className="text-5xl" role="img" aria-label={weatherDescription}>
          {weatherEmoji}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-6xl font-light text-gray-800">
          {formatTemperature(current.temperature_2m, "C")}
        </p>
        <p className="text-gray-500 mt-1">
          Sensação: {formatTemperature(current.apparent_temperature, "C")}
        </p>
        <p className="text-gray-600 mt-1">{weatherDescription}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Vento:</span>{" "}
          {Math.round(current.wind_speed_10m)} km/h
        </div>
        <div>
          <span className="font-medium">Umidade:</span>{" "}
          {current.relative_humidity_2m}%
        </div>
      </div>
    </div>
  );
}
