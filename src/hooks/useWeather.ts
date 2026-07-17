import { useCallback, useState } from "react";
import { fetchWeather, searchLocations } from "../services/weather";
import type { AsyncState, Location, WeatherData } from "../types/weather";

export function useWeather() {
  const [searchState, setSearchState] = useState<AsyncState<Location[]>>({
    status: "idle",
  });
  const [weatherState, setWeatherState] = useState<AsyncState<WeatherData>>({
    status: "idle",
  });

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchState({ status: "idle" });
      return;
    }

    setSearchState({ status: "loading" });
    try {
      const locations = await searchLocations(query);
      if (locations.length === 0) {
        setSearchState({
          status: "error",
          message: "Nenhuma cidade encontrada.",
        });
      } else {
        setSearchState({ status: "success", data: locations });
      }
    } catch (err) {
      setSearchState({
        status: "error",
        message: err instanceof Error ? err.message : "Erro ao buscar cidade.",
      });
    }
  }, []);

  const selectLocation = useCallback(async (location: Location) => {
    setWeatherState({ status: "loading" });
    setSearchState({ status: "idle" });
    try {
      const data = await fetchWeather(location);
      setWeatherState({ status: "success", data });
    } catch (err) {
      setWeatherState({
        status: "error",
        message:
          err instanceof Error ? err.message : "Erro ao buscar previsão.",
      });
    }
  }, []);

  return { searchState, weatherState, search, selectLocation };
}
