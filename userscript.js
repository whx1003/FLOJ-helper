// ==UserScript==
// @name         FLOJ helper
// @version      1.0.0
// @author       whx1003
// @match        *://*.floj.tech/*
// @updateURL    https://cdn.jsdelivr.net/gh/whx1003/FLOJ-helper@FLOJ-helper/userscript.js
// @downloadURL  https://cdn.jsdelivr.net/gh/whx1003/FLOJ-helper@FLOJ-helper/userscript.js
// @supportURL   https://github.com/whx1003/FLOJ-helper/issues
// @homepage     https://github.com/whx1003/FLOJ-helper
// @grant        none
// ==/UserScript==

const version = '1.0.0';

const dbWinner = {
	update(winner) {
		localStorage.setItem('juanking', winner);
	},
	query() {
		return localStorage.getItem('juanking');
	},
};

function replaceUserName() {
	console.log(this.textContent);

	let match;
	if (match = this.textContent.match(/([0-9a-zA-Z_]{1,})/g))
		if (match[0] === dbWinner.query())
			this.innerHTML += '<sup style="color: red">卷王</sup>'
}

function getuserlist() {
	return fetch(`/ranklist`).then(res => res.text()).then(res => {
		let username = [], userrating = [];

		let matches = res.match(/data-rating="(\d+)">([0-9a-zA-Z_]{1,})/g);
		for (let match of matches) {
			let p = 13, rat = 0;
			while (match[p] >= '0' && match[p] <= '9') rat = rat * 10 + parseInt(match[p]), ++p;
			let name = match.substr(p + 2);

			userrating.push(rat);
			username.push(name);
		}
		return { username, userrating };
	});
}

function getUserInfo(id) {
	function strMatch(source, reg_exp, default_value) {
		let match_result = source.match(reg_exp);
		if (match_result) {
			return match_result[1];
		} else {
			console.warn(id + `: [Warning] string doesn't match! (${source}, ${reg_exp})`);
			return default_value;
		}
	}

	return fetch(`/user/profile/${id}`).then(res => res.text()).then(res => {
		let motto = strMatch(res, /<h4 class="list-group-item-heading">(?:格言|Motto)<\/h4>\s+<p class="list-group-item-text">(.*?)<\/p>/s, '<div class="text-danger">&lt;error&gt;</div>');
		let match, count = 0;
		if (match = res.match(/"\/problem\/(\d+)"/g))
			count = match.length;
		return { id, motto, count };
	});
}

class Juanlist {
	static async render() {
		let table = '<table class="table table-bordered table-hover table-striped table-text-center"><thead><tr><th style="width: 5em;">#</th><th style="width: 14em;">用户名</th><th style="width: 50em;">格言</th><th style="width: 5em;">通过数</th></tr></thead><tbody>'
		
		let userlist = (await Promise.all([getuserlist()]))[0];
		let username = userlist.username;
		let userrating = userlist.userrating;

		let userListPromised = [];
		for (let userId of username)
			userListPromised.push(getUserInfo(userId));

		let userList = await Promise.all(userListPromised);
		userList.sort((firstUser, secondUser) => (secondUser.count - firstUser.count) || (firstUser.id < secondUser.id ? -1 : 1));

		if (userList.length) {
			dbWinner.update(userList[0].id);
		}

		for (let i = 0; i < 100 && i < userList.length; ++i) {
			table += '<tr>'
				+ `<td>${i + 1}</td>`
				+ `<td>${getUserLink(`${userList[i].id}`, userrating[username.indexOf(userList[i].id)])}</td>`
				+ `<td>${userList[i].motto}</td>`
				+ `<td>${userList[i].count}</td>`;
			+ '</tr>';
		}

		table += '</tbody></table>';
		$('div.uoj-content').append(table);

		let $container = $('div.uoj-content');
		$container.find('.uoj-username').each(replaceUserName);
	}

	static async main() {
		document.title = document.title.replace(/40[34]/, '卷王榜');
		$('div.uoj-content').empty();
		this.render();
	}
}

(async () => {
	if (location.hostname === 'floj.tech' || location.hostname === 'i.floj.tech') {
		$('.navbar .navbar-nav li:last').remove();
		$('.navbar .navbar-nav').append('<li><a href="/juanlist">卷王榜</a></li>');
		$('.navbar .navbar-nav').append('<li><a href="/aboutwxh"></a></li>');
		$('div.uoj-footer>p:last-child').append(` | <a href="https://github.com/whx1003/FLOJ-helper">ioihw-helper ${version}</a>（已修改）`);

		if (location.pathname === '/juanlist') {
			await Juanlist.main();
		}
	}
	$('.uoj-username').each(await replaceUserName);
})();
