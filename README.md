# Ember FastBoot + Simple Auth Demo

## Demo Objectives

* Demonstrate how an Ember app works when using FastBoot, including the capabilities of several
  packages:
    * [`ember-simple-auth`](https://github.com/simplabs/ember-simple-auth), used to authenticate the
      user with the backend using OAuth2 Implicit Flow
    * [`ember-cached-shoe`](https://github.com/Appchance/ember-cached-shoe), used to cache the data
      fetched by FastBoot on the rendered response.
    * [`ember-cable`](https://github.com/algonauti/ember-cable), used to receive posts in real time.

## How to run the demo

The easiest way to kick this demo, is to use Docker - You'll need to have Docker and Docker Compose
installed. Having [`plis`](https://github.com/IcaliaLabs/plis) installed is recommended to reduce
typing:

```
# Start the project using docker-compose:
docker-compose up backend_web frontend_web

# Alternatively, use plis:
plis start demo
```

The frontend may be a little slow if your'e using Docker for Mac/Windows. You can alternatively
start the ember app without docker - I recommend using [`nvm`](https://github.com/creationix/nvm).
You'll need to have `yarn` and `ember-cli` installed globally:

```
# Change dir into the frontend ember app:
cd frontend

# Install dependencies and start ember:
yarn install && ember serve
```

## Notes

* Notice how we use `socat` to tunnel the backend_web service to the frontend
  containers' port 3000. This is used only for development with Docker purposes,
  as the frontend containers see the backend service through a different
  hostname than the client (`backend_web` vs `localhost`).

* If trying to run the frontend locally *after running it previously with Docker*, you might need to
  remove the `frontend/dist` and `frontend/node_modules` before running `ember serve`, specially if
  using Docker for Mac/Windows.
