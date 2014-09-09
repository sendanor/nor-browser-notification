/**
 * Simple browser notifications
 * Copyright (C) 2014 Jaakko-Heikki Heusala <jheusala@iki.fi>
 */

"use strict";

var debug = require('nor-debug');
var $ = require('jquery');

/** Create title notifications using flash style */
function TitleFlasher(opts) {
	opts = opts || {};

	debug.assert(opts).is('object');
	debug.assert(opts.title).is('object');
	debug.assert(opts.interval).ignore(undefined).is('number');

	var self = this;
	self._title = opts.title;
	self._original_title = self._title.get();

	self._current_title = 0;
	self._titles = [];

	self._interval = null;

	/** The time between intervals in milliseconds */
	self._interval_time = opts.interval || 1000;
}

/** Start notifications
 */
TitleFlasher.prototype.start = function() {
	var self = this;

	if(self._interval) {
		throw new TypeError("Notifications already started!");
	}

	$(function() {
		var msg_active = false;

		self._interval = setInterval(function() {

			var has_focus = self._title.hasFocus();

			// If the page has focus...
			if(has_focus) {

				// ...and notification is set, let's clear it.
				if(msg_active) {
					self._title.set(self._original_title);
					msg_active = false;
				}

				self._current_title = 0;
				self._titles = [];
				return;

			}

			// Show the original title until next interval
			if(msg_active) {
				self._title.set(self._original_title);
				msg_active = false;
				return;
			}

			// If there is other titles, lets show one of them until next interval
			if(self._titles.length >= 1) {

				if(self._current_title >= self._titles.length) {
					self._current_title = 0;
				}

				self._title.set( self._titles[self._current_title] );

				self._current_title += 1;

				msg_active = true;
			}

		}, self._interval_time);
	});
};

/** Append new notification message
 * @param msg {string} New message to append into visible notifications
 */
TitleFlasher.prototype.append = function(msg) {
	this._titles.push(msg);
};

// Exports
module.exports = TitleFlasher;

/* EOF */
