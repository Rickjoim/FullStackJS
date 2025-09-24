# apps/api/Dockerfile

# Estágio 1: Build da Aplicação
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
# Instala TODAS as dependências (incluindo as de desenvolvimento)
# para que o processo de build funcione.
RUN npm install

# Copia o resto do código da aplicação
COPY . .

# Compila o código TypeScript para JavaScript.
# Agora o comando 'nest' será encontrado.
RUN npm run build

# ---

# Estágio 2: Imagem Final de Produção (Otimizada)
FROM node:18-alpine

WORKDIR /usr/src/app

# Copia os arquivos de dependência novamente
COPY package*.json ./
# Instala APENAS as dependências de produção para a imagem final
RUN npm install --only=production

# Copia o código já compilado do estágio de build
COPY --from=builder /usr/src/app/dist ./dist

# Expõe a porta que a API vai usar dentro do container
EXPOSE 3001

# Comando para iniciar a aplicação em produção
CMD [ "node", "dist/main" ]