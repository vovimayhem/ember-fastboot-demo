const ReconfigureApp = require('./reconfigure-app');
const FastBootAppServer = require('fastboot-app-server');

const DIST_PATH = 'dist';
const PORT = parseInt(process.env.PORT || '4200');

const ENV_PROCESSING = {
  ENV_MAPPING: {
    HOST_WHITELIST: 'fastboot',
  },
  ENV_TRANSFORM: {
    HOST_WHITELIST: ['split', ' ']
  }
};

ReconfigureApp.fromProcessEnv(DIST_PATH, ENV_PROCESSING);

let server = new FastBootAppServer({
  distPath: DIST_PATH,
  gzip: true, // Optional - Enables gzip compression.
  host: '0.0.0.0', // Optional - Sets the host the server listens on.
  port: PORT, // Optional - Sets the port the server listens on (defaults to the PORT env var or 3000).
  // sandboxGlobals: { GLOBAL_VALUE: MY_GLOBAL }, // Optional - Make values available to the Ember app running in the FastBoot server, e.g. "MY_GLOBAL" will be available as "GLOBAL_VALUE"
  chunkedResponse: true // Optional - Opt-in to chunked transfer encoding, transferring the head, body and potential shoeboxes in separate chunks. Chunked transfer encoding should have a positive effect in particular when the app transfers a lot of data in the shoebox.
});

server.start();
