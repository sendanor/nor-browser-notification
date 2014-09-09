/**
 * Simple browser notifications
 * Copyright (C) 2014 Jaakko-Heikki Heusala <jheusala@iki.fi>
 */

"use strict";

var DocumentTitle = require('./DocumentTitle.js');
var TitleFlasher = require('./TitleFlasher.js');

/** Global notifier */
var _notifier = new TitleFlasher({
	'title': new DocumentTitle({
		'document': require('./document.js'),
		'window': require('./window.js')
	})
});

_notifier.start();

/** Append message to global notifier */
module.exports = function start_notification(msg) {
	return _notifier.append(msg);
};

/* EOF */
