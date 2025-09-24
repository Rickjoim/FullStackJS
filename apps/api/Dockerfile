# =================================================================
# ESTÁGIO 1: Builder
# Foco: Instalar dependências e compilar a aplicação.
# =================================================================
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Copia os arquivos de manifesto do pacote da raiz
COPY package*.json ./

# Copia o código-fonte da API e os arquivos de configuração do monorepo
COPY apps/api apps/api
COPY tsconfig.json ./

# Instala TODAS as dependências do monorepo para o build
RUN npm install --legacy-peer-deps

# Constrói apenas a aplicação da API
RUN npm run build:api

# =================================================================
# ESTÁGIO 2: Produção
# Foco: Criar uma imagem enxuta apenas com o necessário para rodar.
# =================================================================
FROM node:22-alpine

WORKDIR /usr/src/app

# Copia os artefatos de build e as dependências de produção do estágio 'builder'
COPY --from=builder /usr/src/app/dist/apps/api ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000

CMD [ "node", "dist/main.js" ]