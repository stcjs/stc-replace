import Plugin from 'stc-plugin';
import {extend} from 'stc-helper';
//import {isMaster} from 'cluster';

export default class ReplaceJSPlugin extends Plugin {
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
    if( !Array.isArray(opts) ) {
      for(let key in opts) {
        options.push([key, opts[key]]);
      }
    } else if( !Array.isArray(opts[0]) ) {
      options.push( opts.slice(0,2) );
    } else {
      options = opts.filter( opt => Array.isArray(opt) && opt.length == 2 );
    }
    return options;
  }

  /**
   * run
   */
  async run() {
    let options = this.parseConfig(this.options);
    let content = await this.getContent('utf-8');
    for(let [grep, replace] of options) {
      content = content.replace(grep, replace);
    }
    console.log(content);
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
