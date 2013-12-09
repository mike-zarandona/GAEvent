/*********************************
 * jQuery.gaEvent
 * Description:		gaEvent makes it easy to write one-liner Google Event custom events.
 * Author:			Mike Zarandona
 * Version:			1.0.3
 *					Changed from jQuery .click to .on for better handling of dynamic elements
 *
 * Variables:		category [REQUIRED] [string] the name supplied for the group of objects to track
 * 					action   [REQUIRED] [string] a unique user-action paired with each category, and commonly used to define the type of user interaction for the web object
 * 					label    [OPTIONAL] [string] optional field to provide additional dimension to the event data
 *										pageURL   | label = the current page's URL
 * 										pageTitle | label = the current page's title
 *										linkDest  | label = the referenced link's destination (reference an a tag)
 *										linkTitle | label = the referenced link's title (reference an a tag)
 * 					value    [OPTIONAL] [int] integer that can be used to provide numerical data about the user event
 *
 * Usage:			$('#logo img').gaEvent('Logo', 'Click', 'Home');
 *					$('a#atag').gaEvent('Header Link', 'Click', 'pageTitle');
 * 
 * Note: 			I STRONGLY recommend using the Google Analytics Debugger extension for Chrome (http://tinyurl.com/knv6kos) when implementing this plugin
*********************************/

(function($){
	jQuery.fn.gaEvent = function(category, action, label, value) {

		return this.each(function(){

			// Set label as 'pageURL' to grab the current page URL
			var pageURL = window.location;
			if (label == 'pageURL') { label = pageURL; }

			// Set label as 'pageTitle' to grab the current page title
			var pageTitle = document.title;
			if (label == 'pageTitle') { label = pageTitle; }

			// Set label as 'linkDest' to grab the destination link href attribute value
			var linkDest = $(this).attr('href');
			if (label == 'linkDest') { label = linkDest; }

			// Set label as 'linkTitle' to grab the destination link title attribute value
			var linkTitle = $(this).attr('title');
			if (label == 'linkTitle') { label = linkTitle; }

			// Make sure not to send a label of 'undefined'
			if (label === undefined) { label = ''; }


			// Report to Google Analytics
			$(this).on('click', function() { _gaq.push(['_trackEvent', category, action, label, value]); });
		});
	};
})(jQuery);