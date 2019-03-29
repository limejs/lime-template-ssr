import { parseUrl } from '@libs/url'

export const isServerRender = process.env['VUE_ENV'] === 'server';
export const isDevMode = process.env['NODE_ENV'] === 'development';
export const isClientMode = process.env['VUE_ENV'] === 'client';
export let currentDocument = {};
export let currentWindow = {};

let env = {}

if (isServerRender) {
  Object.defineProperty(currentDocument, 'cookie', {
    get() {
      let currentContext = process.domain.__VUE_SSR_CONTEXT__
      // 获取当前上下文对应的对象
      if (currentContext && currentContext.request.headers.cookie) {
        return currentContext.request.headers.cookie
      } else {
        return '';
      }
    }
  })

  Object.defineProperty(currentWindow, 'location', {
    get() {
      let currentContext = process.domain.__VUE_SSR_CONTEXT__
      // 获取当前上下文对应的对象
      if (currentContext && currentContext.request) {
        let req = currentContext.request
        return parseUrl(req.protocol + '://' + req.hostname + req.url || '');
      } else {
        return {}
      }
    }
  })
} else {
  currentWindow = window;
  currentDocument = document;
}


Object.defineProperty(env, '__VUE_SSR_CONTEXT__', {
  get() {
    return process.domain.__VUE_SSR_CONTEXT__
  }
})

export default env;
