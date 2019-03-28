/*
 * @file i am a file description
 * @author: lao niubi
 * @date: 2018-12-27
 */

import {serverWindows} from '../util/env'
import {
	detectIE
} from './detect-browser'


export function offset(el) {
	if (el && el.length) {
		el = el[0];
	}
	if (el && el.getBoundingClientRect) {
		let obj = el.getBoundingClientRect();
		return {
			left: obj.left + serverWindows.pageXOffset,
			top: obj.top + serverWindows.pageYOffset,
			width: Math.round(obj.width),
			height: Math.round(obj.height)
		}
	} else {
		return {
			left: 0,
			top: 0,
			width: 0,
			height: 0
		}
	}
}


export function isVisible(el, postion) {
	let elOffset = offset(el);
	postion = postion || {};
	let section = {
		left: postion.left || 0,
		right: postion.right || serverWindows.innerWidth,
		top: postion.top || scrollTop(document.body),
		bottom: postion.bottom || scrollTop(document.body) + serverWindows.innerHeight
	};

	if(elOffset.left >= section.left && elOffset.left < section.right && elOffset.top >= section.top && elOffset.top < section.bottom) {
		return true;
	} else {
		return false;
	}

}

export function bindScrollEnd(callback) {
	let cache = bindScrollEnd;
	if (!serverWindows.addEventListener) {
		return
	}
	serverWindows.addEventListener('scroll', function() {
		const _scrollTop = scrollTop(document.body) + serverWindows.pageYOffset;

		if (cache.timer) {
			clearTimeout(cache.timer);
		}

		if (cache.scrollTop !== _scrollTop) {
			cache.scrollTop = _scrollTop;
			cache.timer = setTimeout(function(){
				callback()
			}, 0);
		} else {
			callback()
		}
	});
}

/**
 * 获取相对于body的相对偏移
 * @param {HTMLElement|Window} Node DOM元素
 * @param {number} [value] scrollTop值
 * @return {number|HTMLElement|Window}
 */
export function scrollTop(Node, value) {
	const doc = document, body = doc.body, win = window, docEl = doc.documentElement;

	if (value === undefined) {
		if (Node === body || Node === win || Node === docEl) {
			return doc.documentElement.scrollTop + body.scrollTop;
		}
		const hasScrollTop = 'scrollTop' in Node;

		return hasScrollTop ? Node['scrollTop'] : Node['pageYOffset'];
	}

	let scrollElement;
	if (Node === body || Node === win || Node === docEl) {
		doc.documentElement.scrollTop = value;
		body.scrollTop = value;
		return Node;
	} else if (Node === body || Node === win) {
		scrollElement = body;
	} else {
		scrollElement = Node;
	}

	scrollElement['scrollTop'] = value;
	return Node;
}

/**
 *
 * @param {HTMLElement|Window} el
 * @param {string} className
 * @return {boolean}
 */
export function hasClass(el, className) {
	return el.className && new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);
}

