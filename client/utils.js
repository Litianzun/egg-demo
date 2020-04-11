/**
 * 一些公用方法
 */

//1.通信方法request
export async function request(url, method, params, token = null, ...rests) {
  try {
    const baseUrl = 'http://localhost:7001/';
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if(token){
      headers['Authorization'] = 'Bearer' + ' ' + token
    }
    const response = await fetch(baseUrl + url, {
      method: method,
      headers,
      body: method === 'GET' ? null : JSON.stringify(params),
      ...rests,
    });
    const json = await response.json();
    return json;
  } catch (msg) {
    console.log('请求错误' + msg);
  }
}
