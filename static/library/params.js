/**
 * Created by Sam on 2018/10/29.
 */
export function getQueryString (name) {
  // 匹配目标参数
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')

  // 对querystring匹配目标参数
  let result = window.location.search.substr(1).match(reg)

  if (result !== null) {
    return decodeURIComponent(result[2])
  } else {
    return null
  }
}

export function getHashString (name) {
  // 匹配目标参数
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')

  // 对hash匹配目标参数
  let result = window.location.hash.replace(/^(.*)\?/, '').match(reg)

  if (result !== null) {
    return decodeURIComponent(result[2])
  } else {
    return null
  }
}

export let getTextsByParams = (languages = {}, lang = 'en') => {
  return languages[lang] || {}
}

export let getTextsFromParams = (languages = {}, param = 'lang', defaultLang = 'en') => {
  let lang = getLangFromParams(param, defaultLang)
  lang = lang in languages ? lang : defaultLang
  return getTextsByParams(languages, lang)
}

export let getLangFromParams = (param = 'lang', defaultLang = 'en') => {
  let lang = getParam(param)
  return lang || defaultLang
}

export let getParam = (param) => {
  return getQueryString(param)
}

export let getToken = (param = 'key') => {
  let token = getParam(param)
  if (token) {
    return token
  } else {
    return getHashString(param)
  }
}

export let reloadURL = () => {
  var href_no_query=location.href.split('?')[0],
    href_search=location.search+"&time="+Date.now();
  location.replace(href_no_query+href_search);
}

let S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)

export let getUUID = () => (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())

export default {
  getTextsByParams,
  getTextsFromParams,
  getUUID
}
