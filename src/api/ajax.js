/*
ajax请求函数模块
返回值：promise对象（异步返回的数据是：response.data）
*/
import axios from 'axios'
export default function ajax (url, data = {}, type = 'GET') {
    return new Promise(function (resolve, reject) {
        /*
        方法二：
        手动封装 Promise，可以自定义 resolve 和 reject 的行为。
        可以 对 axios 返回的数据进行额外处理（如只返回 response.data，而不是整个 response）。
        如果后续需要 增加额外逻辑（如缓存、日志等），可以在 new Promise 内部处理。
         */
        // 执行异步ajax请求
        let promise
        if (type === 'GET') {
            // 准备url query参数数据
            let dataStr = '' // 数据拼接字符串
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr !== '') {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
            // 发送get请求
            promise = axios.get(url) // 返回的是response
        } else {
            // 发送post请求
            promise = axios.post(url, data)
        }
        promise.then(function (response) {
            // 成功了调用 resolve()
            resolve(response.data)
        }).catch(function (error) {
            // 失败了调用 reject()
            reject(error)
        })
    })
}
/*
方法一：
const response = await ajax()
const result = response.data

方法二：加return new Promise(function (resolve, reject) {}；resolve；reject
const resule = await ajax()
 */
