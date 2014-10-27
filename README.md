# README #

### What is it for? ###
Responsive MQ has been designed to enable you to attach JavaScript functions to media queries so you can have viewport specific code executing within your app to partner up with your responsive CSS. It does this by registering named elements of markup which can then be checked on resize to determine what the current viewport is. This is handled by the responsive-mq.js 'registerBreakpoint()' and 'activate()' functions.

### How do I get set up? ###
In order to make use of Responsive MQ, simply add a reference to the javascript file in your page or using your favourite script loader.
In the attached sample HTML file the references are added manually toward the end of the body tag.

```
#!html
    <script src="jquery-1.11.1.min.js"></script>
    <script src="responsive-mq.min.js"></script>
```

Responsive MQ is dependent on jQuery. It's been tested with 1.11 but should be compatible with all versions of jQuery - Feel free to raise a bug if you experience any issues with specifc versions. The reason for this is jQuery's comparatively faster speed when setting up resize event responses.

### How do I use it? ###
Using responsive-mq is a two step process. Firstly you need to register a breakpoint against a matching function and an optional function to execute when the breakpoint no longer matches the media query...
```
#!javascript
        $.responsiveMQ.registerBreakpoint('mobile', '', function () {
            $('#display').text('This is mobile viewport');
        });
```
or...
```
#!javascript
        $.responsiveMQ.registerBreakpoint('mobile', '', function () {
            $('#display').text('This is mobile viewport');
            $('#notMobile').hide();
        }, function() {
            $('#notMobile').show();
        });
```
Once you have registered all of your breakpoint functions you can activate responsive-mq as follows...
```
#!javascript
        $.responsiveMQ.activate();
```
This needs to be a multi-step process so that it can render all of the required markup and style blocks.

### Limitations ###
The intention of responsive-mq is purely to handle identification of a single valid viewport. To this end only one of the specified registered breakpoints will be active at any one time. Trying to use multiple overlapping media queries will have unpredictable results.

### Where can I get it? ###
You can download the javascript file from the source here and add it to your website manually or you can use any of the following pacakge managers...

- **NPM** - [https://www.npmjs.org/package/responsive-mq](https://www.npmjs.org/package/responsive-mq)
- **NUGET** - [https://www.nuget.org/packages/responsive-mq/](https://www.nuget.org/packages/responsive-mq/)

### Contribution guidelines ###
If you would like to contribute to the project, please contact me.

### Who do I talk to? ###
* Keith Jackson - keith@ministryotech.co.uk