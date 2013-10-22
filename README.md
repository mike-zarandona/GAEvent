# jQuery.gaEvent

A jQuery plugin that makes it easy to write custom Google Analytics events quickly.



## Getting Started

To use gaEvent, simply target an element(s) and pass in GA variables.



## Examples
Report a logo click:

    $('#logo img').gaEvent('Logo', 'Click', 'Home');

Target an `a` tag:

    $('a#atag').gaEvent('Header Link', 'Click', 'pageTitle');




## Variables

    $('.foo').gaEvent('category', 'action', 'label', 'value');

`category`&nbsp;&nbsp;&nbsp; [**REQUIRED**] [*string*] the name supplied for the group of objects to track

`action`&nbsp;&nbsp;&nbsp; [**REQUIRED**] [*string*] a unique user-action paired with each category, and commonly used to define the type of user interaction for the web object

`label`&nbsp;&nbsp;&nbsp; [**OPTIONAL**] [*string* | *variable*] optional field to provide additional dimension to the event data

`value`&nbsp;&nbsp;&nbsp; [**OPTIONAL**] [*int*] integer that can be used to provide numerical data about the user event



## `Label` Variables

The `label` argument is a great place to dynamically capture information about the page or link that is currently being targeted.  Pass in these variable placeholder names to populate the `label` argument with dynamic data.

- `pageURL` The current page's URL
- `pageTitle` The current page's title
- `linkDest` The referenced link's destination (make sure to target an `a` tag)
- `linkTitle` The referenced link's title (make sure to target an `a` tag)



## Implementation

I **STRONGLY** recommend using the [Google Analytics Debugger extension for Chrome](http://tinyurl.com/knv6kos) when implementing this plugin.  It saved me a ton of time and headache.



## Author
Mike Zarandona • [http://mikezarandona.com](http://mikezarandona.com) • [@mikezarandona](http://twitter.com/mikezarandona)