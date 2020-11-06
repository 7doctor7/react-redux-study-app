import path from 'path';

export default {
  root: path.resolve(__dirname, '../../'),
  outputPath: path.resolve(__dirname, '../', 'build'),
  entryPath: path.resolve(__dirname, '../', 'src/index.js'),
  templatePath: path.resolve(__dirname, '../public', 'index.html'),
  faviconPath: path.resolve(__dirname, '../', 'public/favicon.ico'),
  manifestPath: path.resolve(__dirname, '../', 'public/manifest.json'),
  staticPath: path.resolve(__dirname, '../', 'public'),
  assetsPath: path.resolve(__dirname, '../', 'public/assets'),
};
