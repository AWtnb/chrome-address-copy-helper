'use strict';

const toHalfWidth = (s: string): string => {
  return s.replace(/[\uff21-\uff3a\uff41-\uff5a\uff10-\uff19]/g, function (m) {
    return String.fromCharCode(m.charCodeAt(0) - 0xfee0);
  });
};

const POSSIBLE_BARS = [
  '\u2010',
  '\u2011',
  '\u2012',
  '\u2013',
  '\u2014',
  '\u2015',
  '\uFF0D',
  '\u2500',
  '\u2212',
  '\u002d',
];

class Postalcode {
  private readonly prefix: string;
  private readonly bar: string;
  private readonly suffix: string;
  constructor(s: string) {
    this.prefix = s.substring(0, 3);
    this.bar = s.substring(3, 4);
    this.suffix = s.substring(4);
  }
  format(): string {
    if (!this.prefix.match(/\d{3}/)) {
      return '';
    }
    if (!this.suffix.match(/\d{4}/)) {
      return '';
    }
    if (!POSSIBLE_BARS.includes(this.bar)) {
      return '';
    }
    return `${this.prefix}-${this.suffix}`;
  }
}

export class JpAddress {
  private readonly line: string;
  private readonly postalcode: Postalcode;
  constructor(s: string) {
    this.line = toHalfWidth(s)
      .trim()
      .replace(/^\u3012/, '')
      .trim()
      .replace(/(\r?\n)+/g, ' ');
    this.postalcode = new Postalcode(this.line.substring(0, 8));
  }
  getPostalcode(): string {
    return this.postalcode.format();
  }
  trimPostalcode(): string {
    if (this.getPostalcode().length < 1) {
      return '';
    }
    const rest = this.line.substring(8).trim();
    return rest.replace(/\d[^\d]/g, (m:string) => {
      if (POSSIBLE_BARS.includes(m.charAt(1))) {
        return m.charAt(0) + "-";
      }
      return m;
    })
  }
}
