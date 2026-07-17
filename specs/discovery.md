# Discovery: Weather App

## Contexto
Exercício de Spec-Driven Development usando um aplicativo de previsão do tempo como domínio.

## Problema a resolver
Usuários precisam consultar rapidamente a previsão do tempo para qualquer cidade do mundo,
sem precisar criar conta ou fornecer localização automaticamente.

## Restrições conhecidas
- Sem backend próprio (app estático, deploy em GitHub Pages)
- Sem API key (usar Open-Meteo, que é gratuito e sem autenticação)
- Tecnologia: React + TypeScript + Vite

## Perguntas em aberto (a responder na Spec)
- [ ] Quantos dias de previsão mostrar?
- [ ] Como lidar com múltiplos resultados para o mesmo nome de cidade?
- [ ] A temperatura deve ser exibida em Celsius, Fahrenheit ou ambas?
- [ ] Como tratar erros de rede?

## Stakeholders
- Learner (desenvolvedor aprendendo SDD)
- Instrutor (quem valida o exercício)

## Critérios mínimos de sucesso
- Usuário consegue buscar cidade por nome
- Usuário vê temperatura atual e condição climática
- App funciona sem autenticação