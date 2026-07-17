# Plano Técnico: Weather App

## Arquitetura geral
Aplicação SPA (Single Page Application) estática, sem backend próprio.
Toda comunicação com APIs externas é feita diretamente do browser.

### Estrutura de diretórios
```
src/
├── components/    # Componentes React de apresentação
├── hooks/         # Custom hooks (lógica de estado)
├── services/      # Acesso a APIs externas (Open-Meteo)
├── lib/           # Funções puras testáveis (conversões, formatação, WMO)
├── types/         # TypeScript types/interfaces
└── styles/        # CSS global (Tailwind)
```

## Modelo de dados

### Location (geocoding)
```typescript
interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string; // estado/região
}
```

### WeatherData (forecast)
```typescript
interface WeatherData {
  location: Location;
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: number; // WMO code
    wind_speed_10m: number;
    relative_humidity_2m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
}
```

## Decisões técnicas

| Decisão | Escolha | Alternativas descartadas | Motivo |
|---|---|---|---|
| Estado assíncrono | `AsyncState<T>` union type | Redux, Zustand | Escopo pequeno; union type resolve com zero deps |
| Linting/Formatting | Biome | ESLint + Prettier | Uma única ferramenta, mais rápida, configuração unificada |
| CSS | Tailwind CSS | CSS Modules, styled-components | Produtividade; utilitários inline evitam contexto de mudança |
| Testes E2E | Playwright | Cypress | Suporte nativo a múltiplos browsers; melhor integração com CI |

## Estratégia de testes

### Pirâmide de testes
```
E2E (Playwright) ← poucos, mas cobrem fluxos críticos da spec
    ↑
Integration (Vitest + Testing Library) ← hooks com mocks de API
    ↑
Unit (Vitest) ← funções puras em src/lib/ ← PRIORITÁRIOS
```

### Mapeamento spec → teste
| Critério de aceite | Tipo de teste | Arquivo |
|---|---|---|
| CA3.1–CA3.4 (conversão temperatura) | Unit | `src/lib/temperature.test.ts` |
| CA4.1–CA4.3 (mapeamento WMO) | Unit | `src/lib/wmo.test.ts` |
| CA1.1 (botão desabilitado) | E2E | `e2e/search.spec.ts` |
| CA1.2 (resultados de busca) | E2E | `e2e/search.spec.ts` |
| CA2.5 (loading indicator) | Integration | `src/hooks/useWeather.test.ts` |

## APIs externas

### Open-Meteo Geocoding
- URL: `https://geocoding-api.open-meteo.com/v1/search`
- Params: `name`, `count=5`, `language=pt`, `format=json`
- Sem API key

### Open-Meteo Forecast
- URL: `https://api.open-meteo.com/v1/forecast`
- Params: `latitude`, `longitude`, `current=...`, `daily=...`, `timezone=auto`
- Sem API key