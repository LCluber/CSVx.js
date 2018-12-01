/** MIT License
* 
* Copyright (c) 2018 Ludovic CLUBER 
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
*
* http://csvxjs.lcluber.com
*/

var CSVx = (function (exports) {
    'use strict';

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /** MIT License
    * 
    * Copyright (c) 2010 Ludovic CLUBER 
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
    *
    * http://aiasjs.lcluber.com
    */

    var HTTP = function () {
        function HTTP() {
            _classCallCheck(this, HTTP);
        }

        _createClass(HTTP, null, [{
            key: 'get',
            value: function get(url) {
                return this.call('GET', url);
            }
        }, {
            key: 'head',
            value: function head(url) {
                return this.call('HEAD', url);
            }
        }, {
            key: 'post',
            value: function post(url) {
                return this.call('POST', url);
            }
        }, {
            key: 'put',
            value: function put(url) {
                return this.call('PUT', url);
            }
        }, {
            key: 'delete',
            value: function _delete(url) {
                return this.call('DELETE', url);
            }
        }, {
            key: 'connect',
            value: function connect(url) {
                return this.call('CONNECT', url);
            }
        }, {
            key: 'options',
            value: function options(url) {
                return this.call('OPTIONS', url);
            }
        }, {
            key: 'trace',
            value: function trace(url) {
                return this.call('TRACE', url);
            }
        }, {
            key: 'patch',
            value: function patch(url) {
                return this.call('PATCH', url);
            }
        }, {
            key: 'call',
            value: function call(method, url) {
                var _this = this;

                return new Promise(function (resolve, reject) {
                    var http = new XMLHttpRequest();
                    if (_this.noCache) {
                        url += '?cache=' + new Date().getTime();
                    }
                    http.open(method, url, _this.async);
                    http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    http.onreadystatechange = function () {
                        if (http.readyState == 4) {
                            if (http.status == 200) {
                                console.log('xhr done successfully (' + url + ')');
                                resolve(http.responseText);
                            } else {
                                console.log('error', 'xhr failed (' + url + ')');
                                reject(http.status);
                            }
                        }
                    };
                    console.log('xhr processing starting (' + url + ')');
                    http.send();
                });
            }
        }]);

        return HTTP;
    }();

    HTTP.async = true;
    HTTP.noCache = false;

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /** MIT License
    * 
    * Copyright (c) 2018 Ludovic CLUBER 
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
    *
    * http://weejs.lcluber.com
    */

    var Check = function () {
        function Check() {
            _classCallCheck$1(this, Check);
        }

        _createClass$1(Check, null, [{
            key: 'isJSON',
            value: function isJSON(str) {
                if (!this.isString(str)) {
                    return false;
                }
                var json = str.replace(/(\r\n|\n|\r|\t)/gm, '');
                try {
                    json = JSON.parse(str);
                } catch (e) {
                    console.log(e);
                    return false;
                }
                return json;
            }
        }, {
            key: 'isFunction',
            value: function isFunction(func) {
                var getType = {};
                return func && getType.toString.call(func) === '[object Function]';
            }
        }, {
            key: 'isObject',
            value: function isObject(object) {
                return object !== null && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object';
            }
        }, {
            key: 'isASCII',
            value: function isASCII(code, extended) {
                return (extended ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(code);
            }
        }, {
            key: 'isInteger',
            value: function isInteger(value) {
                return value === parseInt(value, 10);
            }
        }, {
            key: 'isString',
            value: function isString(str) {
                return typeof str === 'string';
            }
        }]);

        return Check;
    }();

    var Dom = function () {
        function Dom() {
            _classCallCheck$1(this, Dom);
        }

        _createClass$1(Dom, null, [{
            key: 'scrollToBottom',
            value: function scrollToBottom(HtmlElement) {
                HtmlElement.scrollTop = HtmlElement.scrollHeight;
            }
        }, {
            key: 'findById',
            value: function findById(id) {
                return document.getElementById(id);
            }
        }, {
            key: 'showById',
            value: function showById(a) {
                this.findById(a).style.display = 'block';
            }
        }, {
            key: 'hideById',
            value: function hideById(a) {
                this.findById(a).style.display = 'none';
            }
        }, {
            key: 'showOverflow',
            value: function showOverflow() {
                document.body.style.overflow = 'visible';
            }
        }, {
            key: 'hideOverflow',
            value: function hideOverflow() {
                document.body.style.overflow = 'hidden';
            }
        }, {
            key: 'getInputValue',
            value: function getInputValue(a) {
                return this.findById(a).value;
            }
        }, {
            key: 'clearInputValue',
            value: function clearInputValue(a) {
                this.findById(a).value = '';
            }
        }, {
            key: 'focusOn',
            value: function focusOn(a) {
                this.findById(a).focus();
            }
        }, {
            key: 'addHTMLElement',
            value: function addHTMLElement(parentElement, childElementType, childElementOptions) {
                var newElement = document.createElement(childElementType);
                if (childElementOptions !== undefined) {
                    Object.keys(childElementOptions).forEach(function (key) {
                        if (key === 'textContent' || key === 'innerHTML') {
                            newElement[key] = childElementOptions[key];
                        } else {
                            newElement.setAttribute(key, childElementOptions[key]);
                        }
                    });
                }
                parentElement.appendChild(newElement);
                return newElement;
            }
        }]);

        return Dom;
    }();

    var Bind = function () {
        function Bind(element, data) {
            _classCallCheck$1(this, Bind);

            this.data = data;
            this.element = element;
            this.element.value = data;
            this.element.addEventListener('change', this, false);
        }

        _createClass$1(Bind, [{
            key: 'handleEvent',
            value: function handleEvent(event) {
                switch (event.type) {
                    case 'change':
                        this.change(this.element.value);
                }
            }
        }, {
            key: 'change',
            value: function change(value) {
                this.data = value;
                this.element.value = value;
            }
        }]);

        return Bind;
    }();

    var String = function () {
        function String() {
            _classCallCheck$1(this, String);
        }

        _createClass$1(String, null, [{
            key: 'ucfirst',
            value: function ucfirst(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        }, {
            key: 'toASCII',
            value: function toASCII(code) {
                return code.charCodeAt(0);
            }
        }]);

        return String;
    }();

    var File = function () {
        function File() {
            _classCallCheck$1(this, File);
        }

        _createClass$1(File, null, [{
            key: 'load',
            value: function load(path) {
                return HTTP.get(path);
            }
        }, {
            key: 'removeTrailingSlash',
            value: function removeTrailingSlash(path) {
                return path.replace(/\/+$/, '');
            }
        }, {
            key: 'getName',
            value: function getName(path) {
                return path.replace(/^.*[\\\/]/, '');
            }
        }, {
            key: 'getExtension',
            value: function getExtension(path) {
                return path.split('.').pop();
            }
        }, {
            key: 'getDirectory',
            value: function getDirectory(path) {
                return path.replace(/[^\\\/]*$/, '');
            }
        }, {
            key: 'checkExtension',
            value: function checkExtension(extension, validExtensions) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = validExtensions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var validExtension = _step.value;

                        if (extension === validExtension) {
                            return true;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return false;
            }
        }]);

        return File;
    }();

    var Img = function () {
        function Img() {
            _classCallCheck$1(this, Img);
        }

        _createClass$1(Img, null, [{
            key: 'load',
            value: function load(path) {
                return new Promise(function (resolve, reject) {
                    var img = new Image();
                    img.src = path;
                    img.name = File.getName(path);
                    console.log('xhr processing starting (' + path + ')');
                    img.addEventListener('load', function () {
                        console.log('xhr done successfully (' + path + ')');
                        resolve(img);
                    });
                    img.addEventListener('error', function () {
                        console.log('error', 'xhr failed (' + path + ')');
                        reject(new Error('xhr failed (' + path + ')'));
                    });
                });
            }
        }]);

        return Img;
    }();

    var Sound = function () {
        function Sound() {
            _classCallCheck$1(this, Sound);
        }

        _createClass$1(Sound, null, [{
            key: 'load',
            value: function load(path) {
                return new Promise(function (resolve, reject) {
                    var snd = new Audio();
                    snd.src = path;
                    console.log('xhr processing starting (' + path + ')');
                    snd.addEventListener('canplaythrough', function () {
                        console.log('xhr done successfully (' + path + ')');
                        resolve(snd);
                    }, false);
                    snd.addEventListener('canplay', function () {
                        console.log('xhr done successfully (' + path + ')');
                        resolve(snd);
                    }, false);
                    snd.addEventListener('error', function () {
                        console.log('error', 'xhr failed (' + path + ')');
                        reject(new Error('xhr failed (' + path + ')'));
                    }, false);
                });
            }
        }]);

        return Sound;
    }();

    var Export = function () {
        function Export() {}
        Export.data = function (filename, data, options) {
            if (!Check.isObject(data[0]) && !Check.isJSON(data[0])) {
                return false;
            }
            if (options) {
                this.setOptions(options);
            }
            var table = 'data:' + this.options.data + ';charset=' + this.options.charset + ',';
            if (this.options.labels) {
                table += this.createLabels(data);
            }
            table += this.createTable(data);
            this.download(table, filename);
            return true;
        };
        Export.setOptions = function (options) {
            for (var property in options) {
                if (options.hasOwnProperty(property) && this.options.hasOwnProperty(property)) {
                    this.options[property] = options[property];
                }
            }
        };
        Export.download = function (table, filename) {
            var encodedUri = encodeURI(table);
            var link = Dom.addHTMLElement(document.body, 'a', { href: encodedUri, download: filename + '.csv' });
            link.click();
            document.body.removeChild(link);
        };
        Export.createTable = function (data) {
            var table = '';
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var row = data_1[_i];
                var obj = Check.isJSON(row) || row;
                if (!Check.isObject(obj)) {
                    return table;
                }
                var parsedRow = '';
                for (var property in obj) {
                    if (obj.hasOwnProperty(property)) {
                        parsedRow += this.createField(obj[property]);
                    }
                }
                table += this.createRow(parsedRow);
                
            }
            return table;
        };
        Export.createLabels = function (data) {
            var labels = Check.isJSON(data[0]) || data[0];
            var parsedRow = '';
            for (var label in labels) {
                if (labels.hasOwnProperty(label)) {
                    parsedRow += this.createField(label);
                }
            }
            return this.createRow(parsedRow);
        };
        Export.createRow = function (row) {
            return row + this.options.CRLF;
        };
        Export.createField = function (content) {
            return this.options.quote + content + this.options.quote + this.options.separator;
        };
        Export.options = {
            data: 'text/csv',
            charset: 'utf-8',
            labels: true,
            quote: '"',
            separator: ',',
            CRLF: '\r\n'
        };
        return Export;
    }();

    exports.Export = Export;

    return exports;

}({}));
