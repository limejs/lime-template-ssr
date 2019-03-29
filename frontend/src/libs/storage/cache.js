
import {isServerRender} from './env'

var _private = {};
_private.sn = 'comicCenter_';

_private.getName = function (name, type) {
	return _private.sn + '/' + name.replace(/\//g, '//') + (type ? '/' + type.replace(/\//g, '//') : '');
};

_private.getLocalStorage = function (name) {
	try {
		var value = window.localStorage.getItem(_private.getName(name));
		var info = JSON.parse(window.localStorage.getItem(_private.getName(name, 'info')));
		//store.log('store.cacheData getLocalStorage: value[' + value + '] name[' + name + '] time[' + (info && info.time) + '] count[' + (info && info.count) + ']');
		window.localStorage.setItem(_private.getName(name, 'info'), JSON.stringify({
			time: ( info && parseInt(info.time)) || new Date().getTime(),
			count: ((info && parseInt(info.count)) || 0) + 1
		}));
		return JSON.parse(value);
	} catch (e) {
		return null;
	}
};

_private.setLocalStorage = function (name, value) {
	var json = JSON.stringify(value);
	//store.log('store.cacheData setLocalStorage: value[' + json + '] name[' + name + ']');
	try {
		window.localStorage.setItem(_private.getName(name), json);
		window.localStorage.setItem(_private.getName(name, 'info'), JSON.stringify({
			time: new Date().getTime(),
			count: 0
		}));
	} catch (e) {
		try {
			localStorage.clear();
			window.localStorage.setItem(_private.getName(name), json);
			window.localStorage.setItem(_private.getName(name, 'info'), JSON.stringify({
				time: new Date().getTime(),
				count: 0
			}));
			return true;
		} catch (e) {
			return false;
		}
	}
	return true;
};

_private.getLocalStorageTime = function (name) {
	try {
		var info = JSON.parse(window.localStorage.getItem(_private.getName(name, 'info')));
		return (info && parseInt(info.time)) || 0;
	} catch (e) {
		return 0;
	}
};

_private.getLocalStorageCount = function (name) {
	try {
		var info = JSON.parse(window.localStorage.getItem(_private.getName(name, 'info')));
		return (info && parseInt(info.count)) || 0;
	} catch (e) {
		return 0;
	}
};

_private.setLocalStorageInfo = function (name, time, count) {
	if (_private.getLocalStorageTime.call(this, name) === 0) {
		return false;
	}
	try {
		window.localStorage.setItem(_private.getName(name, 'info'), JSON.stringify({
			time: new Date(time).getTime() || 0,
			count: parseInt(count) || 0
		}));
	} catch (e) {
		return false;
	}
	return true;
};

_private.getSessionStorage = function (name) {
	try {
		var value = window.sessionStorage.getItem(_private.getName(name));
		var info = JSON.parse(window.sessionStorage.getItem(_private.getName(name, 'info')));
		//store.log('store.cacheData getSessionStorage: value[' + value + '] name[' + name + '] time[' + (info && info.time) + '] count[' + (info && info.count) + ']');
		window.sessionStorage.setItem(_private.getName(name, 'info'), JSON.stringify({
			time: ( info && parseInt(info.time)) || new Date().getTime(),
			count: ((info && parseInt(info.count)) || 0) + 1
		}));
		return JSON.parse(value);
	} catch (e) {
		return null;
	}
};

_private.setSessionStorage = function (name, value) {
	var json = JSON.stringify(value);
	//store.log('store.cacheData setSessionStorage: value[' + json + '] name[' + name + ']');
	try {
		window.sessionStorage.setItem(_private.getName(name), json);
		window.sessionStorage.setItem(_private.getName(name, 'info'), JSON.stringify({
			time: new Date().getTime(),
			count: 0
		}));
	} catch (e) {
		return false;
	}
	return true;
};

_private.getSessionStorageTime = function (name) {
	try {
		var info = JSON.parse(window.sessionStorage.getItem(_private.getName(name, 'info')));
		return (info && parseInt(info.time)) || 0;
	} catch (e) {
		return 0;
	}
};

_private.getSessionStorageCount = function (name) {
	try {
		var info = JSON.parse(window.sessionStorage.getItem(_private.getName(name, 'info')));
		return (info && parseInt(info.count)) || 0;
	} catch (e) {
		return 0;
	}
};

_private.setSessionStorageInfo = function (name, time, count) {
	if (_private.getSessionStorageTime.call(this, name) === 0) {
		return false;
	}
	try {
		window.sessionStorage.setItem(_private.getName(name, 'info'), JSON.stringify({
			time: new Date(time).getTime() || 0,
			count: parseInt(count) || 0
		}));
	} catch (e) {
		return false;
	}
	return true;
};

_private.memoryCache = {};

_private.getMemory = function (name) {
	var data = _private.memoryCache[_private.getName(name)];
	var value = data && data.value;
	// var time = data && data.time;
	// var count = data && data.count;
	//store.log('store.cacheData getMemory: value[' + value + '] name[' + name + '] time[' + time + '] count[' + count + ']');
	if (typeof(data) === 'undefined') {
		return null;
	} else {
		if (data !== null) {
			data.count = (parseInt(data.count) || 0) + 1;
		}
		return value;
	}
};

_private.setMemory = function (name, value) {
	//store.log('store.cacheData setMemory: value[' + JSON.stringify(value) + '] name[' + name + ']');
	_private.memoryCache[_private.getName(name)] = {
		value: value,
		time: new Date().getTime(),
		count: 0
	};
	return true;
};

_private.getMemoryTime = function (name) {
	var data = _private.memoryCache[_private.getName(name)];
	return (data && parseInt(data.time)) || 0;
};

_private.getMemoryCount = function (name) {
	var data = _private.memoryCache[_private.getName(name)];
	return (data && parseInt(data.count)) || 0;
};

_private.setMemoryInfo = function (name, time, count) {
	if (!_private.memoryCache[_private.getName(name)]) {
		return false;
	}
	_private.memoryCache[_private.getName(name)].time = new Date(time).getTime() || 0;
	_private.memoryCache[_private.getName(name)].count = parseInt(count) || 0;
	return true;
};

export function getCacheMode(mode) {
	switch (mode === false ? 'memory' : mode) {
		case 'memory':
			return 'memory';
		case 'sessionStorage':
			if (window.sessionStorage) {
				return 'sessionStorage';
			} else {
				return 'memory';
			}
		default:
			if (window.localStorage) {
				return 'localStorage';
			} else {
				return 'memory';
			}
	}
}

export function getCache(name, mode) {
	if (isServerRender) {
		return '';
	}
	switch (getCacheMode(mode)) {
		case 'localStorage':
			return _private.getLocalStorage.call(this, name);
		case 'sessionStorage':
			return _private.getSessionStorage.call(this, name);
		case 'memory':
			return _private.getMemory.call(this, name);
	}
}

export function setCache(name, value, mode) {
	if (isServerRender) {
		return '';
	}
	switch (getCacheMode(mode)) {
		case 'localStorage':
			return _private.setLocalStorage.call(this, name, value);
		case 'sessionStorage':
			return _private.setSessionStorage.call(this, name, value);
		case 'memory':
			return _private.setMemory.call(this, name, value);
	}
}

export function isExpire(name, maxSecond, maxCount, mode) {
	if (isServerRender) {
		return true;
	}

	var time = 0;
	var count = 0;
	switch (getCacheMode(mode)) {
		case 'localStorage':
			time = _private.getLocalStorageTime.call(this, name);
			count = _private.getLocalStorageCount.call(this, name);
			break;
		case 'sessionStorage':
			time = _private.getSessionStorageTime.call(this, name);
			count = _private.getSessionStorageCount.call(this, name);
			break;
		case 'memory':
			time = _private.getMemoryTime.call(this, name);
			count = _private.getMemoryCount.call(this, name);
			break;
	}
	if (time === 0) {
		return true;
	}
	if (Math.abs(new Date().getTime() - time) > maxSecond * 1000) {
		//store.log('store.dataCache isExpire: true name[' + name + '] maxSecond[' + maxSecond + '] time[' + time + '] now[' + new Date().getTime() + ']');
		return true;
	}
	if (count > maxCount) {
		//store.log('store.dataCache isExpire: true name[' + name + '] maxCount[' + maxCount + '] count[' + count + ']');
		return true
	}
	//store.log('store.dataCache isExpire: false name[' + name + '] maxSecond[' + maxSecond + '] maxCount[' + maxCount + '] time[' + time + '] now[' + new Date().getTime() + '] count[' + count + ']');
	return false;
}

export function setInfo(name, time, count, mode) {
	switch (getCacheMode(mode)) {
		case 'localStorage':
			return _private.setLocalStorageInfo.call(this, name, time, count);
		case 'sessionStorage':
			return _private.setSessionStorageInfo.call(this, name, time, count);
		case 'memory':
			return _private.setMemoryInfo.call(this, name, time, count);
	}
}

export const getCacheName = _private.getName;

export default {
	get: getCache,
	set: setCache,
	getName: _private.getName,
	getMode: getCacheMode,
	isExpire: isExpire,
	setInfo: setInfo
}

