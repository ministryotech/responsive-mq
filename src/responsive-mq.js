/*
 * ResponsiveMQ     Bringing media queries to Javascript
 * Author           Keith Jackson (tiefling)
 * Company          The Ministry of Technology (ministryotech)
 * License          MIT / http://bit.ly/mit-license
 */


export default function(/** @type {JQueryStatic} */ $) {

    const responsiveMq = {}

    /**
     * @type {*[]}
     */
    responsiveMq.registeredBreakpoints = []

    responsiveMq.lastActiveBreakpointName = ''

    /**
     * Register a breakpoint.
     * @param {string} name
     * @param {string} mediaQueryCssName
     * @param {Function} matchedFunc
     * @param {Function} notMatchedFunc
     */
    responsiveMq.registerBreakpoint = function(name, mediaQueryCssName, matchedFunc, notMatchedFunc) {
        responsiveMq.registeredBreakpoints.push({
            'name': name,
            'mediaQueryCssName': mediaQueryCssName,
            'matchedFunc': matchedFunc,
            'notMatchedFunc': notMatchedFunc,
        })
    }

    responsiveMq.activate = function() {

        /**
         * @param {string} className
         */
        const renderMarkup = function(className) {
            $(document.body).append('<span class="' + className + '"></span>')
        }

        /**
         * @param {string} className
         * @param {string} mediaQueryCssName
         */
        const renderStyle = function(className, mediaQueryCssName) {
            let styleString = '\n'
            if (mediaQueryCssName !== '') {
                styleString += mediaQueryCssName + '{\n'
                for (let bpi = 0; bpi < responsiveMq.registeredBreakpoints.length; bpi++) {
                    if (responsiveMq.registeredBreakpoints[bpi].name !== className)
                        styleString += '   .' + responsiveMq.registeredBreakpoints[bpi].name + ' { display: none; }\n'
                    else
                        styleString += '   .' + className + ' { display: inline; }\n'

                }
                styleString += '}\n'
            } else {
                for (let bpx = 0; bpx < responsiveMq.registeredBreakpoints.length; bpx++) {
                    if (responsiveMq.registeredBreakpoints[bpx].name !== className)
                        styleString += '.' + responsiveMq.registeredBreakpoints[bpx].name + ' { display: none; }\n'
                    else
                        styleString += '.' + className + ' { display: inline; }\n'

                }
            }
            $(document.head).append('<style>' + styleString + '</style>')
        }

        const applyResponsiveJs = function() {
            for (let rjsi = 0; rjsi < responsiveMq.registeredBreakpoints.length; rjsi++) {
                const bp = responsiveMq.registeredBreakpoints[rjsi]
                if ($('.' + bp.name).css('display') === 'inline') {
                    if (bp.name !== responsiveMq.lastActiveBreakpointName) {
                        responsiveMq.lastActiveBreakpointName = bp.name
                        const matchedFunc = bp.matchedFunc
                        if (matchedFunc !== undefined && matchedFunc !== null)
                            matchedFunc()

                    }
                } else {
                    const notMatchedFunc = bp.notMatchedFunc
                    if (notMatchedFunc !== undefined && notMatchedFunc !== null)
                        notMatchedFunc()

                }
            }
        }

        for (let i = 0; i < responsiveMq.registeredBreakpoints.length; i++) {
            renderMarkup(responsiveMq.registeredBreakpoints[i].name)
            renderStyle(responsiveMq.registeredBreakpoints[i].name, responsiveMq.registeredBreakpoints[i].mediaQueryCssName)
        }

        $(window).on('resize', applyResponsiveJs)
        $(document).ready(applyResponsiveJs)
    }

    return responsiveMq
}
