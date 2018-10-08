const FS = require('fs');
const Cheerio = require('cheerio');
const FastBootAppServer = require('fastboot-app-server');

const DIST_PATH = 'dist';

function keyToEnvVarName(key){
  return key
    .replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();})
    .toUpperCase()
    .replace(/O_AUTH/, 'OAUTH');
};

const INDEX_FILE_PATH = `${DIST_PATH}/index.html`;

const contents = FS.readFileSync(INDEX_FILE_PATH, 'utf8');
var dom = Cheerio.load(contents);
var environmentConfigNode = dom('meta[name="demo/config/environment"]');
var metaContent = environmentConfigNode.attr('content');
var environmentConfigString = decodeURIComponent(metaContent);
var environmentConfig = JSON.parse(environmentConfigString);
var appConfig = environmentConfig.APP;

Object.keys(appConfig).forEach(function(key) {
  var envVarName = keyToEnvVarName(key);
  var envVar = process.env[envVarName];
  if (typeof envVar != 'undefined' && envVar != '') appConfig[key] = envVar;
});

environmentConfigString = JSON.stringify(environmentConfig);
metaContent = encodeURIComponent(environmentConfigString);
environmentConfigNode.attr('content', metaContent);

FS.writeFileSync(INDEX_FILE_PATH, dom.html(), 'utf8');

const PORT = parseInt(process.env.PORT || '3000');

let server = new FastBootAppServer({
  distPath: DIST_PATH,
  gzip: true, // Optional - Enables gzip compression.
  host: '0.0.0.0', // Optional - Sets the host the server listens on.
  port: PORT, // Optional - Sets the port the server listens on (defaults to the PORT env var or 3000).
  // sandboxGlobals: { GLOBAL_VALUE: MY_GLOBAL }, // Optional - Make values available to the Ember app running in the FastBoot server, e.g. "MY_GLOBAL" will be available as "GLOBAL_VALUE"
  chunkedResponse: true // Optional - Opt-in to chunked transfer encoding, transferring the head, body and potential shoeboxes in separate chunks. Chunked transfer encoding should have a positive effect in particular when the app transfers a lot of data in the shoebox.
});

server.start();
