const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.transformer.minifierPath = require.resolve("metro-minify-esbuild");
config.transformer.minifierConfig = {
  drop: ["console"],
};

module.exports = config;