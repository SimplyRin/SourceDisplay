/*!
 * Created by SimplyRin on 2019/07/29.
 *
 * Copyright (c) 2019 SimplyRin
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var href = "";
function check() {
    var current = location.href;
    if (href !== current) {
        href = current;
        if (href.includes("/status/")) {
            var child = document.getElementsByClassName("client-and-actions")[0];
            if (child != null && child.children[0] != null) {
                child = child.children[0];

                var accessToken = "";
                var accessTokenSecret = "";
                try {
                    chrome.storage.local.get(['oauth_token', 'oauth_token_secret'], function(value) {
                        accessToken = value.oauth_token;
                        accessTokenSecret = value.oauth_token_secret;

                        postRequest("https://api.v2.simplyrin.net/Twitter/SourceViewer/source.php?id=" + href.split("/")[5] + "&accessToken=" + accessToken + "&accessTokenSecret=" + accessTokenSecret, child);
                    });
                } catch (e) {
                    postRequest("https://api.v2.simplyrin.net/Twitter/SourceViewer/source.php?id=" + href.split("/")[5], child);
                }
            }
        }
    }
    setTimeout(check, 500);
}

function postRequest(url, child) {
    var request = new XMLHttpRequest();
    request.open("get", url, true);
    request.onload = function (event) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                child.innerHTML += "・ " + request.responseText;
            } else {
                console.log(request.statusText);
            }
        }
    };
    request.onerror = function (event) {
        console.log(event.type);
    };
    request.send(null);
}
setTimeout(check, 500);
