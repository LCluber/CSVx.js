import { Options, Data } from './interfaces';
import { Dom } from '@lcluber/weejs';
import { isObject } from '@lcluber/chjs';
// import { Logger }   from '@lcluber/mouettejs';

export class Export {

  // static log = Logger.addGroup('CSVx Exporter');
  // default option values
  static options: Options = {
    data: 'text/csv',
    charset: 'utf-8',
    labels: true,
    quote: '"',
    separator: ',',
    CRLF : '\r\n',
    customLabels: null
  }

  public static data( filename: string,
                      data: Data[],
                      options?: Partial<Options>
                    ): boolean {
    
    // check data consistency
    for (let row of data) {                    
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
    let table: string = 'data:' + this.options.data + ';charset=' + this.options.charset + ',\uFEFF';
    let labels: string[] = [];
    if (!this.options.customLabels) {
      labels = this.createLabels(data);
    } else {
      labels = this.createCustomLabels(this.options.customLabels);
    }
    if(this.options.labels) {
      table += this.createLabelsRow(labels);
      // this.log.info(filename + ' labels ready');
    }
    table += this.createTable(data);
    // console.log('table', table);
    // this.log.info(filename + ' table ready');
    this.download(table, filename);
    return true;
  }

  public static setOptions(options: Partial<Options>): void {
    for(const property in options) {
      if (options.hasOwnProperty(property) && this.options.hasOwnProperty(property)) {
        this.options[property] = options[property]||this.options[property];
      }
    }
  }

  private static download(table:string, filename: string): void {
    //let encodedUri = encodeURI(table);
    if(window.navigator.msSaveOrOpenBlob) {
      // IE11
      window.navigator.msSaveOrOpenBlob(table, filename);
    } else {
      let link = Dom.addHTMLElement(document.body, 'a', {href:table,download:filename+'.csv'})
      link.click();
      document.body.removeChild(link);
      // this.log.info(filename + ' downloading');
    }
  }

  private static createTable( data: Data[] ): string {
    let table: string = '';
    for (let row of data) {
      let parsedRow: string = '';
      for (let property in this.options.customLabels) {
        parsedRow += this.createField(row[property] || '');
      }
      table += this.createRow(parsedRow);
    }
    return table;
  }

  private static createLabels (data: Data[]): string[] {
    let params: string[] = [];
    for (let row of data) {
      let i = 0;
      for (let property in row) {
        if (row.hasOwnProperty(property)) {
          const newProperty = params.find(value => value === property);
          if (!newProperty) {
            params.splice(i, 0, property);
          }
          i++;
        }
      }
    }
    this.options.customLabels = {};
    for (let param of params) {
      this.options.customLabels[param] = param;
    }
    return params;
  }

  private static createCustomLabels (customLabels: { [key: string]: string }): string[] {
    let params: string[] = [];
    for (let property in customLabels) {
      if (customLabels.hasOwnProperty(property)) {
        params.push(customLabels[property]);
      }
    }
    return params;
  }

  private static createLabelsRow(labels: string[]): string {
    let parsedRow: string = '';
    for(let label of labels) {
      parsedRow += this.createField(label);
    }
    return this.createRow(parsedRow);
  }

  private static createRow(row: string): string {
    // console.log(row.slice(0, -1) + this.options.CRLF);
    return row.slice(0, -1) + this.options.CRLF;
  }

  private static createField(content:string|number): string {
    return this.options.quote + content + this.options.quote + this.options.separator;
  }

}
