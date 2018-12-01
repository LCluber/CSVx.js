import { Options }  from './options';
import { Check, Dom } from '@lcluber/weejs';

export class Export {

  // default option values
  static options: Options = {
    data: 'text/csv',
    charset: 'utf-8',
    labels: true,
    quote: '"',
    separator: ',',
    CRLF : '\r\n'
  }
  
  public static fromObject( filename: string, 
                            data: Array<Object>|Array<string>,
                            options?: Options): boolean {
    
    if (!Check.isObject(data[0]) && !Check.isJSON(data[0])) {
      return false;
    }
    if (options) {
      this.setOptions(options);
    }
    let table: string = 'data:' + this.options.data + ';charset=' + this.options.charset + ',';
    if(this.options.labels) {
      table += this.createLabels(data);
    }
    table += this.createTable(data);
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
  }
  
  private static createTable( data: Array<Object>|Array<string> ): string {
    let table: string = '';
    for (const row of data) {
      let obj:Object = Check.isJSON(row)||row;
      if (!Check.isObject(obj)){
        return table;
      }
      let parsedRow: string = '';
      for(const property in obj) {
        if (obj.hasOwnProperty(property)) {
          parsedRow += this.createField(obj[property]);
        }
      }
      table += this.createRow(parsedRow);;
    }
    return table;
  }
  
  private static createLabels( data: Array<Object>|Array<string> ): string {
    let labels:Object = Check.isJSON(data[0])||data[0];
    let parsedRow: string = '';
    for(const label in labels) {
      if (labels.hasOwnProperty(label)) {
        parsedRow += this.createField(label);
      }
    }
    return this.createRow(parsedRow);
  }
  
  private static createRow(row: string): string {
    return row + this.options.CRLF
  }
  
  private static createField(content:string): string{
    return this.options.quote + content + this.options.quote + this.options.separator;
  }
  

}