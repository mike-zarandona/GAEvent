/*
|--------------------------------------------------------------------------
| GAEvent
|--------------------------------------------------------------------------
| Custom Google Analytics events made easy.
|
| Version:		v2.0.0
| Author:		Mike Zarandona | @mikezarandona
| Release:		Sep 08, 2014
|				Refactored to `data-` attributes
|
| Reqs:			jQuery
|
| Usage:		$.gaEvent();
|				Test Mode:  '?gaevent=true'
|
| Note:			STRONGLY RECOMMENDED: Google Analytics Debugger extension
|				for Chrome (http://tinyurl.com/knv6kos) when implementing
|				to be sure Google is receiving the correct data.
|
*/

;(function($) {

	$.gaEvent = function() {

		// report test mode to the console
		if ( getURLParameter('gaevent') ) { console.warn('GAEvent running in %cTest Mode', 'font-weight: bold;'); }

		$('[data-ga-category]').on('click', function(event) {

			// read the `data-` attribute data
			var thisCategory =		$(this).attr('data-ga-category'),
				thisAction =		$(this).attr('data-ga-action'),
				thisLabel =			$(this).attr('data-ga-label'),
				thisValue =			$(this).attr('data-ga-value'),
				thisOutbound =		$(this).attr('data-ga-outbound'),
				thisTimestamp =		Date.now();


			// check to see if the category is defined (we kinda need that)
			if ( thisCategory === undefined ) {
				console.error('GAEvent: No %ccategory%c defined.', 'font-weight: bold; text-transform: uppercase;', 'font-weight: normal;');
			}

			// check if this is an outbound track (they're special)
			else if ( thisOutbound == 'true' ) {

				// error checking - must be an `<a/>` tag
				if ( $(this).get(0).tagName != 'A' ) {
					console.error('GAEvent: Outbound set to `true` on a tag which is not an `<a/>`.');
				}

				// is an `<a/>` tag, continue
				else {
					event.preventDefault();

					// where we're headed next
					var newURL = $(this).attr('href');

					// track the event!
					trackEvent( thisCategory, thisAction, thisLabel, thisValue, thisTimestamp );

					// go to the new destination
					if ( ! getURLParameter('gaevent') )  {
						// delay to accomodate an outbound event track
						window.setTimeout(function() {
							window.location = newURL;
						}, 333);
					}

					// or just console the page navigation when in test mode
					else {
						window.setTimeout(function() {
							console.log('GAEvent: test mode hit ' + thisTimestamp + ' would have navigated to:  %c' + newURL, 'font-weight: bold;');
						}, 333);
					}
				}
			}

			else {
				// track the event!
				trackEvent( thisCategory, thisAction, thisLabel, thisValue, thisTimestamp );
			}
		});



		// Helper function to track events
		function trackEvent( category, action, label, value, timestamp ) {

			// if `action` is undefined, we'll send the default action of 'click'
			if ( action === undefined ) { action = 'Click'; }

			// make sure not to send a label of `undefined`
			if ( label === undefined ) { label = ''; }

			// make sure not to send a value of `undefined`
			if ( value === undefined ) { value = ''; }


			// testMode = false
			if ( ! getURLParameter('gaevent') ) {

				// Universal (analytics.js | new)
				if (typeof ga === 'function') {
					ga('send', 'event', category, action, label, value);
				}

				// Classic (ga.js | old)
				if (typeof _gaq !== 'undefined' && typeof _gaq.push === 'function') {
					_gaq.push(['_trackEvent', category, action, label, value]);
				}
			}

			// testMode = true
			else {
				console.group('GAEvent testMode HIT TRACKED (' + timestamp + ')');
					console.info('Category = \'' + category + '\'');
					console.info('Action = \'' + action + '\'');
					console.info('Label = \'' + label + '\'');
					console.info('Value = \'' + value + '\'');
				console.groupEnd();
			}
		}



		// Helper function to get URL parameters
		function getURLParameter(name) {
			name = name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");

			var regexS = "[\\?&]" + name + "=([^&#]*)",
				regex = new RegExp( regexS ),
				results = regex.exec( window.location.href );

			if( results === null )
				return "";
			else
				return results[1];
		}

	};
})(jQuery);
