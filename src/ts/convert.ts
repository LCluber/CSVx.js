import { Options, CSS }  from './interfaces';
// import { Logger } from '@lcluber/mouettejs';

export type CellTypes = 'td'|'th';

export class Convert {

  // static log = Logger.addGroup('CSVx Converter');
  // static html: string = null;
  // default option values
  static options: Partial<Options> = {
    // data: 'text/csv',
    // charset: 'utf-8',
    labels: true,
    quote: '"',
    separator: ',',
    CRLF : '\r\n'
  }

  static css: CSS = {
    table: '',
    th: ''
  }

  public static setOptions(options: Partial<Options>): void {
    this.setObject('options', options);
  }

  public static setCSS(css: Partial<CSS>): void {
    this.setObject('css', css);
  }

  public static array( data: string, options?: Partial<Options>, css?: Partial<CSS>): Array<Array<string>>|false  {
    if (options) {
      this.setOptions(options);
    }

    if (css) {
      this.setCSS(css);
    }

    let rows:Array<string> = data.trim().split(<string>this.options.CRLF).filter(Boolean);
    if (!rows.length) {
      // this.log.warn(this.options.CRLF + ' CRLF not found');
      return false;
    }

    let array:Array<Array<string>> = [];

    for (let row of rows) {
      let cells:Array<string> = row.split(<string>this.options.separator);
      if (this.options.quote) {
        for (let i = 0 ; i < cells.length ; i++ ) {
          cells[i] = cells[i].slice(1,-1);
        }
      }
      array.push(cells);
    }
    return array;
  }

  public static table( data: string, options?: Options, css?: CSS): string|false {

    let array = this.array( data, options, css);
    if (array) {
      let thead:string = '';
      let table: Array<string> = [];
      for(let i = 0 ; i < array.length ; i++) {
        let cellType: CellTypes = 'td';
        let style = '';
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

      if(thead || table.length) {
        let style = this.css.table ? 'class="'+ this.css.table + '"' : '';
        return '<table ' + style +'>' + thead + '<tbody>' + table.join('') + '</tbody></table>';
      }
    }
    return false;
  }

  private static createTr(row: Array<string>, cellType: CellTypes, style: string): string {
    return '<tr><' + cellType + style + '>' + row.join('</' + cellType + '><' + cellType + style + '>') + '</' + cellType + '></tr>';
  }

  private static setObject(parameterName: 'options'|'css', newObject: Partial<Options|CSS>): void {
    for (const property in newObject) {
      if (newObject.hasOwnProperty(property) && this[parameterName].hasOwnProperty(property)) {
        this[parameterName][property] = newObject[property];
      }
    }
  }

}
