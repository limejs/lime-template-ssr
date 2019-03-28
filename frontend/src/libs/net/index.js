/*
 * @file 网络相关操作
 * @author: yongjiancui(yongjiancui@tencent.com)
 * @date: 2019-01-17
 */


 /**
 * 请求载入并执行一个 JavaScript 文件
 *
 * @method getScript
 * @param {String} url js文件的url
 * @param {Object} scriptParam 要附加的属性
 * @return Promise
 */
export function getScript (url, scriptParam) {
	return new Promise(function (resolve, reject) {
		let _loadCount = 0;
		(function loadScript(){
			let script = document.createElement('script');
			script.async = 'async';
			script.src = url;
			script.onload = resolve;
			script.onerror = e =>{
				// 同域名连续2次加载失败的话才做失败处理
				if(++_loadCount >= 2) {
					reject(e);
				} else {
					if(scriptParam && scriptParam.crossOrigin){
						delete scriptParam.crossOrigin;
					}
					loadScript()
				}
			};
			if(scriptParam){
				Object.keys(scriptParam).forEach(attr => {
					script[attr] = scriptParam[attr]
				})
			}
			document.getElementsByTagName('head')[0].appendChild(script);
		})();
	})
}


export function jsonp(config) {
	if (config && config.plugins) {
		for (let name in config.plugins) {
			if (config.plugins.hasOwnProperty(name) && config.plugins[name]) {
				let plug = plugMap[name];
				plug && plug.request && plug.request(config);
			}
		}
	}
	return new Promise(function (resolve, reject) {
		jsonpRequest.default(config.url, {
			param: jsonToQueryString(config.params) + '&' + (config.callName || 'callback'),
			timeout: config.timeout || 60000,
		}, function (err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}
