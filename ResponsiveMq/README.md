# README #

### What is it for? ###
Responsive MQ has been designed to enable you to attach JavaScript functions to media queries so you can have viewport specific code executing within your app to partner up with your responsive CSS. It does this by registering named elements of markup which can then be checked on resize to determine what the current viewport is. This is handled by the responsive-mq.js 'registerBreakpoint()' and 'activate()' functions.

### How do I get set up? ###
In order to make use of Responsive MQ, simply add a reference to the javascript file in your page or using your favourite script loader.
```
    <script src="jquery-1.11.1.min.js"></script>
    <script src="responsive-mq.min.js"></script>
```
As of v 1.2.2 it now supports AMD - You can use it with RequireJS like this...
```
define(['responsive-mq', 'jquery'],
    function(ResponsiveMQ) {
		ResponsiveMQ.registerBreakpoint('mobile', '', function () {
            $('#display').text('This is mobile viewport');
        });
    });
```
This will affect where Responsive MQ is placed. If you are using traditional methodology then it will be attached to the jQuery object. If you are using RequireJS then it will be returned by itself.

Responsive MQ is dependent on jQuery. It's been tested with 1.11 but should be compatible with all versions of jQuery - Feel free to raise a bug if you experience any issues with specifc versions. The reason for this is jQuery's comparatively faster speed when setting up resize event responses.

### How do I use it? ###
Using responsive-mq is a two step process. Firstly you need to register a breakpoint against a matching function and an optional function to execute when the breakpoint no longer matches the media query...
```
        $.responsiveMQ.registerBreakpoint(name, mediaQueryName, matchedFunction(), OPTIONAL unmatchedFunction());
```
```
        $.responsiveMQ.registerBreakpoint('mobile', '', function () {
            $('#display').text('This is mobile viewport');
        });
        $.responsiveMQ.registerBreakpoint('tablet', '@media only screen and (min-width: 640px)', function() {
            $('#display').text('This is tablet viewport');
        });
```
or...
```
        $.responsiveMQ.registerBreakpoint('mobile', '', function () {
            $('#display').text('This is mobile viewport');
            $('#notMobile').hide();
        }, function() {
            $('#notMobile').show();
        });
        $.responsiveMQ.registerBreakpoint('tablet', '@media only screen and (min-width: 640px)', function() {
            $('#display').text('This is tablet viewport');
            $('#notTablet').hide();
        }, function () {
            $('#notTablet').show();
        });
```
Once you have registered all of your breakpoint functions you can activate responsive-mq as follows...
```
        $.responsiveMQ.activate();
```
This needs to be a multi-step process so that it can render all of the required markup and style blocks.

### Limitations ###
The intention of responsive-mq is purely to handle identification of a single valid viewport. To this end only one of the specified registered breakpoints will be active at any one time. Trying to use multiple overlapping media queries will have unpredictable results.