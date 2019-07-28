/*!
 * Licence: MIT Licence
 * URL: https://github.com/lambtron/chrome-extension-twitter-oauth-example
 * 
 * Copyright (c) 2017 Andy Jiang
 */
if (location.href.includes("https://api.v2.simplyrin.net/Twitter/SourceViewer/callback.html")) {
	chrome.runtime.sendMessage({type: 'auth', session: window.location.search.substr(1)}, function(response) {
		window.open('', '_self', '');
		window.close();
	});
}
