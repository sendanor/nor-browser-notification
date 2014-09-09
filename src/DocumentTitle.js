/**
 * Simple browser notifications
 * Copyright (C) 2014 Jaakko-Heikki Heusala <jheusala@iki.fi>
 */

"use strict";

var debug = require('nor-debug');
var $ = require('jquery');

/** */
function DocumentTitle(opts) {
	opts = opts || {};

	debug.assert(opts).is('object');
	debug.assert(opts.document).is('object');
	debug.assert(opts.window).is('object');

	var self = this;

	self.document = opts.document;

	/** Status of focus on page */
	self._has_focus = null;

	var window = opts.window;
	$(window).bind("focus", function() { self._has_focus = true; });
	$(window).bind("blur", function() { self._has_focus = false; });

}

/** Set title of the current page
 * @param value {string} The new value for title
 */
DocumentTitle.prototype.set = function set_title(value) {
	debug.assert(value).is('string');
	this.document.title = value;
};

/** Get title of the current page
 * @returns The current title of the page
 */
DocumentTitle.prototype.get = function get_title() {
	return this.document.title;
};

/** Returns `true` if page has focus
 * @returns {Boolean} True if page has focus.
 */
DocumentTitle.prototype.hasFocus = function has_focus() {
	return this._has_focus;
};

// Exports
module.exports = DocumentTitle;

/* EOF */
