const FS = require('fs');
const Cheerio = require('cheerio');

function keyToEnvVarName(key){
  return key
    .replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();})
    .toUpperCase()
    .replace(/O_AUTH/, 'OAUTH');
}

function loadDOM(indexFilePath) {
  const contents = FS.readFileSync(indexFilePath, 'utf8');
  return Cheerio.load(contents);
}

function getEnvConfigNode(appName, appDOM) {
  return appDOM(`meta[name="${appName}/config/environment"]`);
}

function parseEnvConfigNode(appConfigNode) {
  let metaContent = appConfigNode.attr('content');
  let envConfigString = decodeURIComponent(metaContent);
  return JSON.parse(envConfigString);
}

function updateEnvConfig(envConfig, envConfigNode) {
  const envConfigString = JSON.stringify(envConfig);
  const metaContent = encodeURIComponent(envConfigString);
  envConfigNode.attr('content', metaContent);
}

function writeUpdatedDOM(updatedDOM, indexFilePath) {
  FS.writeFileSync(indexFilePath, updatedDOM.html(), 'utf8');
}

module.exports = {
  fromProcessEnv: function(appName, distPath) {
    const indexFilePath = `${distPath}/index.html`;
    let appDOM = loadDOM(indexFilePath);
    let envConfigNode = getEnvConfigNode(appName, appDOM);
    let envConfig = parseEnvConfigNode(envConfigNode);

    Object.keys(envConfig.APP).forEach(function(key) {
      const envVarName = keyToEnvVarName(key);
      const envVar = process.env[envVarName];
      if (typeof envVar != 'undefined' && envVar != '') envConfig.APP[key] = envVar;
    });

    updateEnvConfig(envConfig, envConfigNode);
    writeUpdatedDOM(appDOM, indexFilePath);
  }
}