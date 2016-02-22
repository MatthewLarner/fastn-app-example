var fixedFix = require('fixed-fix'),
    quickClick = require('quick-click'),
    doc = require('doc-js');

fixedFix();
quickClick.init();

var isSafariOnMacintosh = (/Macintosh(?!.*?Chrome).+Safari/.test(window.navigator.userAgent));

if(isSafariOnMacintosh) {
    doc('html').addClass('safariMac');
}
