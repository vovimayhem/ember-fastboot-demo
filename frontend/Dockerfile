# Etapa I: Dependencias de Ejecución ("runtime") ===============================
# Paso 1: Comenzamos a partir de la imagen oficial de Node, versión 8-alpine:
FROM node:8-alpine AS runtime

# Paso 2: Definimos a la locación del proyecto como directorio de trabajo:
WORKDIR /usr/src

# Paso 3: Definimos el directorio de trabajo como "Home", y también agregamos
# el directorio de los ejecutables del proyecto a la variable de entorno PATH:
ENV HOME=/usr/src PATH=/usr/src/bin:$PATH

# Paso 4: Instalamos 'socat', ya que aunque sólo nos es útil en la fase de
# desarrollo, debe estar presente en la imagen de 'release' para hacer staging
# local:
RUN apk add --no-cache socat

# Etapa II: Desarrollo ("development") =========================================
# Paso 5: Comenzamos a partir de la etapa "runtime":
FROM runtime AS development

# Paso 6: Instalamos dependencias de desarrollo con el package manager de
# Alpine:
RUN apk add --no-cache yarn openssl

# Paso 7: Instalamos chromium usando el administrador de paquetes de Alpine,
# pero desde el repositorio "edge":
RUN apk add --no-cache \
  chromium --repository http://dl-cdn.alpinelinux.org/alpine/edge/community

# Paso 8: Instalamos watchman copiando el ejecutable precompilado dentro de la
# imagen de icalialabs/watchman:
COPY --from=icalialabs/watchman:4-alpine3.8 /usr/local/bin/watchman* /usr/local/bin/

# Paso 9: Creamos el directorio de STATEDIR de watchman:
RUN mkdir -p /usr/local/var/run/watchman \
 && touch /usr/local/var/run/watchman/.not-empty

# Paso 10: Instalamos dependencias de desarrollo con el administrador de paquetes
# de node:
RUN npm install -g ember-cli -g check-dependencies

# Paso 11: Definimos el comando default del contenedor:
CMD ["ember", "server", "--live-reload-port", "35730"]

# Etapa III: Compilador ("builder") ============================================
# Paso 12: Comenzamos a partir de la etapa II:
FROM development AS builder

# Paso 13: Copiar las listas de dependencias de la aplicación:
COPY package.json yarn.lock /usr/src/

# Paso 14: Instalar las dependencias de desarrollo para compilar la aplicación:
RUN yarn install

# Paso 15: Copiar el resto del código fuente de la aplicación:
COPY . /usr/src

# Paso 16: Compilar la aplicación:
RUN ember build --environment=production

# Paso 17: Purgar las dependencias de desarrollo - dejar únicamente las
# dependencias de operación (fastboot-app-server):
RUN yarn install --production

# Etapa IV: Operación ("release") ==============================================
# Paso 18: Comenzar a partir de la etapa I:
FROM runtime AS release

# Paso 19: Copiar las dependencias que quedan de la etapa III:
COPY --from=builder /usr/src/node_modules /usr/src/node_modules

# Paso 20: Copiar la aplicación compilada de la etapa III:
COPY --from=builder /usr/src/dist /usr/src/dist

# Paso 21: Copiar el script de fastboot-server:
COPY --from=builder /usr/src/fastboot-server.js /usr/src/reconfigure-app.js /usr/src/

# Paso 22: Definir el comando default:
CMD ["node", "fastboot-server.js"]
