const FtpDeploy = require('ftp-deploy')
const ftpDeploy = new FtpDeploy()

const config = {
  user: "a3mxda_vadim2",
  password: "sg0P*ZM2",
  host: "a3mxda.beget.tech",
  port: 21,
  localRoot: __dirname + '/public',
  remoteRoot: './',
  include: ['*', '**/*', '.htaccess'],      // this would upload everything except dot files
  exclude: ['**/*.map'],     // e.g. exclude sourcemaps - ** exclude: [] if nothing to exclude **
  deleteRemote: false,              // delete existing files at destination before uploading
  forcePasv: true                 // Passive mode is forced (EPSV command is not sent)
}

ftpDeploy.deploy(config)
  .then(res => console.log('finished'))
  .catch(console.log)

// test commit