# jQuery.gaEvent

A jQuery plugin that makes it easy to write custom Google Analytics events quickly.

[GAEvent Demo on CodePen](http://codepen.io/mike-zarandona/debug/uinvd?gaevent=test)

<br />



## Getting Started

1. Include jQuery
1. Include `jquery.gaevent.js`
1. Fire up GAEvent with something like this:
```javascript
jQuery(document).on('ready', function() {
	$.gaEvent();
});
```
1. Tag events using `data-ga-` attributes

<br />



## Available Attributes

These are the instructions on *how* to implement these parameters - explainations of how to use these fields are below in the *A Note on Google Event Variables* section.

### data-ga-category
```html
<div class="example" data-ga-category="Example GAElement"></div>
```

### data-ga-action
```html
<div class="example" data-ga-category="Example GAElement" data-ga-action="click"></div>
```

### data-ga-label
```html
<div class="example" data-ga-category="Example GAElement" data-ga-label="Item 3"></div>
```

### data-ga-value
```html
<div class="example" data-ga-category="Example GAElement" data-ga-label="Item 4" data-ga-value="0"></div>
```

### data-ga-outbound
```html
<a class="example-anchor" href="http://example.com/page2" data-ga-category="Main Logo" data-ga-label="[[ this page's URL ]]" data-ga-outbound="true">GAEvent Outbound Link Example</a>
```

<br />



## Test Mode
In order to use test mode, append `?gaevent=test` to the end of your URL.  This will generate a console message indicating the plugin is running in test mode, and no events will actually be sent to Google Analytics in this state.  All event hits will be sent to the console.

A note regarding GAEvent test mode: it uses timestamps as unique identifiers.  You may see something like this in the console:
```
GAEvent testMode HIT TRACKED (1410201571442) uinvd?gaevent=true:54
	Category = 'category'
	Action = 'action'
	Label = 'label'
	Value = 'value'
GAEvent: test mode hit 1410201571442 would have navigated to: http://example.com/page3
```
In this case `1410201571442` is a time stamp identifier so that the developer may match up tracking hits and navigation events for easier debugging.  This value has no bearing on Google Events tracking data.

<br />



## Example
Report a click on a `.logo` image element:
```html
<img src="http://cdn.example.com/img123.png" alt="Some Element" data-ga-category="Main Logo Image" data-ga-label="[[ this page's URL ]]" />
```
**ProTip**: You can use PHP or JavaScript to fill in dynamic variable content for the _label_ or _value_.

<br />



## A Note on Google Event Variables: C.A.L.V.
The [Google Analytics documentation on event tracking](https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide) defines the four main variables as the following:

> ### Category (required)
> The name you supply for the group of objects you want to track.
> 
> ### Action (required)
> A string that is uniquely paired with each category, and commonly used to define the type of user interaction for the web object.
> 
> ### Label (optional)
> An optional string to provide additional dimensions to the event data.
> 
> ### Value (optional)
> An integer that you can use to provide numerical data about the user event.

&nbsp;
**Here's what these mean in plain English:**
&nbsp;

### Category (required)
This is a grouping or heading of items to be tracked.  These groups may have one element being tracked under this *category*, or many.  *REQUIRED since this attribute is what invokes GAEvent on an element.*

*Examples*: &nbsp;`Main Logo`, `Slider Buttons`, `News Article`, `Social Badge`

### Action (optional)
This is the *action* the visitor took to trigger this event.  This can be set to almost anything, however if the *action* is not passed in via `data-ga-action=""`, then by default it is set to "`click`," since GAEvent is set to fire on `click` by default.  (Makes sense, huh?)

**ProTip**: *Google Analytics* requires every event have an *action* parameter, however since GAEvent defaults this parameter feel free to omit it.

### Label
This is the "*additional dimensions*" parameter, which means this parameter is meant to further clarify the data captured in the *category* parameter.  Examples relative to the *category* do the best job of how to best use this parameter:

|Category	| Label	|
|---	|---	|
| `Main Logo`	| Dynamic page URL (Useful in identifying from what page visitors are returning home) |
| `Slider Buttons`	| `prev` or `next` |
| `News Article`	| News article title (e.g. `In Other News There Was No Real News Today`) |
| `Social Badge`	| Name of social network (e.g. `Twitter`, `Google Plus`) |

### Value
TL;DR:  This parameter is usually omitted.

The most common use for *value* has been to record a number of user interactions as they relate to the *category* / *value* parameter pair.  E.g.: the *value* of "`4`" could indicate that this is the *fourth* instance of a visitor interacting with a particular slider button.  Most of the time this value is passed in as an empty string which is the default submission value if the `data-ga-value=""` parameter is omitted.

### Bonus:  Outbound
The last property available is a special one, invoked by `data-ga-outbound="true`.  **This must be called on an anchor tag** so that an `href` location is available.  Rather than immediately firing the event, this parameter tells the plugin to first intercept the click and initially block the navigation so that the event has time to record.  After one-third of a second the script will fire a page navigation based on the target elements' `href` property.

<br />



## Double Bonus: Sublime Text 2 Snippets
Two `.sublime-snippet` files are included with this release, which are long- and short-versions of the inline implementation of GAEvent.  Place them into `Packages\User` and restart Sublime Text 2.

### gaevent
**`gaevent` + `tab`** turns into
```html
data-ga-category="category" data-ga-label="label"
```

### gaeventfull
**`gaeventfull` + `tab`** turns into
```html
data-ga-category="category" data-ga-action="action" data-ga-label="label" data-ga-value="value" data-ga-outbound="false"
```

Use them in good health!  If you have snippets for other editors, feel free to send a pull request.

<br />



## Legacy (v1.x.x)
The legacy version of this plugin allowed for programmatic implementation.  To use this version download the latest 1.x.x version [here](https://github.com/mike-zarandona/GAEvent/releases/tag/v1.0.5).

<br />




## Implementation

I **STRONGLY** recommend using the [Google Analytics Debugger extension for Chrome](http://tinyurl.com/knv6kos) when implementing this plugin.  It regularly saves me a ton of time and headache when working with Google Analytics.

<br />



## Author
Mike Zarandona • [http://mikezarandona.com](http://mikezarandona.com) • [@mikezarandona](http://twitter.com/mikezarandona)
