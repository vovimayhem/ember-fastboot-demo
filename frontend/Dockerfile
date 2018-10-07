# Etapa I: Dependencias de Ejecución ("runtime") ===============================
# Paso 1: Comenzamos a partir de la imagen oficial de Node, versión 8-alpine:
FROM node:8-alpine AS runtime

# Paso 2: Definimos a la locación del proyecto como directorio de trabajo:
WORKDIR /usr/src

# Paso 3: Definimos el directorio de trabajo como "Home", y también agregamos
# el directorio de los ejecutables del proyecto a la variable de entorno PATH:
ENV HOME=/usr/src PATH=/usr/src/bin:$PATH

# Etapa II: Desarrollo ("development") =========================================
# Paso 4: Comenzamos a partir de la etapa "runtime":
FROM runtime AS development

# Paso 5: Instalamos dependencias de desarrollo con el package manager de
# Alpine:
RUN apk add --no-cache yarn openssl

# Paso 6: Instalamos chromium usando el administrador de paquetes de Alpine,
# pero desde el repositorio "edge":
RUN apk add --no-cache \
  chromium --repository http://dl-cdn.alpinelinux.org/alpine/edge/community

# Paso 7: Instalamos watchman copiando el ejecutable precompilado dentro de la
# imagen de icalialabs/watchman:
COPY --from=icalialabs/watchman:4-alpine3.8 /usr/local/bin/watchman* /usr/local/bin/

# Paso 8: Creamos el directorio de STATEDIR de watchman:
RUN mkdir -p /usr/local/var/run/watchman \
 && touch /usr/local/var/run/watchman/.not-empty

# Paso 9: Instalamos dependencias de desarrollo con el administrador de paquetes
# de node:
RUN npm install -g ember-cli -g check-dependencies

# Paso 10: Definimos el comando default del contenedor:
CMD ["ember", "server", "--live-reload-port", "35730"]
