# Especificação: Weather App

## Escopo
Aplicação web estática para consulta de previsão do tempo por cidade,
usando a API Open-Meteo (sem autenticação).

## Fora de escopo
- Detecção automática de localização (GPS)
- Histórico de buscas persistido
- Notificações push
- Previsão por hora (apenas diária)
- Suporte a múltiplos idiomas (apenas português)

## Funcionalidades

### F1 — Busca de cidade
**Critérios de Aceite:**
- CA1.1: DADO que o campo de busca está vazio, ENTÃO o botão "Buscar" está desabilitado
- CA1.2: DADO que o usuário digitou o nome de uma cidade válida, QUANDO clicar em "Buscar", ENTÃO o sistema exibe até 5 sugestões de localização
- CA1.3: DADO que a cidade digitada não existe, QUANDO a busca retornar vazia, ENTÃO o sistema exibe "Nenhuma cidade encontrada"
- CA1.4: DADO que ocorreu um erro de rede durante a busca, ENTÃO o sistema exibe mensagem de erro amigável

### F2 — Exibição do clima atual
**Critérios de Aceite:**
- CA2.1: DADO que o usuário selecionou uma cidade, ENTÃO o sistema exibe temperatura atual em Celsius
- CA2.2: DADO que o usuário selecionou uma cidade, ENTÃO o sistema exibe sensação térmica
- CA2.3: DADO que o usuário selecionou uma cidade, ENTÃO o sistema exibe ícone/emoji representando a condição climática
- CA2.4: DADO que o usuário selecionou uma cidade, ENTÃO o sistema exibe velocidade do vento (km/h) e umidade relativa (%)
- CA2.5: DADO que a requisição de previsão está em andamento, ENTÃO o sistema exibe indicador de carregamento

### F3 — Conversão de temperatura
**Critérios de Aceite:**
- CA3.1: A conversão de Celsius para Fahrenheit segue a fórmula F = (C × 9/5) + 32
- CA3.2: 0°C = 32°F
- CA3.3: 100°C = 212°F
- CA3.4: -40°C = -40°F

### F4 — Mapeamento de condições climáticas (WMO)
**Critérios de Aceite:**
- CA4.1: Código WMO 0 é mapeado para "Céu limpo" com emoji ☀️
- CA4.2: Código WMO 95 é mapeado para "Tempestade" com emoji ⛈️
- CA4.3: Códigos WMO desconhecidos retornam "Condição desconhecida" com emoji ❓

### F5 — Previsão de 7 dias
**Critérios de Aceite:**
- CA5.1: DADO que o usuário selecionou uma cidade, ENTÃO o sistema exibe a previsão dos próximos 7 dias
- CA5.2: DADO a previsão de um dia, ENTÃO o sistema exibe a temperatura máxima e a mínima daquele dia
- CA5.3: DADO a previsão de um dia, ENTÃO o sistema exibe o emoji da condição climática (código WMO) daquele dia

## Restrições técnicas
- API: Open-Meteo (geocoding-api.open-meteo.com e api.open-meteo.com)
- Stack: React 18 + TypeScript strict + Vite
- Deploy: GitHub Pages (build estático)
- Sem API key necessária

## Métricas de qualidade
- Cobertura de testes unitários: ≥ 80% das funções em `src/lib/`
- Todos os critérios de aceite cobertos por testes automatizados
- Build sem erros de TypeScript (strict mode)
- Lint sem erros (Biome)