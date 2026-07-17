# Instruções SDD para GitHub Copilot

## Princípio fundamental
Neste projeto, seguimos Spec-Driven Development. O código é a última etapa, não a primeira.

## Antes de gerar código, sempre verifique:
- Existe uma spec aprovada em `specs/`?
- Existe um plano técnico em `plans/`?
- As tasks estão definidas em `tasks/`?

## Regras de geração de código
- Todo código deve rastrear-se a um critério de aceite na spec
- Nenhuma funcionalidade sem spec; nenhum teste sem critério de aceite
- Prefira funções puras e tipagem estrita (TypeScript strict mode)
- Documente decisões de design, não apenas o "como"

## Stack do projeto
- React 18 + TypeScript strict + Vite
- Vitest + Testing Library (unit/integration)
- Playwright (E2E)
- Biome (lint/format)
- Tailwind CSS

## API
- Open-Meteo (geocoding + forecast, sem API key)
- Endpoints: geocoding-api.open-meteo.com e api.open-meteo.com