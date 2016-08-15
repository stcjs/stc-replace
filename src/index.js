import Plugin from 'stc-plugin';
import {extend, isString, isArray} from 'stc-helper';
//import {isMaster} from 'cluster';

let options;

export default class ReplacePlugin extends Plugin {
  /**
   * parseConfig
   * {[string]: [replaceString]}
   * or
   * [grep, replaceString]
   * or
   * [[grep, replaceString]]
   */
  parseConfig(opts) {
    let options = [];
    if( !isArray(opts) ) {
      for(let key in opts) {
        options.push([key, opts[key]]);
      }
    } else if( !isArray(opts[0]) ) {
      options.push( opts.slice(0,2) );
    } else {
      options = opts.filter( opt => isArray(opt) && opt.length == 2 );
    }
    return options;
  }

  /**
   * run
   */
  async run() {
    if( !options ) {
      options = this.parseConfig(this.options);
    }

    let content = await this.getContent('utf-8');
    for(let [grep, replace] of options) {
      while(true) {
        let rcontent = content.replace(grep, replace);
        if(rcontent === content ) break;
        content = rcontent;
      }
    }
    return {content};
  }
  /**
   * update
   */
  update(data) {
    this.setContent(data.content);
  }

  /**
   * use cluster
   */
  static cluster(){
    return false;
  }
  /**
   * use cache
   */
  static cache(){
    return false;
  }
}
