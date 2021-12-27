// ==UserScript==
// @name         FLOJ helper
// @version      2.0.0
// @author       whx1003
// @match        *://*.floj.tech/*
// @updateURL    https://cdn.jsdelivr.net/gh/whx1003/FLOJ-helper@FLOJ-helper/userscript.js
// @downloadURL  https://cdn.jsdelivr.net/gh/whx1003/FLOJ-helper@FLOJ-helper/userscript.js
// @supportURL   https://github.com/whx1003/FLOJ-helper/issues
// @homepage     https://github.com/whx1003/FLOJ-helper
// @grant        none
// ==/UserScript==

const version = '2.0.0';

function getwinner() {
	return fetch(`/juanlist`).then(res => res.text()).then(res => {
		let username = [], userrating = [];

		let matches = res.match(/data-rating="(\d+)">([0-9a-zA-Z_]{1,})/g);
		for (let match of matches) {
			let p = 13, rat = 0;
			while (match[p] >= '0' && match[p] <= '9') rat = rat * 10 + parseInt(match[p]), ++p;
			let name = match.substr(p + 2);

			userrating.push(rat);
			username.push(name);
		}
		return username;
	});
}

const dbWinner = {
	async init() {
		let winners = (await Promise.all([ getwinner() ]))[0];

		
		localStorage.setItem('juanking', winner);
	},
	query() {
		return localStorage.getItem('juanking');
	},
};

function replaceUserName() {
	let match;
	if (match = this.textContent.match(/([0-9a-zA-Z_]{1,})/g))
		if (match[0] === dbWinner.query())
			this.innerHTML += '<sup style="color: red">卷王</sup>'
}

(async () => {
	dbWinner.init();
	$('.uoj-username').each(await replaceUserName);
})();
