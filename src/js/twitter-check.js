/*!
 * Licence: MIT Licence
 * URL: https://github.com/lambtron/chrome-extension-twitter-oauth-example
 * 
 * Copyright (c) 2017 Andy Jiang
 */
Twitter.isLoggedIn(function(items) {
	if (!items.oauth_token || !items.oauth_token_secret) {
		document.getElementById('authenticate').addEventListener('click', function() {
			Twitter.authenticate();
		});
	} else {
		document.getElementById('authenticate').disabled = true;
		document.getElementById('authenticate').value = 'Twitter アカウントにログイン済み';
	}
});
