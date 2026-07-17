## Step 4: Tasks — Do Plano às Unidades Verificáveis

> O plano técnico está pronto. Agora quebramos o trabalho em **tasks pequenas e verificáveis** — o menor incremento entre o plano e o código. No próximo step, o código nascerá como consequência dessas tasks.

### Conceito

Tasks quebram o plano em unidades pequenas o suficiente para serem implementadas e verificadas isoladamente. Cada task aponta para o critério de aceite ou item do plano que ela satisfaz — assim o código nasce como consequência de uma task, não como ponto de partida. Uma boa task tem escopo definido, critério de "feito" objetivo e cabe em poucas horas.

```mermaid
flowchart TD
    Plan[Plano Técnico] --> T1[Task 1: tipos TypeScript]
    Plan --> T2[Task 2: funções puras - lib/]
    Plan --> T3[Task 3: serviço Open-Meteo]
    Plan --> T4[Task 4: hook useWeather]
    Plan --> T5[Task 5: componentes UI]
    Plan --> T9[Task 9: previsão 7 dias]

    T1 --> C1[src/types/weather.ts]
    T2 --> C2[src/lib/temperature.ts + wmo.ts]
    T3 --> C3[src/services/weather.ts]
    T4 --> C4[src/hooks/useWeather.ts]
    T5 --> C5[src/components/]
    T9 --> C9[WeatherCard.tsx → Step 5]
```

> [!TIP]
> Uma boa task tem: escopo definido, critério de "feito" objetivo e é implementável em < 2 horas. Se demorar mais, quebre em subtasks.

### Objetivo

Registrar as tasks que rastreiam a spec e o plano em um arquivo versionado. O workflow valida apenas que o arquivo de tasks existe — a implementação e o build ficam para o Step 5. O objetivo aqui é ter cada task ligada a um `CA` ou item do plano, incluindo a nova **F5 (previsão de 7 dias)**.

### Mãos à obra: Crie o arquivo de tasks

Cada task abaixo cita o que rastreia (um `CA` da spec ou um item do plano). É esse elo que permite, no review, provar que nada foi implementado "por fora" da spec.

1. Crie a pasta `tasks/`.
2. Crie o arquivo `tasks/weather-app-tasks.md`:

   ```markdown
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
   ```

3. Faça commit e push do arquivo de tasks:

   ```bash
   git add tasks/weather-app-tasks.md
   git commit -m "step 4: tasks breakdown"
   git push origin weather-app
   ```

> [!IMPORTANT]
> O workflow valida apenas que `tasks/weather-app-tasks.md` existe. A implementação do código (incluindo a T9) e a verificação do build acontecem no Step 5.

### Checkpoint

O Step 4 é aprovado quando:

- [ ] `tasks/weather-app-tasks.md` existe e cobre as tasks T1–T9

Cada task rastreia um critério de aceite ou item do plano — inclusive a T9 (F5), que você vai implementar no próximo step.

### Em outras ferramentas

| Ferramenta | Como trata as tasks |
|---|---|
| **spec-kit** | O comando `/tasks` lê o plano e a spec e gera automaticamente um `tasks.md` com tasks numeradas; o `/implement` depois executa cada task sequencialmente |
| **OpenSpec** | Tasks são "implementation tickets" rastreados contra a spec; cada ticket tem um link para o critério de aceite que valida |
| **BMAD-METHOD** | O agente "SM" (Scrum Master) quebra o Architecture Document em user stories com critérios de aceite; o agente "Dev" implementa cada story |

<details>
<summary>Problemas?</summary><br/>

- **"O workflow não disparou"**: confirme que o arquivo está em `tasks/weather-app-tasks.md` (o gatilho observa `tasks/**`) e que você fez push para a branch `weather-app` criada no Step 1 (o workflow ignora pushes para `main`).
- **"Não sei o que cada task deve rastrear"**: reabra a spec (`specs/weather-app-spec.md`) e o plano (`plans/weather-app-plan.md`) — cada task deve citar um `CA` ou um item do plano.

</details>
