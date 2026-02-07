# FlyProject

🚀 **Demo Online**: [Acesse a Demo (Frontend Only)](https://seu-projeto.vercel.app/?demo=true)

Demo full-stack com Angular 17 (frontend) e NestJS (backend), focado em arquitetura limpa, testes e confiabilidade no desenvolvimento local.

## Screenshots

| Dashboard de Voos | Detalhes da Aeronave |
|-------------------|----------------------|
| ![Dashboard](docs/screenshots/dashboard.png) | ![Detalhes](docs/screenshots/aircraft.png) |

> **Nota**: Substitua as imagens acima adicionando arquivos `dashboard.png` e `aircraft.png` na pasta `docs/screenshots`.

## Stack e Destaques
- Frontend: Angular 17 (standalone), RxJS, Tailwind CSS.
- Backend: NestJS (Express), modelos tipados e logging estruturado.
- Proxy dev: `/api/*` do frontend redireciona para `http://localhost:3000`.
- Testes: unitários e e2e passando (frontend e backend).

## Arquitetura (nível sênior)
- Domínio tipado: `Flight`, `Aircraft`, `Alert` com enums para status/severidade.
- Serviço de operações: geração determinística de dados sintéticos e timestamps ISO.
- Controlador: `OpsController` com logs, atrasos mínimos e variáveis de ambiente para simular falhas (desativadas por padrão).
- Observabilidade: logs estruturados com `timestamp`, `severity` e `requestId`.
- Frontend: estados assíncronos testáveis e template raiz com feedback visual simples.

## Dados: reais ou fictícios?
Os dados do backend são sintéticos/fictícios. IDs (`FLT-*`, `AC-*`), aeroportos (ex.: `SFO`, `LAX`) e mensagens de alerta são gerados para demonstração. Não há integração com APIs reais.

## Como rodar
1) Backend (porta 3000):
```
cd backend
npm install
npm run start:dev
```
2) Frontend (porta 4200):
```
cd frontend
npm install
npm start
```
Acesse `http://localhost:4200`. As chamadas a `/api/*` usam o proxy para o backend.

## Deploy na Vercel

### Opção 1: Frontend Only (Recomendado para Demo Rápida)
O frontend possui um modo de demonstração (`?demo=true`) que usa dados estáticos, eliminando a necessidade do backend para visualização rápida.

1. Importe este repositório na Vercel.
2. Configure o **Root Directory** como `frontend`.
3. A Vercel detectará o Angular automaticamente.
4. Após o deploy, acesse sua URL adicionando `?demo=true` ao final.
   - Exemplo: `https://seu-projeto.vercel.app/?demo=true`

### Opção 2: Full Stack (Frontend + Backend)
Se desejar o backend rodando na Vercel:

1. **Backend**:
   - Crie um projeto na Vercel apontando para a pasta `backend`.
   - O arquivo `vercel.json` incluído cuidará da configuração serverless.
2. **Frontend**:
   - Crie outro projeto apontando para a pasta `frontend`.
   - Para que o frontend se comunique com o backend na Vercel, você precisará ajustar a URL da API nos environments ou configurar um rewrite.

## Testes
- Backend (unitários):
```
cd backend
npm run test
```
- Backend (e2e):
```
cd backend
npm run test:e2e
```
- Frontend (unitários, single-run):
```
cd frontend
npm run test -- --watch=false
```

## Notas de ambiente
- Docker e Nginx foram removidos para simplificar o desenvolvimento local.
- Falhas/timeout aleatórios do backend estão desativados por padrão via env (`SIMULATE_FAILURES=false`, etc.).

## Pronto para LinkedIn
Projeto Angular + NestJS com arquitetura limpa, domínio tipado, logs estruturados, proxy de desenvolvimento e suíte de testes passando (unitários + e2e). Dados sintéticos para demonstrar fluxo de operações (voos, aeronaves, alertas). Repositório pronto para desenvolvimento local e demonstração pública.
