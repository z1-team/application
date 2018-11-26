// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/, // Files that are not in `app` dir.
      'app.js': /^app/
    }
  },
  stylesheets: {joinTo: 'app.css'}
};

exports.plugins = {
  babel: {presets: ['@babel/preset-env','@babel/preset-react'], ignore: []},
  sass: {mode: 'native'},
  postcss: {
    processors: [
      require('autoprefixer')(['last 8 versions', 'Safari > 10'])
    ]
  }
};
