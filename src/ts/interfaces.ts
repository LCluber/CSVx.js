
export interface Options {
  data: string;
  charset: string;
  labels: boolean;
  quote: string;
  separator: string;
  CRLF: string;
  customLabels: string[];
  [key: string]: string[]|String|boolean;
}

export interface CSS {
  table: string;
  th: string;
  [key: string]: String;
}
