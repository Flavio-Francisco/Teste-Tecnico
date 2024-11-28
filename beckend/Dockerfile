# Imagem base para Node.js
FROM node:18-alpine

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json (ou npm-shrinkwrap.json) para o contêiner
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar todo o código fonte para dentro do contêiner
COPY . .

# Instalar o TypeScript globalmente, caso não tenha em suas dependências
RUN npm install -g typescript

# Compilar o código TypeScript
RUN npm run build

# Expor a porta do servidor
EXPOSE 5000

# Definir o comando para rodar o backend
CMD ["npm", "start"]
