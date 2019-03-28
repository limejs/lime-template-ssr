/**
 * 深度copy
 * Created by Dreamzhu on 2017/3/20.
 * https://github.com/sindresorhus/deep-assign
 */
import {isPlainObject, isArray} from './type-check'

function extend(target, source, deep) {
	for(let key in source){
		if (source.hasOwnProperty(key) && deep && (isPlainObject(source[key]) || isArray(source[key]))) {
			if (isPlainObject(source[key]) && !isPlainObject(target[key]))
				target[key] = {};
			if (isArray(source[key]) && !isArray(target[key]))
				target[key] = [];
			extend(target[key], source[key], deep)
		} else if (source[key] !== undefined) {
			target[key] = source[key]
		}
	}
}

export default function (target) {
	var deep = true, args = [].slice.call(arguments, 1);
	args.forEach(function(arg){ extend(target, arg, deep) });
	return target
};
