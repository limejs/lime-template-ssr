export default function getUA() {
	let userAgent = '';
	if (typeof weex === 'object' && weex.config) {
		userAgent = weex.config.userAgent || (weex.config.env && weex.config.env.userAgent) || '';
	} else if (typeof window === 'object' && window.navigator) {
		userAgent = window.navigator.userAgent || '';
	} else if (isServerRender) {
		userAgent = __VUE_SSR_CONTEXT__.request.headers['user-agent'] || '';
	}
	return String(userAgent).toLowerCase();
}
