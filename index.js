var util = require('util');
var spawn = require('child_process').spawn;
var path = require('path');
var dbus = require('dbus-native');

var UbuntuReporter = function(helper, logger) {
  var log = logger.create('reporter.ubuntu');

    var notifications = null;
    var notificationId = 0;

    var sessionBus = dbus.systemBus();
    sessionBus.getService('org.freedesktop.Notifications').getInterface(
            '/org/freedesktop/Notifications',
            'org.freedesktop.Notifications', function(err, service) {
                notifications = service;
            });

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

    if (notifications) {
        notifications.Notify('', notificationId, icon, title, message, [], [], 5, function(err, id) {
            notificationId = id;
        });
    } else {
        log.info("Notification service not ready yet");
    }
  };
};

// PUBLISH DI MODULE
module.exports = {
  'reporter:ubuntu': ['type', UbuntuReporter]
};
