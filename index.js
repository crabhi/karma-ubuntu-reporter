//Manage notification center in osx
//Based on https://npmjs.org/package/node-osx-notifier
//Configuration sample:
// osxNotifications = {
//   notify: true,
//   host: "localhost",  //Defaults to localhost
//   port: 1337 //defaults to 1337
// };
var util = require('util');
var spawn = require('child_process').spawn;
var path = require('path');
var root = __dirname;

var UbuntuReporter = function(helper, logger) {
  var log = logger.create('reporter.ubuntu');

  this.onBrowserComplete = function(browser) {
    var results = browser.lastResult;
    var time = helper.formatTimeInterval(results.totalTime);

    var icon = null,
        title = null,
        message = null;

    log.debug(results);

    if (results.failed) {
      icon = 'dialog-error';
      title = util.format('FAILED - %s', browser.name);
      message = util.format('%d/%d tests failed in %s.', results.failed, results.total, time);
    }
    else if (results.disconnected || results.error) {
      icon = 'face-crying';
      title = util.format('ERROR - %s', browser.name);
      message = 'Test error';
    }
    else {
      icon = 'emblem-default'; // Currently, this is a green tick mark. Didn't find better stock id.
      title = util.format('PASSED - %s', browser.name);
      message = util.format('%d tests passed in %s.', results.success, time);
    }

    ls = spawn("notify-send", ["-i", icon, title, message]);
    ls.on('close', function (code) {
        log.debug('Notifier finished. Code: ' + code);
    });
  };
};

// PUBLISH DI MODULE
module.exports = {
  'reporter:ubuntu': ['type', UbuntuReporter]
};
