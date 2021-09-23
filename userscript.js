// ==UserScript==
// @name         ioihw2021 做题工具
// @version      1.0
// @author       yhx-12243
// @match        https://ioihw21.duck-ac.cn/
// @match        https://ioihw21.duck-ac.cn/*
// @supportURL   https://github.com/yhx-12243/ioihw-helper/issues
// @homepage     https://github.com/yhx-12243/ioihw-helper
// @grant        none
// ==/UserScript==

const userlist = [
	'张隽恺',
	'周航锐',
	'胡杨',
	'潘佳奇',
	'曹越',
	'张庭瑞',
	'彭博',
	'齐楚涵',
	'蔡欣然',
	'胡昊',
	'陈于思',
	'陶立宇',
	'戴江齐',
	'万成章',
	'陈潇然',
	'孙若凡',
	'陈知轩',
	'许庭强',
	'冯施源',
	'杨珖',
	'杨宇辰',
	'丁晓漫',
	'袁浩天',
	'张景行',
	'宣毅鸣',
	'罗恺',
	'张记僖',
	'杜盛全',
	'常瑞年',
	'吴雨洋',
	'陈扩文',
	'唐绍轩',
	'张家瑞',
	'周方远',
	'郑路明',
	'谢濡键',
	'邓奕鹏',
	'王蔚澄',
	'陈东武',
	'俞跃',
	'孙嘉伟',
	'林帮才',
	'鲁劲帆',
	'孟煜皓',
	'史钰申',
	'李天宇',
	'俞越',
	'郭雨豪',
	'张尊喆',
	'王相文',
	'修煜然',
	'程思元',
	'施开成',
	'张湫阳',
	'潘逸飞',
	'金天',
	'李尚泽',
	'张文哲',
	'王又嘉',
	'崔隽章',
	'管晏如',
	'万弘',
	'胡昊',
	'张扬',
	'王天',
	'杨欣烨',
	'王浏清',
	'朱羿恺',
	'王浩旭',
	'俞畅',
	'吴明禹',
	'何润元',
	'李可',
	'李昕然',
	'汤智铖',
	'黄嘉豪',
	'任舍予',
	'何卓锟',
	'周子衡',
	'肖子尧',
	'张迅',
	'朱厚源',
	'钟自厚',
	'曹立',
	'杨宁远',
	'朱睿哲',
	'周转',
	'褚轩宇',
	'李铭乐洋',
	'吴戈',
	'朱梓铭'
];

const colors = [
	'black',
	'green',
	'yellow',
	'red',
];

const db = {
	load() {
		return JSON.parse(localStorage.getItem('hw') || '[]');
	},
	dump(data) {
		localStorage.setItem('hw', JSON.stringify(data || []));
	},
	update(pid, status) {
		let data = db.load();
		data[pid] = status;
		db.dump(data);
	},
	query(pid) {
		return db.load()[pid] || 0;
	},
};

const dbWinner = {
	update(winner) {
		localStorage.setItem('hw-winner', String(winner));
	},
	query() {
		let plain = localStorage.getItem('hw-winner');
		if (isNaN(parseInt(plain))) {
			return -1;
		} else {
			return parseInt(plain);
		}
	}
};

function getProblemInfo(problemId) {
	let problemType, authorName;
	if (101 <= problemId && problemId <= 150) {
		problemType = '互测题';
		authorName = `ioi2022_${problemId - 101}`;
	} else {
		problemType = '测试题';
		authorName = 'root';
	}

	return {
		problemType,
		authorName
	};
}

function getUserInfo(id) {
	function strMatch(source, reg_exp, default_value) {
		let match_result = source.match(reg_exp);
		if (match_result) {
			return match_result[1];
		} else {
			console.log("[Warning] string doesn't match!");
			return default_value;
		}
	}
	id = id.toString().padStart(2, '0');
	return $.get({
		url: `/user/profile/ioi2022_${id}`,
	}).then((res) => {
		let motto = strMatch(res, /<h4 class="list-group-item-heading">格言<\/h4>\s+<p class="list-group-item-text">(.*?)<\/p>/s, '<div class="text-danger">&lt;error&gt;</div>');
		let regex = /"\/problem\/(\d+)"/g, match, count = 0;
		while (match = regex.exec(res)) {
			let problemId = parseInt(match[1]);
			let {problemType} = getProblemInfo(problemId);
			count += problemType == '互测题';
		}

		return {
			id,
			motto,
			count,
		};
	});
}

async function render() {
	$('.uoj-username').each(function () {
		let match;
		if (match = this.textContent.match(/^ioi2022_([0-9]+)$/)) {
			let uid = parseInt(match[1]);
			let name = userlist[uid];
			if (uid == dbWinner.query()) {
				name += '<sup style="color: red">卷王</sup>';
			}
			if (name) {
				console.log(uid, name);
				this.innerHTML = '<span style="font-weight: normal">' + name + '</span>';
			}
		}
	});

	if (location.pathname.startsWith('/problems')) {
		$('.table tr td:first-child').each(function () {
			let pid = this.textContent.slice(1);
			let status = db.query(pid);
			this.style.color = colors[status];
			if (status) {
				this.style['font-weight'] = 'bold';
			} else {
				this.style['font-weight'] = 'normal';
			}
			console.log(pid, status);
		});
	}
}

async function mainRender() {
	$('.navbar .navbar-nav').append('<li><a href="/ranklist">排行榜</a></li>')

	if (location.pathname == '/ranklist') {
		document.title = document.title.replace('比赛排行榜', '排行榜');

		let userListPromised = [];
		$('.pagination').remove();
		$('.table tbody tr').remove();
		for (let userId = 0; userId < userlist.length; userId++) {
			userListPromised.push(getUserInfo(userId));
		}
		let userList = await Promise.all(userListPromised);
		userList.sort((firstUser, secondUser) => {
			console.log(firstUser, secondUser);
			if (firstUser.count == secondUser.count) {
				return parseInt(firstUser.id) - parseInt(secondUser.id);
			}
			return secondUser.count - firstUser.count;
		});
		if (userList.length) {
			dbWinner.update(userList[0].id);
		}
		console.log(userList);
		$('.table thead tr th:last-child').text('通过数');
		for (let user of userList) {
			console.log(user);
			let $tr = $('<tr></tr>');
			$tr.append(`<td>${user.id}</td>`);
			$tr.append(`<td><a class="uoj-username" href="/user/profile/ioi2022_${user.id}" style="color: #4bafb2">ioi2022_${user.id}</a></td>`);
			$tr.append(`<td>${user.motto}</td>`);
			$tr.append(`<td>${user.count}</td>`);
			$('.table tbody').append($tr);
		}
	}

	let match;
	if (match = location.pathname.match(/\/problem\/(\d+)/)) {
		let problemId = parseInt(match[1]);
		let {problemType, authorName} = getProblemInfo(problemId);

		$('.nav-tabs').eq(0).append(`<li>
	        <span style="display:block;padding:10px 15px;font-weight:bold;">
	            ${problemType}
	            <span style="font-weight:normal">by</span>
	            <a class="uoj-username" target="_blank" href="/user/profile/${authorName}" style="color: #4bafb2">${authorName}</a>
	        </span>
	    </li>`);
	}

	render();
}

if (location.pathname.startsWith('/problems')) {
	$('.table tr td:first-child').click(function () {
		let pid = this.textContent.slice(1);
		let status = db.query(pid);
		status = (status + 1) % colors.length;
		db.update(pid, status);
		render();
	});
}

mainRender();
