// ==UserScript==
// @name         FLOJ helper
// @version      2.2.0
// @author       whx1003
// @match        *://*.floj.tech/*
// @updateURL    https://cdn.jsdelivr.net/gh/whx1003/FLOJ-helper@FLOJ-helper/userscript.js
// @downloadURL  https://cdn.jsdelivr.net/gh/whx1003/FLOJ-helper@FLOJ-helper/userscript.js
// @supportURL   https://github.com/whx1003/FLOJ-helper/issues
// @homepage     https://github.com/whx1003/FLOJ-helper
// @grant        none
// ==/UserScript==

const version = '2.2.0';

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
		let winners = (await Promise.all([getwinner()]))[0];
		for (let i = 0; i < 10 && i < winners.length; ++i)
			localStorage.setItem(`juanking${i}`, winners[i]);
	},
	query(id) {
		return localStorage.getItem(`juanking${id}`);
	},
};

function replaceUserName() {
	let url = this.getAttribute('href');
	let matches, name;
	if (url) {
		matches = url.match(/\/profile\/([0-9a-zA-Z_]{1,})/g);
		name = matches[0].substr(9);
	}
	else {
		matches = this.textContent.match(/([0-9a-zA-Z_]{1,})/g);
		name = matches[0];
	}

	for (let i = 0; i < 10; ++i)
		if (name === dbWinner.query(i))
			this.innerHTML += `<sup style="color: ${getColOfRating(2500 - 100 * i)}">卷王</sup>`
}

function replaceDanger() {
    this.style.backgroundColor = '#fff8d7';
}

(async () => {
	dbWinner.init();
	$('.uoj-username').each(await replaceUserName);
	$('td.danger').each(await replaceDanger);
})();
