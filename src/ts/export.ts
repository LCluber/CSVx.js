import { Options }  from './interfaces';
import { Dom } from '@lcluber/weejs';
import { Is } from '@lcluber/chjs';
import { Logger } from '@lcluber/mouettejs';

export class Export {

  // default option values
  static options: Options = {
    data: 'text/csv',
    charset: 'utf-8',
    labels: true,
    quote: '"',
    separator: ',',
    CRLF : '\r\n',
    customLabels: []
  }

  public static data( filename: string,
                      data: Array<Object>|Array<string>,
                      options?: Options): boolean {

    if (!Is.object(data[0]) && !Is.json(data[0])) {
      return false;
    }
    if (!filename.trim().length) {
      filename = 'export';
    }
    if (options) {
      this.setOptions(options);
    }
    let table: string = 'data:' + this.options.data + ';charset=' + this.options.charset + ',';
    if(this.options.labels) {
      if (this.options.customLabels.length > 0) {
        table += this.createCustomLabels(this.options.customLabels);
      } else {
        table += this.createLabels(data);
      }
      Logger.info('[CSVx] ' + filename + ' labels ready');
    }
    table += this.createTable(data);
    Logger.info('[CSVx] ' + filename + ' table ready');
    this.download(table, filename);
    return true;
  }

  public static setOptions(options: Options): void {
    for(const property in options){
      if (options.hasOwnProperty(property) && this.options.hasOwnProperty(property)) {
        this.options[property] = options[property];
      }
    }
  }

  private static download(table:string, filename: string): void {
    let encodedUri = encodeURI(table);
    let link = Dom.addHTMLElement(document.body, 'a', {href:encodedUri,download:filename+'.csv'})

    link.click();
    document.body.removeChild(link);
    Logger.info('[CSVx] ' + filename + ' downloading');
  }

  private static createTable( data: Array<Object>|Array<string> ): string {
    let table: string = '';
    for (const row of data) {
      let obj:Object = Is.json(row)||row;
      if (!Is.object(obj)){
        return table;
      }
      let parsedRow: string = '';
      for(const property in obj) {
        if (obj.hasOwnProperty(property)) {
          parsedRow += this.createField(obj[property]);
        }
      }
      table += this.createRow(parsedRow);
    }
    return table;
  }

  private static createLabels( data: Array<Object>|Array<string> ): string {
    let labels:Object = Is.json(data[0])||data[0];
    let parsedRow: string = '';
    for(const label in labels) {
      if (labels.hasOwnProperty(label)) {
        parsedRow += this.createField(label);
      }
    }
    return this.createRow(parsedRow);
  }

  private static createCustomLabels(customLabels: Array<string>): string {
    let parsedRow: string = '';
    for(const label of customLabels) {
      parsedRow += this.createField(label);
    }
    return this.createRow(parsedRow);
  }

  private static createRow(row: string): string {
    return row.slice(0, -1) + this.options.CRLF;
  }

  private static createField(content:string): string {
    return this.options.quote + content + this.options.quote + this.options.separator;
  }

}
