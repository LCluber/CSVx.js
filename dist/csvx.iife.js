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

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /** MIT License
  * 
  * Copyright (c) 2015 Ludovic CLUBER 
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
  * http://mouettejs.lcluber.com
  */
  var LEVELS = [{
    id: 1,
    name: 'info'
  }, {
    id: 2,
    name: 'trace'
  }, {
    id: 3,
    name: 'warn'
  }, {
    id: 4,
    name: 'error'
  }, {
    id: 99,
    name: 'off'
  }];

  var Message =
  /*#__PURE__*/
  function () {
    function Message(levelName, content) {
      this.setLevel(levelName);
      this.content = content;
    }

    var _proto = Message.prototype;

    _proto.setLevel = function setLevel(name) {
      this.level = this.findLevel(name);
    };

    _proto.getLevelId = function getLevelId() {
      return this.level.id;
    };

    _proto.display = function display() {
      console[this.level.name](this.content);
    };

    _proto.findLevel = function findLevel(name) {
      for (var _i = 0; _i < LEVELS.length; _i++) {
        var level = LEVELS[_i];

        if (level.name === name) {
          return level;
        }
      }

      return this.level ? this.level : LEVELS[0];
    };

    return Message;
  }();

  var Logger =
  /*#__PURE__*/
  function () {
    function Logger() {}

    Logger.info = function info(text) {
      Logger.log('info', text);
    };

    Logger.trace = function trace(text) {
      Logger.log('trace', text);
    };

    Logger.time = function time(text) {
      Logger.log('time', text);
    };

    Logger.warn = function warn(text) {
      Logger.log('warn', text);
    };

    Logger.error = function error(text) {
      Logger.log('error', text);
    };

    Logger.log = function log(levelName, content) {
      Logger.addMessage(levelName, content);
      var message = this.messages[this.nbMessages - 1];

      if (this._level.id <= message.getLevelId()) {
        message.display();
      }
    };

    Logger.addMessage = function addMessage(levelName, content) {
      this.messages.push(new Message(levelName, content));
      this.nbMessages++;
    };

    Logger.findLevel = function findLevel(name) {
      for (var _i2 = 0; _i2 < LEVELS.length; _i2++) {
        var level = LEVELS[_i2];

        if (level.name === name) {
          return level;
        }
      }

      return this._level ? this._level : LEVELS[0];
    };

    _createClass(Logger, [{
      key: "level",
      set: function set(name) {
        Logger._level = Logger.findLevel(name);
      },
      get: function get() {
        return Logger._level.name;
      }
    }]);

    return Logger;
  }();

  Logger._level = Logger.findLevel(LEVELS[0].name);
  Logger.messages = [];
  Logger.nbMessages = 0;
  Logger.target = document.getElementById('Mouette');

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
  * http://chjs.lcluber.com
  */
  var Is =
  /*#__PURE__*/
  function () {
    function Is() {}

    Is.json = function json(str) {
      if (!this.string(str)) {
        return false;
      }

      var json = str.replace(/(\r\n|\n|\r|\t)/gm, '');

      try {
        json = JSON.parse(str);
      } catch (e) {
        Logger.error(e);
        return false;
      }

      return json;
    };

    Is.function = function _function(func) {
      var getType = {};
      return func && getType.toString.call(func) === '[object Function]';
    };

    Is.object = function object(_object) {
      return _object !== null && typeof _object === 'object';
    };

    Is.array = function array(_array) {
      return _array !== null && _array.constructor === Array;
    };

    Is.ascii = function ascii(code, extended) {
      return (extended ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(code);
    };

    Is.integer = function integer(value) {
      return value === parseInt(value, 10);
    };

    Is.float = function float(value) {
      return Number(value) === value && value % 1 !== 0;
    };

    Is.string = function string(str) {
      return typeof str === 'string';
    };

    return Is;
  }();

  /** MIT License
  * 
  * Copyright (c) 2015 Ludovic CLUBER 
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
  * http://mouettejs.lcluber.com
  */
  var LEVELS$1 = [{
    id: 1,
    name: 'info'
  }, {
    id: 2,
    name: 'trace'
  }, {
    id: 3,
    name: 'warn'
  }, {
    id: 4,
    name: 'error'
  }, {
    id: 99,
    name: 'off'
  }];

  var Message$1 =
  /*#__PURE__*/
  function () {
    function Message(levelName, content) {
      this.setLevel(levelName);
      this.content = content;
    }

    var _proto = Message.prototype;

    _proto.setLevel = function setLevel(name) {
      this.level = this.findLevel(name);
    };

    _proto.getLevelId = function getLevelId() {
      return this.level.id;
    };

    _proto.display = function display() {
      console[this.level.name](this.content);
    };

    _proto.findLevel = function findLevel(name) {
      for (var _i = 0; _i < LEVELS$1.length; _i++) {
        var level = LEVELS$1[_i];

        if (level.name === name) {
          return level;
        }
      }

      return this.level ? this.level : LEVELS$1[0];
    };

    return Message;
  }();

  var Logger$1 =
  /*#__PURE__*/
  function () {
    function Logger() {}

    Logger.info = function info(text) {
      Logger.log('info', text);
    };

    Logger.trace = function trace(text) {
      Logger.log('trace', text);
    };

    Logger.time = function time(text) {
      Logger.log('time', text);
    };

    Logger.warn = function warn(text) {
      Logger.log('warn', text);
    };

    Logger.error = function error(text) {
      Logger.log('error', text);
    };

    Logger.log = function log(levelName, content) {
      Logger.addMessage(levelName, content);
      var message = this.messages[this.nbMessages - 1];

      if (this._level.id <= message.getLevelId()) {
        message.display();
      }
    };

    Logger.addMessage = function addMessage(levelName, content) {
      this.messages.push(new Message$1(levelName, content));
      this.nbMessages++;
    };

    Logger.findLevel = function findLevel(name) {
      for (var _i2 = 0; _i2 < LEVELS$1.length; _i2++) {
        var level = LEVELS$1[_i2];

        if (level.name === name) {
          return level;
        }
      }

      return this._level ? this._level : LEVELS$1[0];
    };

    _createClass(Logger, [{
      key: "level",
      set: function set(name) {
        Logger._level = Logger.findLevel(name);
      },
      get: function get() {
        return Logger._level.name;
      }
    }]);

    return Logger;
  }();

  Logger$1._level = Logger$1.findLevel(LEVELS$1[0].name);
  Logger$1.messages = [];
  Logger$1.nbMessages = 0;
  Logger$1.target = document.getElementById('Mouette');

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
  * http://chjs.lcluber.com
  */

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

  /** MIT License
  * 
  * Copyright (c) 2015 Ludovic CLUBER 
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
  * http://mouettejs.lcluber.com
  */
  var LEVELS$2 = [{
    id: 1,
    name: 'info'
  }, {
    id: 2,
    name: 'trace'
  }, {
    id: 3,
    name: 'warn'
  }, {
    id: 4,
    name: 'error'
  }, {
    id: 99,
    name: 'off'
  }];

  var Message$2 =
  /*#__PURE__*/
  function () {
    function Message(levelName, content) {
      this.setLevel(levelName);
      this.content = content;
    }

    var _proto = Message.prototype;

    _proto.setLevel = function setLevel(name) {
      this.level = this.findLevel(name);
    };

    _proto.getLevelId = function getLevelId() {
      return this.level.id;
    };

    _proto.display = function display() {
      console[this.level.name](this.content);
    };

    _proto.findLevel = function findLevel(name) {
      for (var _i = 0; _i < LEVELS$2.length; _i++) {
        var level = LEVELS$2[_i];

        if (level.name === name) {
          return level;
        }
      }

      return this.level ? this.level : LEVELS$2[0];
    };

    return Message;
  }();

  var Logger$2 =
  /*#__PURE__*/
  function () {
    function Logger() {}

    Logger.info = function info(text) {
      Logger.log('info', text);
    };

    Logger.trace = function trace(text) {
      Logger.log('trace', text);
    };

    Logger.time = function time(text) {
      Logger.log('time', text);
    };

    Logger.warn = function warn(text) {
      Logger.log('warn', text);
    };

    Logger.error = function error(text) {
      Logger.log('error', text);
    };

    Logger.log = function log(levelName, content) {
      Logger.addMessage(levelName, content);
      var message = this.messages[this.nbMessages - 1];

      if (this._level.id <= message.getLevelId()) {
        message.display();
      }
    };

    Logger.addMessage = function addMessage(levelName, content) {
      this.messages.push(new Message$2(levelName, content));
      this.nbMessages++;
    };

    Logger.findLevel = function findLevel(name) {
      for (var _i2 = 0; _i2 < LEVELS$2.length; _i2++) {
        var level = LEVELS$2[_i2];

        if (level.name === name) {
          return level;
        }
      }

      return this._level ? this._level : LEVELS$2[0];
    };

    _createClass(Logger, [{
      key: "level",
      set: function set(name) {
        Logger._level = Logger.findLevel(name);
      },
      get: function get() {
        return Logger._level.name;
      }
    }]);

    return Logger;
  }();

  Logger$2._level = Logger$2.findLevel(LEVELS$2[0].name);
  Logger$2.messages = [];
  Logger$2.nbMessages = 0;
  Logger$2.target = document.getElementById('Mouette');

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
  var Dom =
  /*#__PURE__*/
  function () {
    function Dom() {}

    Dom.scrollToBottom = function scrollToBottom(HtmlElement) {
      HtmlElement.scrollTop = HtmlElement.scrollHeight;
    };

    Dom.scrollToTop = function scrollToTop(HtmlElement) {
      HtmlElement.scrollTop = 0;
    };

    Dom.findById = function findById(id) {
      return document.getElementById(id);
    };

    Dom.findByClass = function findByClass(className) {
      return this.arrayFrom(document.getElementsByClassName(className));
    };

    Dom.findByTag = function findByTag(tagName) {
      return this.arrayFrom(document.getElementsByTagName(tagName));
    };

    Dom.showElement = function showElement(element) {
      return this.styleElement(element, 'display', 'block');
    };

    Dom.hideElement = function hideElement(element) {
      return this.styleElement(element, 'display', 'none');
    };

    Dom.styleElement = function styleElement(element, parameter, value) {
      element = this.checkElement(element);

      if (element) {
        element.style[parameter] = value;
      }

      return element;
    };

    Dom.showOverflow = function showOverflow() {
      document.body.style.overflow = 'visible';
    };

    Dom.hideOverflow = function hideOverflow() {
      document.body.style.overflow = 'hidden';
    };

    Dom.getInputValue = function getInputValue(element) {
      element = this.checkElement(element);

      if (element) {
        return element.value;
      }

      return null;
    };

    Dom.clearInputValue = function clearInputValue(element) {
      element = this.checkElement(element);

      if (element) {
        element.value = '';
      }

      return element;
    };

    Dom.focusOn = function focusOn(element) {
      element = this.checkElement(element);

      if (element) {
        element.focus();
      }

      return element;
    };

    Dom.addHTMLElement = function addHTMLElement(parentElement, childElementType, childElementAttributes) {
      parentElement = this.checkElement(parentElement);
      var newElement = document.createElement(childElementType);

      if (childElementAttributes) {
        Object.keys(childElementAttributes).forEach(function (key) {
          if (key === 'textContent' || key === 'innerHTML') {
            newElement[key] = childElementAttributes[key];
          } else {
            newElement.setAttribute(key, childElementAttributes[key]);
          }
        });
      }

      parentElement.appendChild(newElement);
      return newElement;
    };

    Dom.clearHTMLElement = function clearHTMLElement(element) {
      element = this.checkElement(element);

      if (element) {
        element.innerHTML = '';
      }

      return element;
    };

    Dom.arrayFrom = function arrayFrom(HTMLCollection) {
      var elements = [];

      for (var i = 0; i < HTMLCollection.length; i++) {
        elements.push(HTMLCollection[i]);
      }

      return elements;
    };

    Dom.checkElement = function checkElement(element) {
      if (Is.string(element)) {
        element = this.findById(element);
      }

      return element;
    };

    return Dom;
  }();

  /** MIT License
  * 
  * Copyright (c) 2015 Ludovic CLUBER 
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
  * http://mouettejs.lcluber.com
  */
  var LEVELS$3 = {
    info: {
      id: 1,
      name: 'info',
      color: '#28a745'
    },
    trace: {
      id: 2,
      name: 'trace',
      color: '#17a2b8'
    },
    warn: {
      id: 3,
      name: 'warn',
      color: '#ffc107'
    },
    error: {
      id: 4,
      name: 'error',
      color: '#dc3545'
    },
    off: {
      id: 99,
      name: 'off',
      color: null
    }
  };

  var Message$3 =
  /*#__PURE__*/
  function () {
    function Message(level, content) {
      this.id = level.id;
      this.name = level.name;
      this.color = level.color;
      this.content = content;
    }

    var _proto = Message.prototype;

    _proto.display = function display() {
      console[this.name]('%c' + this.content, 'color:' + this.color + ';');
    };

    return Message;
  }();

  var Logger$3 =
  /*#__PURE__*/
  function () {
    function Logger() {}

    Logger.info = function info(message) {
      Logger.log(LEVELS$3.info, message);
    };

    Logger.trace = function trace(message) {
      Logger.log(LEVELS$3.trace, message);
    };

    Logger.warn = function warn(message) {
      Logger.log(LEVELS$3.warn, message);
    };

    Logger.error = function error(message) {
      Logger.log(LEVELS$3.error, message);
    };

    Logger.log = function log(level, messageContent) {
      var message = new Message$3(level, messageContent);
      this.messages.push(message);
      this.nbMessages++;

      if (this._level.id <= message.id) {
        message.display();
      }
    };

    _createClass(Logger, [{
      key: "level",
      set: function set(name) {
        Logger._level = LEVELS$3.hasOwnProperty(name) ? LEVELS$3[name] : LEVELS$3.info;
      },
      get: function get() {
        return Logger._level.name;
      }
    }]);

    return Logger;
  }();

  Logger$3._level = LEVELS$3.info;
  Logger$3.messages = [];
  Logger$3.nbMessages = 0;

  var Export =
  /*#__PURE__*/
  function () {
    function Export() {}

    Export.data = function data(filename, _data, options) {
      if (!Is.object(_data[0]) && !Is.json(_data[0])) {
        return false;
      }

      if (!filename.trim().length) {
        filename = 'export';
      }

      if (options) {
        this.setOptions(options);
      }

      var table = 'data:' + this.options.data + ';charset=' + this.options.charset + ",\uFEFF";

      if (this.options.labels) {
        if (this.options.customLabels.length > 0) {
          table += this.createCustomLabels(this.options.customLabels);
        } else {
          table += this.createLabels(_data);
        }

        Logger$3.info('[CSVx] ' + filename + ' labels ready');
      }

      table += this.createTable(_data);
      Logger$3.info('[CSVx] ' + filename + ' table ready');
      this.download(table, filename);
      return true;
    };

    Export.setOptions = function setOptions(options) {
      for (var property in options) {
        if (options.hasOwnProperty(property) && this.options.hasOwnProperty(property)) {
          this.options[property] = options[property] || this.options[property];
        }
      }
    };

    Export.download = function download(table, filename) {
      var encodedUri = encodeURI(table);
      var link = Dom.addHTMLElement(document.body, 'a', {
        href: encodedUri,
        download: filename + '.csv'
      });
      link.click();
      document.body.removeChild(link);
      Logger$3.info('[CSVx] ' + filename + ' downloading');
    };

    Export.createTable = function createTable(data) {
      var table = '';

      for (var _iterator = data, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var row = _ref;
        var obj = Is.json(row) || row;

        if (!Is.object(obj)) {
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

    Export.createLabels = function createLabels(data) {
      var labels = Is.json(data[0]) || data[0];
      var parsedRow = '';

      for (var label in labels) {
        if (labels.hasOwnProperty(label)) {
          parsedRow += this.createField(label);
        }
      }

      return this.createRow(parsedRow);
    };

    Export.createCustomLabels = function createCustomLabels(customLabels) {
      var parsedRow = '';

      for (var _iterator2 = customLabels, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var label = _ref2;
        parsedRow += this.createField(label);
      }

      return this.createRow(parsedRow);
    };

    Export.createRow = function createRow(row) {
      return row.slice(0, -1) + this.options.CRLF;
    };

    Export.createField = function createField(content) {
      return this.options.quote + content + this.options.quote + this.options.separator;
    };

    return Export;
  }(); // default option values

  Export.options = {
    data: 'text/csv',
    charset: 'utf-8',
    labels: true,
    quote: '"',
    separator: ',',
    CRLF: '\r\n',
    customLabels: []
  };

  var Convert =
  /*#__PURE__*/
  function () {
    function Convert() {}

    Convert.setOptions = function setOptions(options) {
      this.setObject('options', options);
    };

    Convert.setCSS = function setCSS(css) {
      this.setObject('css', css);
    };

    Convert.array = function array(data, options, css) {
      if (options) {
        this.setOptions(options);
      }

      if (css) {
        this.setCSS(css);
      }

      var rows = data.trim().split(this.options.CRLF).filter(Boolean);

      if (!rows.length) {
        Logger$3.warn('[CSVx] ' + this.options.CRLF + ' CRLF not found');
        return false;
      }

      var array = [];

      for (var _iterator = rows, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var row = _ref;
        var cells = row.split(this.options.separator);

        if (this.options.quote) {
          for (var i = 0; i < cells.length; i++) {
            cells[i] = cells[i].slice(1, -1);
          }
        }

        array.push(cells);
      }

      return array;
    };

    Convert.table = function table(data, options, css) {
      var array = this.array(data, options, css);

      if (array) {
        var thead = '';
        var table = [];

        for (var i = 0; i < array.length; i++) {
          var cellType = 'td';
          var style = '';

          if (!i && this.options.labels) {
            cellType = 'th';

            if (this.css.th) {
              style = ' class = "' + this.css.th + '"';
            }

            thead = '<thead>' + this.createTr(array[i], cellType, style) + '</thead>';
          } else {
            table.push(this.createTr(array[i], cellType, ''));
          }
        }

        if (thead || table.length) {
          var _style = this.css.table ? 'class="' + this.css.table + '"' : '';

          return '<table ' + _style + '>' + thead + '<tbody>' + table.join('') + '</tbody></table>';
        }
      }

      return false;
    };

    Convert.createTr = function createTr(row, cellType, style) {
      return '<tr><' + cellType + style + '>' + row.join('</' + cellType + '><' + cellType + style + '>') + '</' + cellType + '></tr>';
    };

    Convert.setObject = function setObject(parameterName, newObject) {
      for (var property in newObject) {
        if (newObject.hasOwnProperty(property) && this[parameterName].hasOwnProperty(property)) {
          this[parameterName][property] = newObject[property];
        }
      }
    };

    return Convert;
  }(); // static html: string = null;
  // default option values

  Convert.options = {
    // data: 'text/csv',
    // charset: 'utf-8',
    labels: true,
    quote: '"',
    separator: ',',
    CRLF: '\r\n'
  };
  Convert.css = {
    table: '',
    th: ''
  };

  exports.Export = Export;
  exports.Convert = Convert;

  return exports;

}({}));
