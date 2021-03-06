((window) => {

	'use strict';


	/**
	 * @class TagsStore
	 */
	class TagsStore {

		constructor() {

		}

		get(key) {
			const promise = new Promise((resolve, reject) => {
				chrome.storage.sync.get(key, data => {
					if (chrome.runtime.lastError) {
						reject(chrome.runtime.lastError);
					} else {
						resolve(data);
					}
				});
			});

			promise.catch(error => {
				console.log('chrome.storage.sync.get error', error, error.message);
				GSM.utils.track('Sync', 'get', 'error', error.message);
			});

			return promise;
		}

		set(key, value) {
			const data = {
				[key]: value
			};

			const promise = new Promise((resolve, reject) => {
				chrome.storage.sync.set(data, () => {
					if (chrome.runtime.lastError) {
						reject(chrome.runtime.lastError);
					} else {
						resolve();
					}
				});
			});

			promise.catch(error => {
				console.log('chrome.storage.sync.set error', error, error.message);
				GSM.utils.track('Sync', 'set', 'error', error.message);
			});

			return promise;
		}

		remove(key) {
			const promise = new Promise((resolve, reject) => {
				chrome.storage.sync.remove(key, () => {
					if (chrome.runtime.lastError) {
						reject(chrome.runtime.lastError);
					} else {
						resolve();
					}
				});
			});

			promise.catch(error => {
				console.log('chrome.storage.sync.remove error', error, error.message);
				GSM.utils.track('Sync', 'remove', 'error', error.message);
			});

			return promise;
		}

		clear() {
			const promise = new Promise((resolve, reject) => {
				chrome.storage.sync.clear(() => {
					if (chrome.runtime.lastError) {
						reject(chrome.runtime.lastError);
					} else {
						resolve();
					}
				});
			});

			promise.catch(error => {
				console.log('chrome.storage.sync.clear error', error, error.message);
				GSM.utils.track('Sync', 'clear', 'error', error.message);
			});

			return promise;
		}

	}


	window.GSM = window.GSM || {};
	GSM.TagsStore = TagsStore;

})(window);
