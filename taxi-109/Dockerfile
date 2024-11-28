# Etapa 1: Construção da imagem de build
FROM node:18 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todos os outros arquivos da aplicação para dentro do diretório de trabalho
COPY . .

# Executa o build do aplicativo React
RUN npm run build

# Etapa 2: Criação da imagem final para servir o app
FROM nginx:alpine

# Copia o build gerado para a pasta pública do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expondo a porta 80 para acesso ao app
EXPOSE 80

# Comando para rodar o Nginx no container
CMD ["nginx", "-g", "daemon off;"]

