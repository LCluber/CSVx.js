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

import { Dom } from '@lcluber/weejs';
import { Is } from '@lcluber/chjs';
import { Logger } from '@lcluber/mouettejs';

class Export {
    static data(filename, data, options) {
        if (!Is.object(data[0]) && !Is.json(data[0])) {
            return false;
        }
        if (!filename) {
            filename = 'export';
        }
        if (options) {
            this.setOptions(options);
        }
        let table = 'data:' + this.options.data + ';charset=' + this.options.charset + ',\uFEFF';
        if (this.options.labels) {
            if (this.options.customLabels.length > 0) {
                table += this.createCustomLabels(this.options.customLabels);
            }
            else {
                table += this.createLabels(data);
            }
            this.log.info(filename + ' labels ready');
        }
        table += this.createTable(data);
        this.log.info(filename + ' table ready');
        this.download(table, filename);
        return true;
    }
    static setOptions(options) {
        for (const property in options) {
            if (options.hasOwnProperty(property) && this.options.hasOwnProperty(property)) {
                this.options[property] = options[property] || this.options[property];
            }
        }
    }
    static download(table, filename) {
        //let encodedUri = encodeURI(table);
        if (window.navigator.msSaveOrOpenBlob) {
            // IE11
            window.navigator.msSaveOrOpenBlob(table, filename);
        }
        else {
            let link = Dom.addHTMLElement(document.body, 'a', { href: table, download: filename + '.csv' });
            link.click();
            document.body.removeChild(link);
            this.log.info(filename + ' downloading');
        }
    }
    static createTable(data) {
        let table = '';
        for (const row of data) {
            let obj = Is.json(row) || row;
            if (!Is.object(obj)) {
                return table;
            }
            let parsedRow = '';
            for (const property in obj) {
                if (obj.hasOwnProperty(property)) {
                    parsedRow += this.createField(obj[property]);
                }
            }
            table += this.createRow(parsedRow);
        }
        return encodeURIComponent(table);
    }
    static createLabels(data) {
        let labels = Is.json(data[0]) || data[0];
        let parsedRow = '';
        for (const label in labels) {
            if (labels.hasOwnProperty(label)) {
                parsedRow += this.createField(label);
            }
        }
        return this.createRow(parsedRow);
    }
    static createCustomLabels(customLabels) {
        let parsedRow = '';
        for (const label of customLabels) {
            parsedRow += this.createField(label);
        }
        return this.createRow(parsedRow);
    }
    static createRow(row) {
        console.log(row.slice(0, -1) + this.options.CRLF);
        return row.slice(0, -1) + this.options.CRLF;
    }
    static createField(content) {
        return this.options.quote + content + this.options.quote + this.options.separator;
    }
}
Export.log = Logger.addGroup('CSVx Exporter');
// default option values
Export.options = {
    data: 'text/csv',
    charset: 'utf-8',
    labels: true,
    quote: '"',
    separator: ',',
    CRLF: '\r\n',
    customLabels: []
};

class Convert {
    static setOptions(options) {
        this.setObject('options', options);
    }
    static setCSS(css) {
        this.setObject('css', css);
    }
    static array(data, options, css) {
        if (options) {
            this.setOptions(options);
        }
        if (css) {
            this.setCSS(css);
        }
        let rows = data.trim().split(this.options.CRLF).filter(Boolean);
        if (!rows.length) {
            this.log.warn(this.options.CRLF + ' CRLF not found');
            return false;
        }
        let array = [];
        for (let row of rows) {
            let cells = row.split(this.options.separator);
            if (this.options.quote) {
                for (let i = 0; i < cells.length; i++) {
                    cells[i] = cells[i].slice(1, -1);
                }
            }
            array.push(cells);
        }
        return array;
    }
    static table(data, options, css) {
        let array = this.array(data, options, css);
        if (array) {
            let thead = '';
            let table = [];
            for (let i = 0; i < array.length; i++) {
                let cellType = 'td';
                let style = '';
                if (!i && this.options.labels) {
                    cellType = 'th';
                    if (this.css.th) {
                        style = ' class = "' + this.css.th + '"';
                    }
                    thead = '<thead>' + this.createTr(array[i], cellType, style) + '</thead>';
                }
                else {
                    table.push(this.createTr(array[i], cellType, ''));
                }
            }
            if (thead || table.length) {
                let style = this.css.table ? 'class="' + this.css.table + '"' : '';
                return '<table ' + style + '>' + thead + '<tbody>' + table.join('') + '</tbody></table>';
            }
        }
        return false;
    }
    static createTr(row, cellType, style) {
        return '<tr><' + cellType + style + '>' + row.join('</' + cellType + '><' + cellType + style + '>') + '</' + cellType + '></tr>';
    }
    static setObject(parameterName, newObject) {
        for (const property in newObject) {
            if (newObject.hasOwnProperty(property) && this[parameterName].hasOwnProperty(property)) {
                this[parameterName][property] = newObject[property];
            }
        }
    }
}
Convert.log = Logger.addGroup('CSVx Converter');
// static html: string = null;
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

export { Export, Convert };
