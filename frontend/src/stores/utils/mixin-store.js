export default function mixinStore(store) {
  store.registerAllModules = (component) => {
		registerAllModules(store, component);
		return store;
	};
	store.unregisterAllModules = (component) => {
		unregisterAllModules(store, component);
		return store;
	};
	store.registerModules = (components) => {
		registerModule(store, components);
	};
	store.unregisterModules = (components) => {
		unregisterModule(store, components);
	};
}

const isServerRender = process.env.VUE_ENV === 'server'
const storeRawData = {}
function registerModule(store, modules) {
	if (store && modules) {
		const moduleCount = store._modulesCount = store._modulesCount || {};
		Object.keys(modules).forEach((name) => {
			if(!storeRawData[name] && isServerRender){
				storeRawData[name] = JSON.parse(JSON.stringify(modules[name].state))
			}
			if (moduleCount[name] > 0) {
				moduleCount[name] ++;
			} else {
				if(isServerRender){
					modules[name].state = JSON.parse(JSON.stringify(storeRawData[name]))
        }
				store.registerModule(name, store.state[name] ? Object.assign({}, modules[name], {state: store.state[name]}) : modules[name]);
				moduleCount[name] = 1;
			}
		});
	}
}

function unregisterModule(store, modules) {
	if (store && modules) {
		const moduleCount = store._modulesCount = store._modulesCount || {};
		Object.keys(modules).forEach((name) => {
			if (moduleCount[name] > 0) {
				moduleCount[name] --;
			}
			if (moduleCount[name] === 0) {
				store.unregisterModule(name);
				delete moduleCount[name];
			}
		});
	}
}

function registerAllModules(store, component) {
	registerModule(store, component.storeModules);
	if (component.components) {
		Object.keys(component.components).forEach((name) => {
			if (typeof component.components[name] !== 'function') {
				registerAllModules(store, component.components[name]);
			}
		});
	}
}

function unregisterAllModules(store, component) {
	unregisterModule(store, component.storeModules);
	if (component.components) {
		Object.keys(component.components).forEach((name) => {
			if (typeof component.components[name] !== 'function') {
				unregisterAllModules(store, component.components[name]);
			}
		});
	}
}
