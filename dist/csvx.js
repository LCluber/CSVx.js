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

import { Check, Dom } from '@lcluber/weejs';

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

const LEVELS = [
    { id: 1, name: 'info' },
    { id: 2, name: 'trace' },
    { id: 3, name: 'warn' },
    { id: 4, name: 'error' },
    { id: 99, name: 'off' }
];

class Message {
    constructor(levelName, content) {
        this.setLevel(levelName);
        this.content = content;
    }
    setLevel(name) {
        this.level = this.findLevel(name);
    }
    getLevelId() {
        return this.level.id;
    }
    display() {
        console[this.level.name](this.content);
    }
    findLevel(name) {
        for (let level of LEVELS) {
            if (level.name === name) {
                return level;
            }
        }
        return this.level ? this.level : LEVELS[0];
    }
}

class Logger {
    set level(name) {
        Logger._level = Logger.findLevel(name);
    }
    get level() {
        return Logger._level.name;
    }
    static info(text) {
        Logger.log('info', text);
    }
    static trace(text) {
        Logger.log('trace', text);
    }
    static time(text) {
        Logger.log('time', text);
    }
    static warn(text) {
        Logger.log('warn', text);
    }
    static error(text) {
        Logger.log('error', text);
    }
    static log(levelName, content) {
        Logger.addMessage(levelName, content);
        let message = this.messages[this.nbMessages - 1];
        if (this._level.id <= message.getLevelId()) {
            message.display();
        }
    }
    static addMessage(levelName, content) {
        this.messages.push(new Message(levelName, content));
        this.nbMessages++;
    }
    static findLevel(name) {
        for (let level of LEVELS) {
            if (level.name === name) {
                return level;
            }
        }
        return this._level ? this._level : LEVELS[0];
    }
}
Logger._level = Logger.findLevel(LEVELS[0].name);
Logger.messages = [];
Logger.nbMessages = 0;
Logger.target = Dom.findById('Mouette');

class Export {
    static data(filename, data, options) {
        if (!Check.isObject(data[0]) && !Check.isJSON(data[0])) {
            return false;
        }
        if (options) {
            this.setOptions(options);
        }
        let table = 'data:' + this.options.data + ';charset=' + this.options.charset + ',';
        if (this.options.labels) {
            table += this.createLabels(data);
            Logger.info('[CSVx] ' + filename + ' labels ready');
        }
        table += this.createTable(data);
        Logger.info('[CSVx] ' + filename + ' table ready');
        this.download(table, filename);
        return true;
    }
    static setOptions(options) {
        for (const property in options) {
            if (options.hasOwnProperty(property) && this.options.hasOwnProperty(property)) {
                this.options[property] = options[property];
            }
        }
    }
    static download(table, filename) {
        let encodedUri = encodeURI(table);
        let link = Dom.addHTMLElement(document.body, 'a', { href: encodedUri, download: filename + '.csv' });
        link.click();
        document.body.removeChild(link);
        Logger.info('[CSVx] ' + filename + ' downloading');
    }
    static createTable(data) {
        let table = '';
        for (const row of data) {
            let obj = Check.isJSON(row) || row;
            if (!Check.isObject(obj)) {
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
        return table;
    }
    static createLabels(data) {
        let labels = Check.isJSON(data[0]) || data[0];
        let parsedRow = '';
        for (const label in labels) {
            if (labels.hasOwnProperty(label)) {
                parsedRow += this.createField(label);
            }
        }
        return this.createRow(parsedRow);
    }
    static createRow(row) {
        return row + this.options.CRLF;
    }
    static createField(content) {
        return this.options.quote + content + this.options.quote + this.options.separator;
    }
}
Export.options = {
    data: 'text/csv',
    charset: 'utf-8',
    labels: true,
    quote: '"',
    separator: ',',
    CRLF: '\r\n'
};

export { Export };
