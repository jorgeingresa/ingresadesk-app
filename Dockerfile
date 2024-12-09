# Usa la imagen base de Node.js
FROM node:22

# Configura el directorio de trabajo
WORKDIR /home/node/app

# Crear directorio node_modules y asignar permisos
RUN mkdir -p /home/node/app/node_modules

# Copiar los archivos esenciales para instalar dependencias
COPY package.json yarn.lock ./

# Cambiar los permisos para garantizar que el usuario node tenga acceso
RUN chown -R node:node /home/node/app

# Cambiar al usuario node
USER node

# Instalar las dependencias
RUN yarn install

# Copiar el resto del proyecto
COPY --chown=node:node . .

# Construir la aplicación
RUN yarn build

# Exponer el puerto
EXPOSE 3000

# Iniciar la aplicación
CMD ["yarn", "start"]
