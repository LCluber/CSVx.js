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

    Is.ascii = function ascii(code, extended) {
      return (extended ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(code);
    };

    Is.integer = function integer(value) {
      return value === parseInt(value, 10);
    };

    Is.string = function string(str) {
      return typeof str === 'string';
    };

    return Is;
  }();

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

    Dom.findById = function findById(id) {
      return document.getElementById(id);
    };

    Dom.showById = function showById(a) {
      this.findById(a).style.display = 'block';
    };

    Dom.hideById = function hideById(a) {
      this.findById(a).style.display = 'none';
    };

    Dom.showOverflow = function showOverflow() {
      document.body.style.overflow = 'visible';
    };

    Dom.hideOverflow = function hideOverflow() {
      document.body.style.overflow = 'hidden';
    };

    Dom.getInputValue = function getInputValue(a) {
      return this.findById(a).value;
    };

    Dom.clearInputValue = function clearInputValue(a) {
      this.findById(a).value = '';
    };

    Dom.focusOn = function focusOn(a) {
      this.findById(a).focus();
    };

    Dom.addHTMLElement = function addHTMLElement(parentElement, childElementType, childElementOptions) {
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
    };

    return Dom;
  }();

  var Export =
  /*#__PURE__*/
  function () {
    function Export() {}

    Export.data = function data(filename, _data, options) {
      if (!Is.object(_data[0]) && !Is.json(_data[0])) {
        return false;
      }

      if (options) {
        this.setOptions(options);
      }

      var table = 'data:' + this.options.data + ';charset=' + this.options.charset + ',';

      if (this.options.labels) {
        table += this.createLabels(_data);
        Logger.info('[CSVx] ' + filename + ' labels ready');
      }

      table += this.createTable(_data);
      Logger.info('[CSVx] ' + filename + ' table ready');
      this.download(table, filename);
      return true;
    };

    Export.setOptions = function setOptions(options) {
      for (var property in options) {
        if (options.hasOwnProperty(property) && this.options.hasOwnProperty(property)) {
          this.options[property] = options[property];
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
      Logger.info('[CSVx] ' + filename + ' downloading');
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

    Export.createRow = function createRow(row) {
      return row + this.options.CRLF;
    };

    Export.createField = function createField(content) {
      return this.options.quote + content + this.options.quote + this.options.separator;
    };

    return Export;
  }();
  Export.options = {
    data: 'text/csv',
    charset: 'utf-8',
    labels: true,
    quote: '"',
    separator: ',',
    CRLF: '\r\n'
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

      var rows = data.split(this.options.CRLF);

      if (!rows.length) {
        Logger.warn('[CSVx] ' + this.options.CRLF + ' CRLF not found');
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
  }();
  Convert.options = {
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
