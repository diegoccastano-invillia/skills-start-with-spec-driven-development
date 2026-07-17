# Tasks: Weather App

## Sprint 1 — Fundação

### T1 — Definir tipos TypeScript
- **Arquivo**: `src/types/weather.ts`
- **Critério de feito**: interfaces `Location`, `WeatherData`, `AsyncState<T>` e type `WmoCode` exportadas e compilando
- **Rastreia**: Modelo de dados do plano técnico

### T2 — Implementar funções puras de temperatura
- **Arquivo**: `src/lib/temperature.ts`
- **Critério de feito**: `celsiusToFahrenheit(0) === 32`, `celsiusToFahrenheit(100) === 212`, testes passando
- **Rastreia**: CA3.1, CA3.2, CA3.3, CA3.4

### T3 — Implementar mapeamento WMO
- **Arquivo**: `src/lib/wmo.ts`
- **Critério de feito**: `getWmoDescription(0) === "Céu limpo"`, `getWmoEmoji(95) === "⛈️"`, fallback para códigos desconhecidos
- **Rastreia**: CA4.1, CA4.2, CA4.3

### T4 — Implementar serviço Open-Meteo
- **Arquivo**: `src/services/weather.ts`
- **Critério de feito**: `searchLocations("São Paulo")` retorna array de `Location`; `fetchWeather(location)` retorna `WeatherData`
- **Rastreia**: F1, F2 da spec

### T5 — Implementar hook useWeather
- **Arquivo**: `src/hooks/useWeather.ts`
- **Critério de feito**: hook expõe `{ searchState, weatherState, search, selectLocation }` com tipos corretos
- **Rastreia**: CA2.5 (loading state)

## Sprint 2 — Interface

### T6 — Componente SearchBar
- **Arquivo**: `src/components/SearchBar.tsx`
- **Critério de feito**: renderiza input + botão; botão desabilitado quando input vazio; dispara `onSearch` no submit
- **Rastreia**: CA1.1

### T7 — Componente WeatherCard
- **Arquivo**: `src/components/WeatherCard.tsx`
- **Critério de feito**: renderiza temperatura, sensação térmica, emoji WMO, vento e umidade
- **Rastreia**: CA2.1, CA2.2, CA2.3, CA2.4

### T8 — App principal (composição)
- **Arquivo**: `src/App.tsx`
- **Critério de feito**: fluxo completo busca → selecionar cidade → ver previsão funciona no browser
- **Rastreia**: F1, F2 da spec (integração)

### T9 — Previsão de 7 dias no WeatherCard
- **Arquivo**: `src/components/WeatherCard.tsx`
- **Critério de feito**: para cada um dos 7 dias, exibe a data, a temperatura máxima/mínima e o emoji WMO
- **Rastreia**: CA5.1, CA5.2, CA5.3 (F5) — *você implementa esta task no Step 5*