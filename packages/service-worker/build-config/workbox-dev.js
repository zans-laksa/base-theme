/* eslint-disable no-param-reassign */
const fs = require('fs');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const FallbackPlugin = require('@scandipwa/webpack-fallback-plugin');
const { sources } = require('@scandipwa/scandipwa-scripts/lib/sources');
const getWorkboxBabelPlugin = require('./lib/workbox-babel-plugin');
const getWarningPlugin = require('./lib/workbox-warning-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    plugin: {
        overrideWebpackConfig: ({
            webpackConfig,
            cracoConfig
            // context: { paths }
        }) => {
            // TODO: replace with PATHS if possible
            const swSrc = FallbackPlugin.getFallbackPathname('src/service-worker.js', sources);

            // Modify plugins if needed
            webpackConfig.plugins.slice().reverse().forEach((plugin, index, newPlugins) => {
                if (plugin instanceof WorkboxWebpackPlugin.InjectManifest) {
                    // remove Inject manifest plugin if it exists
                    webpackConfig.plugins.splice(newPlugins.length - 1 - index, 1);
                }
            });

            if (!fs.existsSync(swSrc)) {
                // skip adding plugin if service-worker does not exist
                return webpackConfig;
            }

            // Remove Workbox warnings
            webpackConfig.plugins.push(getWarningPlugin());

            // Add out own, custom Workbox plugin
            webpackConfig.plugins.push(new WorkboxWebpackPlugin.InjectManifest({
                swSrc,
                exclude: isDev ? [
                    // ignore all assets in development mode
                    (_) => true
                ] : [
                    /\.map$/,
                    /asset-manifest\.json$/,
                    /LICENSE/,
                    // append service-worker, it should not cache itself
                    /service-worker\.js/
                ],
                webpackCompilationPlugins: [
                    getWorkboxBabelPlugin(cracoConfig)
                ],
                dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
                // Bump up the default maximum size (2mb) that's precached,
                // to make lazy-loading failure scenarios less likely.
                // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
                maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
            }));

            return webpackConfig;
        }
    }
};
