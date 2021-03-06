# Etapa I: Dependencias de Ejecución ("runtime") ===============================
# Paso 1: Comenzamos a partir de la imagen oficial de Node, versión 8-alpine:
FROM node:dubnium-alpine AS runtime

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
RUN apk add --no-cache yarn openssl chromium

# Paso 7: Instalamos chromium usando el administrador de paquetes de Alpine:
RUN apk add --no-cache chromium harfbuzz nss

# Pasos 8-10: Instalar watchman:

# Paso 8: Instalar las dependencias runtime de watchman:
RUN apk add --no-cache libcrypto1.1 libgcc libstdc++

# Paso 9: Copiamos el ejecutable precompilado de watchman que se encuentra en la
# imagen de icalialabs/watchman:
COPY --from=icalialabs/watchman:alpine3.9 /usr/local/bin/watchman* /usr/local/bin/

# Paso 10: Creamos el directorio de STATEDIR de watchman:
RUN mkdir -p /usr/local/var/run/watchman \
 && touch /usr/local/var/run/watchman/.not-empty

# Paso 11: Instalamos dependencias de desarrollo con el administrador de paquetes
# de node:
RUN npm install -g ember-cli -g check-dependencies

# Paso 12: Definimos el comando default del contenedor:
CMD ["ember", "server", "--live-reload-port", "35730"]

# Etapa III: Pruebas ===========================================================
# En ésta etapa colocaremos el código final, previo a la compilación, con la
# finalidad de obtener una imagen lista para ejecutar las pruebas en nuestro
# ambiente de CI:

# Paso 13: Utilizar la imagen de la etapa de desarrollo como base:
FROM development AS testing

# Paso 14: Copiar las listas de dependencias de la aplicación:
COPY package.json yarn.lock /usr/src/

# Paso 15: Instalar las dependencias de desarrollo para compilar la aplicación:
RUN yarn install

# NOTA: Los siguientes pasos se siguen para prevenir errar "layer cache" por
# cambios fuera de las listas de dependencias:

# Paso 16: Copiar el resto del código fuente de la aplicación:
COPY . /usr/src/code

# Paso 17: Asegurarnos de que no existe el folder 'node_modules' en el código
# copiado, y mover el resto del contenido a /usr/src:
RUN rm -rf /usr/src/code/node_modules \
 && cd /usr/src/code \
 && mv $(ls -1A) ../ \
 && cd /usr/src \
 && rm -rf /usr/src/code

# Paso 18: Compilar una version de pruebas de la app, para prevenir que el CI
# intente de nuevo la compilación al invocar `ember test` de manera concurrente:
RUN ember build --environment=test

# Etapa IV: Compilador ("builder") ============================================
# Paso 19: Utilizar la imagen de la etapa de pruebas como base:
FROM testing AS builder

# Paso 20: Compilar la aplicación:
RUN ember build --environment=production

# Paso 21: Purgar las dependencias de desarrollo - dejar únicamente las
# dependencias de operación (fastboot-app-server):
RUN yarn install --production

# Etapa IV: Operación ("release") ==============================================
# Paso 22: Comenzar a partir de la etapa I:
FROM runtime AS release

# Paso 23: Copiar las dependencias que quedan de la etapa III:
COPY --from=builder /usr/src/node_modules /usr/src/node_modules

# Paso 24: Copiar la aplicación compilada de la etapa III:
COPY --from=builder /usr/src/dist /usr/src/dist

# Paso 25: Copiar el script de fastboot-server:
COPY --from=builder /usr/src/fastboot-server.js /usr/src/reconfigure-app.js /usr/src/

# Paso 26: Definir el comando default:
CMD [ "node", "fastboot-server.js" ]
