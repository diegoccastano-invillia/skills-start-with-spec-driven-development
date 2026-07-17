import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/WeatherCard";
import { useWeather } from "./hooks/useWeather";
import type { Location } from "./types/weather";

export default function App() {
  const { searchState, weatherState, search, selectLocation } = useWeather();

  function handleLocationSelect(location: Location) {
    selectLocation(location);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-start pt-16 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">🌤️ Weather App</h1>
        <p className="text-blue-600">Previsão do tempo com Open-Meteo</p>
      </header>

      <SearchBar
        onSearch={search}
        isLoading={searchState.status === "loading"}
      />

      {searchState.status === "loading" && (
        <output className="mt-4 text-gray-500">Buscando cidades...</output>
      )}

      {searchState.status === "error" && (
        <p className="mt-4 text-red-600" role="alert">
          {searchState.message}
        </p>
      )}

      {searchState.status === "success" && searchState.data.length > 0 && (
        <ul className="mt-4 w-full max-w-md bg-white rounded-lg shadow divide-y">
          {searchState.data.map((location) => (
            <li key={location.id}>
              <button
                type="button"
                onClick={() => handleLocationSelect(location)}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors"
                aria-label={`Selecionar ${location.name}, ${location.country}`}
              >
                <span className="font-medium">{location.name}</span>
                {location.admin1 && (
                  <span className="text-gray-500 text-sm ml-2">
                    {location.admin1}
                  </span>
                )}
                <span className="text-gray-400 text-sm ml-2">
                  {location.country}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {weatherState.status === "loading" && (
        <output className="mt-8 text-gray-500">Carregando previsão...</output>
      )}

      {weatherState.status === "error" && (
        <p className="mt-8 text-red-600" role="alert">
          {weatherState.message}
        </p>
      )}

      {weatherState.status === "success" && (
        <div className="mt-8">
          <WeatherCard data={weatherState.data} />
        </div>
      )}
    </div>
  );
}
