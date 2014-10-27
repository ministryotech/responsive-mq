/* responsive-mq.js - v1.0.1.0 */
/*
 * ResponsiveMQ     Bringing media queries to Javascript
 * Author           Keith Jackson (tiefling)
 * Company          The Ministry of Technology (ministryotech)
 * License          MIT / http://bit.ly/mit-license
 * WebSite          http://www.ministryotech.co.uk
 */

(function ($) {

    $.responsiveMQ = $.responsiveMQ || {};

    $.responsiveMQ.registeredBreakpoints = [];
    $.responsiveMQ.lastActiveBreakpointName = '';

    $.responsiveMQ.registerBreakpoint = function (name, mediaQueryCssName, matchedFunc, notMatchedFunc) {
        $.responsiveMQ.registeredBreakpoints.push({ 'name': name, 'mediaQueryCssName': mediaQueryCssName, 'matchedFunc': matchedFunc, 'notMatchedFunc': notMatchedFunc });
    };

    $.responsiveMQ.activate = function () {

        var renderMarkup = function (className) {
            $(document.body).append('<span class="' + className + '"></span>');
        };

        var renderStyle = function (className, mediaQueryCssName) {
            var styleString = '\n';
            if (mediaQueryCssName != '') {
                styleString += mediaQueryCssName + '{\n';
                for (var bpi = 0; bpi < $.responsiveMQ.registeredBreakpoints.length; bpi++) {
                    if ($.responsiveMQ.registeredBreakpoints[bpi].name !== className) {
                        styleString += '   .' + $.responsiveMQ.registeredBreakpoints[bpi].name + ' { display: none; }\n';
                    } else {
                        styleString += '   .' + className + ' { display: inline; }\n';
                    }
                }
                styleString += '}\n';
            } else {
                for (var bpx = 0; bpx < $.responsiveMQ.registeredBreakpoints.length; bpx++) {
                    if ($.responsiveMQ.registeredBreakpoints[bpx].name !== className) {
                        styleString += '.' + $.responsiveMQ.registeredBreakpoints[bpx].name + ' { display: none; }\n';
                    } else {
                        styleString += '.' + className + ' { display: inline; }\n';
                    }
                }
            }
            $(document.head).append('<style>' + styleString + '</style>');
        };

        var applyResponsiveJs = function () {
            for (var rjsi = 0; rjsi < $.responsiveMQ.registeredBreakpoints.length; rjsi++) {
                var bp = $.responsiveMQ.registeredBreakpoints[rjsi];
                if ($('.' + bp.name).css('display') == 'inline') {
                    if (bp.name !== $.responsiveMQ.lastActiveBreakpointName) {
                        $.responsiveMQ.lastActiveBreakpointName = bp.name;
                        var matchedFunc = bp.matchedFunc;
                        if (matchedFunc !== undefined && matchedFunc !== null) {
                            matchedFunc();
                        }
                    }
                } else {
                    var notMatchedFunc = bp.notMatchedFunc;
                    if (notMatchedFunc !== undefined && notMatchedFunc !== null) {
                        notMatchedFunc();
                    }
                }
            }
        };

        for (var i = 0; i < $.responsiveMQ.registeredBreakpoints.length; i++) {
            renderMarkup($.responsiveMQ.registeredBreakpoints[i].name);
            renderStyle($.responsiveMQ.registeredBreakpoints[i].name, $.responsiveMQ.registeredBreakpoints[i].mediaQueryCssName);
        }

        $(window).on('resize', applyResponsiveJs);
        $(document).ready(applyResponsiveJs);
    };

})(jQuery);