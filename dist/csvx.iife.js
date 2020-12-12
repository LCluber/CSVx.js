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
 * The above copyright notice and this permission notice (including the next
 * paragraph) shall be included in all copies or substantial portions of the
 * Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * https://github.com/LCluber/CSVx.js
 */
var CSVx = (function (exports) {
  'use strict';

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        return function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    it = o[Symbol.iterator]();
    return it.next.bind(it);
  }

  /** MIT License
   *
   * Copyright (c) 2009 Ludovic CLUBER
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice (including the next
   * paragraph) shall be included in all copies or substantial portions of the
   * Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   * https://github.com/LCluber/Ch.js
   */

  function isObject(object) {
    return object !== null && typeof object === "object" && !isArray(object);
  }

  function isArray(array) {
    return array !== null && array.constructor === Array;
  }

  var Export = /*#__PURE__*/function () {
    function Export() {}

    Export.data = function data(filename, _data, options) {
      for (var _iterator = _createForOfIteratorHelperLoose(_data), _step; !(_step = _iterator()).done;) {
        var row = _step.value;

        if (!isObject(row)) {
          return false;
        }
      }

      if (!filename) {
        filename = 'export';
      }

      if (options) {
        this.setOptions(options);
      }

      var table = '';
      var labels = [];

      if (!this.options.customLabels) {
        labels = this.createLabels(_data);
      } else {
        labels = this.createCustomLabels(this.options.customLabels);
      }

      if (this.options.labels) {
        table += this.createLabelsRow(labels);
      }

      table += this.createTable(_data);
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
      var encodedTable = "data:" + this.options.data + ";charset=" + this.options.charset + "," + escape(table);

      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(encodedTable, filename);
      } else {
        var link = document.createElement('a');
        link.setAttribute('href', encodedTable);
        link.setAttribute('download', filename + '.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };

    Export.createTable = function createTable(data) {
      var _a;

      var table = '';

      for (var _iterator2 = _createForOfIteratorHelperLoose(data), _step2; !(_step2 = _iterator2()).done;) {
        var row = _step2.value;
        var parsedRow = '';

        for (var property in this.options.customLabels) {
          if (this.options.customLabels.hasOwnProperty(property)) {
            parsedRow += this.createField((_a = row[property]) !== null && _a !== void 0 ? _a : '');
          }
        }

        table += this.createRow(parsedRow);
      }

      return table;
    };

    Export.createLabels = function createLabels(data) {
      var params = [];

      for (var _iterator3 = _createForOfIteratorHelperLoose(data), _step3; !(_step3 = _iterator3()).done;) {
        var row = _step3.value;
        var i = 0;

        var _loop = function _loop(property) {
          if (row.hasOwnProperty(property)) {
            var newProperty = params.find(function (value) {
              return value === property;
            });

            if (!newProperty) {
              params.splice(i, 0, property);
            }

            i++;
          }
        };

        for (var property in row) {
          _loop(property);
        }
      }

      this.options.customLabels = {};

      for (var _i = 0, _params = params; _i < _params.length; _i++) {
        var param = _params[_i];
        this.options.customLabels[param] = param;
      }

      return params;
    };

    Export.createCustomLabels = function createCustomLabels(customLabels) {
      var params = [];

      for (var property in customLabels) {
        if (customLabels.hasOwnProperty(property)) {
          params.push(customLabels[property]);
        }
      }

      return params;
    };

    Export.createLabelsRow = function createLabelsRow(labels) {
      var parsedRow = '';

      for (var _iterator4 = _createForOfIteratorHelperLoose(labels), _step4; !(_step4 = _iterator4()).done;) {
        var label = _step4.value;
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
  }();
  Export.options = {
    data: 'text/csv',
    charset: 'utf-8',
    labels: true,
    quote: '"',
    separator: ',',
    CRLF: '\r\n',
    customLabels: null
  };

  var Convert = /*#__PURE__*/function () {
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
        return false;
      }

      var array = [];

      for (var _iterator = _createForOfIteratorHelperLoose(rows), _step; !(_step = _iterator()).done;) {
        var row = _step.value;
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

  exports.Convert = Convert;
  exports.Export = Export;

  return exports;

}({}));
