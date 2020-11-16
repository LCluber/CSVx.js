## Synopsis

[CSVx.js](http://csvxjs.lcluber.com) is an open source CSV library written in TypeScript.

## Motivation

The main purpose of this library is to provide an easy way to export your data as CSV or transform your CSV data to something else.

## Installation

### npm

```bash
$ npm i @lcluber/csvxjs
```

### yarn

```bash
$ yarn add @lcluber/csvxjs
```

## Usage

### ES6

```html
<button id="csv">Export CSV</button>
<div id="table"></div>
```

```javascript
import { Export, Convert } from '@lcluber/csvxjs';

// Convert an array to CSV file
let array = [
  {
    firstname:'Galileo',
    lastname:'Galiléi',
    born:1564,
    died:1642
  },
  {
    firstname:'Nikola',
    lastname:'Tesla',
    city:'Smiljan',
    born:1856,
    died:1943
  },
  {
    firstname:'Albert',
    born:1879,
    lastname:'Einstein',
    died:1955
  }
];
let customLabels = {
  firstname: 'First name',
  lastname: 'Last name', 
  city: 'City',
  born: 'Born',
  died: 'Died'
};
let exportButton = document.getElementById('csv');
exportButton.addEventListener('click', function() {
  Export.data('scientists',array,{separator: ';', customLabels: customLabels});// ; separator for excel friendly imports
});

// Convert CSV data to HTML table
let data = '"Firstname";"Lastname";"Born";"Died"\r\n\
"Galileo";"Galilei";"1564";"1642"\r\n\
"Nikola";"Tesla";"1856";"1943"\r\n\
"Albert";"Einstein";"1879";"1955"';

document.getElementById("table").innerHTML = Convert.table(data,{separator: ';'}, {table: 'table table-striped'});
```

### IIFE

```html
<script src="node-modules/@lcluber/csvxjs/dist/csvx.iife.min.js"></script>
<button id="csv">Export CSV</button>
<div id="table"></div>
```

```javascript

// Convert an array to CSV file
var array = [
 {
    firstname:'Galileo',
    lastname:'Galiléi',
    born:1564,
    died:1642
  },
  {
    firstname:'Nikola',
    lastname:'Tesla',
    city:'Smiljan',
    born:1856,
    died:1943
  },
  {
    firstname:'Albert',
    born:1879,
    lastname:'Einstein',
    died:1955
  }
];
var customLabels = {
  firstname: 'First name',
  lastname: 'Last name', 
  city: 'City',
  born: 'Born',
  died: 'Died'
};
var exportButton = document.getElementById('csv');
exportButton.addEventListener('click', function() {
  CSVx.Export.data('scientists',array,{separator: ';', customLabels: customLabels});// ; separator for excel friendly imports
});

// Convert CSV data to HTML table
var data = '"Firstname";"Lastname";"Born";"Died"\r\n\
"Galileo";"Galilei";"1564";"1642"\r\n\
"Nikola";"Tesla";"1856";"1943"\r\n\
"Albert";"Einstein";"1879";"1955"';

document.getElementById("table").innerHTML = CSVx.Convert.table(data,{separator: ';'}, {table: 'table table-striped'});
```

### Options

```javascript
interface Data { [key: string]: number|string }[]

interface Options {
  data?: string; // default : 'text/csv'
  charset?: string; // default : 'utf-8'
  labels?: boolean; // default : true
  quote?: string; // default : '"'
  separator?: string; // default : ','
  CRLF?: string; // default : '\r\n'
  customLabels: { [key: string]: string }; // default : {}
}

interface CSS {
  table?: string; // default : ''
  th?: string; // default : ''
}
```

## Contributors

CSVx.js is still in early development and I would be glad to get all the help you can provide for this project.
To contribute you can clone the project on **[GitHub](https://github.com/LCluber/CSVx.js)** and See **NOTICE.md** for detailed installation walkthrough.

## License

MIT License

Copyright (c) 2018 Ludovic CLUBER

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
