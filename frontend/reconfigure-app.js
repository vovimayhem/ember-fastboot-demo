const FS = require('fs');
const Cheerio = require('cheerio');
const Path = require('path');

function keyToEnvVarName(key){
  return key
    .replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();})
    .toUpperCase()
    .replace(/O_AUTH/, 'OAUTH');
}

function loadDOM(filePath) {
  const indexFilePath = getBackupOrFilePath(filePath);
  const contents = FS.readFileSync(indexFilePath, 'utf8');
  return Cheerio.load(contents);
}

function getEnvConfigNode(appName, appDOM) {
  return appDOM(`meta[name="${appName}/config/environment"]`);
}

function updateEnvConfigNode(envConfigNode, envConfig) {
  const envConfigString = JSON.stringify(envConfig);
  const metaContent = encodeURIComponent(envConfigString);
  envConfigNode.attr('content', metaContent);
}

// Loads the ${DIST_PATH}/package.json into an object:
function loadDistPackage(distPath) {
  const packageFilePath = getBackupOrFilePath(`${distPath}/package.json`);
  const dataString = FS.readFileSync(packageFilePath, 'utf8');
  return JSON.parse(dataString);
}

function processConfigWithEnv(config, ENV_PROCESSING) {
  const { ENV_MAPPING, ENV_TRANSFORM } = ENV_PROCESSING;
  Object.keys(config).forEach(function(configKey) {
    Object.keys(config[configKey]).forEach(function(configSubKey) {
      const envVarName = keyToEnvVarName(configSubKey);
      const envMapping = ENV_MAPPING[envVarName] || 'APP';
      if (envMapping == configKey) {
        const [envTransformMethod, ...envTransformArgs] = ENV_TRANSFORM[envVarName] || ['toString'];
        const envVarValue = process.env[envVarName];
        if (typeof envVarValue != 'undefined' && envVarValue != '') {
          config[envMapping][configSubKey] = envVarValue[envTransformMethod](...envTransformArgs);
        }
      }
    })
  });
}

function writeConfigToPackage(config, distPath) {
  const configString = JSON.stringify(config);
  const packageFilePath = `${distPath}/package.json`;
  const packageFileBackupPath = `${distPath}/package.bak`;
  
  if (!FS.existsSync(packageFileBackupPath)) {
    FS.copyFileSync(packageFilePath, packageFileBackupPath);
  }
  
  FS.writeFileSync(packageFilePath, configString, 'utf8');
}

function writeAppEnvToIndex(config, distPath) {
  const { appName } = config.fastboot;
  const appEnvConfig = config.fastboot.config[appName];

  const filePath = `${distPath}/index.html`;
  const appDOM = loadDOM(filePath);

  const envConfigNode = getEnvConfigNode(appName, appDOM);
  
  updateEnvConfigNode(envConfigNode, appEnvConfig);
  writeFileWithBackup(filePath, appDOM.html(), 'utf8');
}

function getBackupPath(filePath) {
  const dirName = Path.dirname(filePath);
  const fileExt = Path.extname(filePath);
  const fileBase = Path.basename(filePath, fileExt);
  return `${dirName}/${fileBase}.bak`;
}

function getBackupOrFilePath(filePath) {
  const backupPath = getBackupPath(filePath);
  if (FS.existsSync(backupPath)) return backupPath;
  return filePath;
}

function writeFileWithBackup(filePath, contents, encoding) {
  const backupPath = getBackupPath(filePath);
  if (!FS.existsSync(backupPath)) FS.copyFileSync(filePath, backupPath);
  FS.writeFileSync(filePath, contents, encoding);
}

module.exports = {
  fromProcessEnv(distPath, ENV_PROCESSING) {
    const config = loadDistPackage(distPath);
    const { appName } = config.fastboot;
    const appEnvConfig = config.fastboot.config[appName];

    // Replace the root configuration, specially the 'fastboot.hostWhitelist' key:
    processConfigWithEnv(config, ENV_PROCESSING);

    // Replace the app configuration:
    processConfigWithEnv(appEnvConfig, ENV_PROCESSING);

    // From this point, 'config' has been processed, and we're ready to write down the files:
    writeConfigToPackage(config, distPath);
    writeAppEnvToIndex(config, distPath);
  }
}