// ==UserScript==
// @name         ioihw2021 做题工具
// @version      1.3
// @author       yhx-12243
// @match        https://ioihw21.duck-ac.cn/
// @match        https://ioihw21.duck-ac.cn/*
// @updateURL    http://82.157.186.142/ioi21hw_helper.js
// @downloadURL  http://82.157.186.142/ioi21hw_helper.js
// @supportURL   https://github.com/yhx-12243/ioihw-helper/issues
// @homepage     https://github.com/yhx-12243/ioihw-helper
// @grant        none
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
//                                Made by yhx-12243                               //
//                                                                                //
//                              jffLLLLLLLLLLLLLLffj                              //
//                         jfLLGGGLfffjjjjjjjjfffLGGGLLfj                         //
//                     jffLGGLji;,,..          ..,,;ijLGGLL                       //
//                   ffLGLfi,:                        ::ijLGGL                    //
//                ffLLLji:              ,j;.           it;:;tffLf                 //
//              ffLLft,.        :;;,,;tD#f,            ;LKf;ifDGLLf               //
//            GLfLLt,           :iLDDGj;:                ,tLGfiitLLfLG            //
//           LLLGj;                         :;:     .;,          ;jGLLL           //
//          LLLLi:                       .,f#E;     ,f#f,         .iLLLL          //
//         LLLfi.                   .,ijLDEf;        .iG#L;:.      .ifLL          //
//        LLLfi             ;LWEEEKKDGLti,             .:iLEWKK#f:   ifLLL        //
//        LLG;.           ..:,,,,,,::..   ;,     :.     ,, ..:,,:....:iLLL        //
//       LLff:         .::,,:::::::::..   fGi..:;Gf,:.:tKt   ..::,,,,:;jfLLf      //
//       LLf;.         ..::::::::::::..   .iDK##KGGWWKKE;    .::::::::,;fLLG      //
//      LLLj.                              .tDftjttjtfGj.              :jLLL      //
//      LLLt                                ,DLjtttttLLi.               tLLLf     //
//      LLft                                .GDftttjfEf.                tfLLf     //
//      LLft                                 iGGtttjGDi                 tfLLf     //
//      LLLt                                  iDDLLGE;                  tLLLf     //
//      LLLj.                                  .ijj;.                  .jLLL      //
//       LLf;.                                                        .;fLLG      //
//       LLff:                                                        :ffLL       //
//        LLG;.                   .,;tfLLLfji,:      :,tjfLLLfji,.   .iGLL        //
//        LLLfi                .,tGDLji;;;itfGDj;.:ifDGfti;;;itLDGj,.ifLLL        //
//         LLLfi.             :jGLi:         .;fDLLLj,.         :iLGfLLLf         //
//          LLLLi:           ;LLt:             .;fGj.             :iLfLLG         //
//           LLLGj;         ,jGt                 ;Lf;.             .tfLLL         //
//            GLfLLt,      .tLj,                 :iLf:              :jGLL         //
//              ffLLLj,.   .jLt:                 .;GL:              .tGLL         //
//                ffLLLji: .;ff;                 ,jLf:              ,jLLL         //
//                   ffLGLjtijGj:               .tGj:              :ffLLf         //
//                     jffLLGLffL;.            ,fLLf,            .;fLLL           //
//                         ffLLLLLfi,... ...:ijLfLLLLj;:..  ...,ifLLLf            //
//                              ffLLGLffjjfLGLLLfLLLLLGGLfjjffGGLLff              //
//                                ffffLLLLLffff      ffffLLLLLffff                //
//                                                                                //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////

const version = '1.3';

const userlist = [
	'张隽恺', '周航锐', '胡杨',   '潘佳奇', '曹越',   '张庭瑞', '彭博',   '齐楚涵', '蔡欣然',   '胡昊',
	'陈于思', '陶立宇', '戴江齐', '万成章', '陈潇然', '孙若凡', '陈知轩', '许庭强', '冯施源',   '杨珖',
	'杨宇辰', '丁晓漫', '袁浩天', '张景行', '宣毅鸣', '罗恺',   '张记僖', '杜盛全', '常瑞年',   '吴雨洋',
	'陈扩文', '唐绍轩', '张家瑞', '周方远', '郑路明', '谢濡键', '邓奕鹏', '王蔚澄', '陈东武',   '俞跃',
	'孙嘉伟', '林帮才', '鲁劲帆', '孟煜皓', '史钰申', '李天宇', '俞越',   '郭雨豪', '张尊喆',   '王相文',
	'修煜然', '程思元', '施开成', '张湫阳', '潘逸飞', '金天',   '李尚泽', '张文哲', '王又嘉',   '崔隽章',
	'管晏如', '万弘',   '胡昊',   '张扬',   '王天',   '杨欣烨', '王浏清', '朱羿恺', '王浩旭',   '俞畅',
	'吴明禹', '何润元', '李可',   '李昕然', '汤智铖', '黄嘉豪', '任舍予', '何卓锟', '周子衡',   '肖子尧',
	'张迅',   '朱厚源', '钟自厚', '曹立',   '杨宁远', '朱睿哲', '周转',   '褚轩宇', '李铭乐洋', '吴戈',
	'朱梓铭'
];

const colors = [
	'black',
	'green',
	'yellow',
	'red',
];

const vains = [
	4,
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
		let plain = parseInt(localStorage.getItem('hw-winner'));
		return isNaN(plain) ? -1 : plain;
	},
};

function getProblemInfo(problemId) {
	let problemType, authorName;
	if (101 <= problemId && problemId <= 150) {
		problemType = '互测题';
		authorName = `ioi2022_${(problemId - 101).toString().padStart(2, '0')}`;
	} else {
		problemType = '测试题';
		authorName = 'root';
	}

	return {problemType, authorName};
}

function getUserInfo(id) {
	function strMatch(source, reg_exp, default_value) {
		let match_result = source.match(reg_exp);
		if (match_result) {
			return match_result[1];
		} else {
			console.warn(`[Warning] string doesn't match! (${source}, ${reg_exp})`);
			return default_value;
		}
	}
	id = id.toString().padStart(2, '0');
	return fetch(`/user/profile/ioi2022_${id}`).then(res => res.text()).then(res => {
		let motto = strMatch(res, /<h4 class="list-group-item-heading">格言<\/h4>\s+<p class="list-group-item-text">(.*?)<\/p>/s, '<div class="text-danger">&lt;error&gt;</div>');
		let count = 0;
		for (let match of res.matchAll(/"\/problem\/(\d+)"/g)) {
			let problemId = parseInt(match[1]);
			count += getProblemInfo(problemId).problemType === '互测题';
		}

		return {id, motto, count};
	});
}

function globalRender() {
	$('.uoj-username').each(function () {
		let match;
		if (match = this.textContent.match(/^ioi2022_([0-9]+)$/)) {
			let uid = parseInt(match[1]);
			let name = userlist[uid];
			if (uid === dbWinner.query()) {
				name += '<sup style="color: red">卷王</sup>';
			}
			if (name) {
				this.innerHTML = '<span style="font-weight: normal">' + name + '</span>';
			}
		}
	});

	if (location.pathname.startsWith('/problems')) {
		$('.table tr td:first-child').each(function () {
			let pid = this.textContent.slice(1);
			let status = db.query(pid);
			this.style.color = colors[status];
			this.style.fontWeight = (status ? 'bold' : 'normal');
		}).click(function () {
			let pid = this.textContent.slice(1);
			let status = db.query(pid);
			status = (status + 1) % colors.length;
			db.update(pid, status);
			this.style.color = colors[status];
			this.style.fontWeight = (status ? 'bold' : 'normal');
		});
	}
}

class Ranklist {
	static async render() {
		document.title = document.title.replace('比赛排行榜', '卷王榜');

		let userListPromised = [];
		$('.pagination').remove();
		$('.table tbody tr').remove();
		for (let userId = 0; userId < userlist.length; userId++) {
			userListPromised.push(getUserInfo(userId));
		}
		let userList = await Promise.all(userListPromised);
		userList.sort((firstUser, secondUser) => (secondUser.count - firstUser.count) || (parseInt(firstUser.id) - parseInt(secondUser.id)));
		if (userList.length) {
			dbWinner.update(userList[0].id);
		}
		$('.table thead tr th:last-child').text('通过数');
		for (let user of userList) {
			let $tr = $('<tr></tr>').append(`<td>${user.id}</td>`)
				.append(`<td>${getUserLink(`ioi2022_${user.id}`, 1500)}</td>`)
				.append(`<td>${user.motto}</td>`)
				.append(`<td>${user.count}</td>`);
			$('.table tbody').append($tr);
		}
	}
}

class mainRanklist {
	static analyze() {
		this.standings = userlist.map((name, idx) => ({
			idx,
			id: `ioi2022_${idx.toString().padStart(2, '0')}`,
			Tscore: 0,
			points: 0, // limit 100
			points_S60: 0, // limit 80
			points_F20: 0, // limit 20
			records: this.contests.map(contest => ({contest}))
		}));
		let standings_map = {}, CTT = this.standings.slice(0, 50).map(x => x.id);
		this.standings.forEach(standing => standings_map[standing.id] = standing);
		globalThis.asdf = this.contests;
		this.contests.forEach((contest, idx) => {
			let i, j = -1, c = 0, restrict = Infinity,
				{standings, score, problems} = contest.data;
			for (i = 0; i < standings.length; ++i)
				if (CTT.includes(standings[i][2][0])) {
					if (++c <= 20) restrict = standings[i][0];
					standings[i].push(~j && standings[i][0] === standings[j][0] ? standings[j][4] : c);
					j = i;
				}
			contest.first20 = restrict;
			standings.forEach(row => {
				let id = row[2][0], user = standings_map[id], record = user.records[idx];
				[record.score, , , record.rank, record.ctt_rank] = row;
				record.points_S60 = (record.score >= 60 ? 10 : 0);
				record.points_F20 = (record.score >= contest.first20 ? 3 : 0);
				user.Tscore += record.score;
			});
			for (let id in score) {
				let user = standings_map[id];
				user.records[idx].details = score[id];
			}
			problems.forEach(pid => {
				let {problemType: type, authorName: uid} = getProblemInfo(pid);
				if (type === '互测题') {
					console.log(uid);
					let user = standings_map[uid], record = user.records[idx];
					record.is_problemsetter = true;
					record.points_S60 = 10;
					record.points_F20 = 3;
				}
			});
			this.standings.forEach(user => {
				let record = user.records[idx];
				user.points_S60 += (record.points_S60 ??= 0);
				user.points_F20 += (record.points_F20 ??= 0);
			});
		});
	}

	static render() {
		$('head').append(`<style>
.table>tbody>tr>td.warning {background-color: #fcf8e3 !important}
.table>tbody>tr:hover>td.warning {background-color: #faf2cc !important}
.table>tbody>tr>td.success {background-color: #dff0d8 !important}
.table>tbody>tr:hover>td.success {background-color: #d0e9c6 !important}
.table>tbody>tr>td.fuchsia {background-color: #f5bbf5 !important}
.table>tbody>tr:hover>td.fuchsia {background-color: #f2a6f2 !important}
</style>`);
		let row_1 = ['<tr><th rowspan="2" style="min-width: 3em">#</th><th rowspan="2" style="min-width: 6em">用户名</th>'], row_2 = ['<tr>'];
		this.contests.forEach(contest => {
			let n = contest.data.problems.length;
			row_1.push(`<th colspan="${n + 3}" style="border-bottom-width: 1px; min-width: ${2 * n + 11.5}em"><a href="/contest/${contest.id}">${contest.name}</a></th>`);
			row_2.push(
				'<th style="min-width: 4em">排名</th>',
				...contest.data.problems.map((problem, idx) => `<th style="min-width: 2em"><a href="/contest/${contest.id}/problem/${problem}">${String.fromCharCode(65 + idx)}</a></th>`),
				'<th style="min-width: 3.5em">总分</th>',
				'<th style="min-width: 4em">折算分</th>'
			);
		});
		row_1.push(
			'<th rowspan="2" style="min-width: 5em">总分</th>',
			'<th rowspan="2" style="min-width: 6em">总折算分</th>',
			'</tr>'
		), row_2.push('</tr>');

		let $container = $('div.uoj-content');
		$container.long_table(this.standings, 1, row_1.concat(row_2).join(''), (row, idx) => {
			let ret = (row.idx >= 50 ? '<tr class="info">' : '<tr>'), N = 0;
			ret += `<td>${row.idx.toString().padStart(2, '0')}</td><td>${getUserLink(row.id, 1500)}</td>`;
			for (let record of row.records) {
				let n = record.contest.data.problems.length, rank_str = '', class_str = (record.is_problemsetter ? ' class="fuchsia"' : '');
				N += n;
				if (record.rank) {
					rank_str = `${record.ctt_rank ? record.ctt_rank : '-'} (${record.rank})`;
				}
				record.score ??= - 1;
				ret += `<td${class_str || (record.score >= record.contest.first20 ? ' class="warning"' : '')}>${rank_str}</td>`;
				record.details ??= [];
				for (let i = 0; i < n; ++i) {
					if (record.details[i]) {
						let [score, , sid] = record.details[i];
						ret += `<td${class_str}><a href="/submission/${sid}" class="uoj-score" style="color: ${getColOfScore(score)}">${score}</a></td>`;
					} else {
						record.details[i] = [-1];
						ret += `<td${class_str}></td>`;
					}
				}
				if (record.score !== -1) {
					ret += `<td${class_str || (record.score >= 60 ? ' class="success"' : '')}><span class="uoj-score" data-max="${n * 100}" style="color: ${getColOfScore(record.score / n)}">${record.score}</span></td>`;
				} else {
					record.score = -1;
					ret += `<td${class_str}></td>`;
				}
				record.points = record.points_S60 + record.points_F20;
				ret += `<td${class_str}>${(record.points * .05).toFixed(2)}</td>`;
			}
			ret += `<td><span class="uoj-score" data-max="${N * 100}" style="color: ${getColOfScore(N ? row.Tscore / N : 0)}">${row.Tscore}</span></td>`;
			row.points = Math.min(row.points_S60, 80) + Math.min(row.points_F20, 20);
			ret += `<td>${(row.points * .05).toFixed(2)}</td></tr>`;
			return ret;
		}, {
			echo_full: true,
			get_row_index: true,
			page_len: 1e308,
			table_classes: ['table', 'table-bordered', 'table-hover', 'table-striped', 'table-text-center', 'table-vertical-middle', 'table-condensed']
		}).prepend('<div class="text-right text-muted">提示：点击表头可以排序</div>');

		let rows = $container.find('thead>tr').get(),
			body = $container.find('tbody'),
			data_rows = [...body.get(0).rows];
		console.assert(data_rows.length === this.standings.length);
		for (let i = 0; i < this.standings.length; ++i) data_rows[i].extra_ioi2022 = this.standings[i];
		// compare functions
		const cmp = (A, B) => (A < B ? -1 : A > B ? 1 : 0),
			cmpIdx = (A, B) => cmp(A.idx, B.idx),
			andThen = (f, g) => (A, B) => f(A, B) || g(A, B),
			sort = f => {
				data_rows.sort((A, B) => f(A.extra_ioi2022, B.extra_ioi2022));
				body.empty().append(data_rows);
			},
			cmpFns = {
				natural: cmpIdx,
				username: andThen((A, B) => cmp(userlist[A.idx], userlist[B.idx]), cmpIdx),
				score: andThen((A, B) => -cmp(A.Tscore, B.Tscore), cmpIdx),
				points: andThen((A, B) => -cmp(A.points, B.points), cmpIdx),
				details: []
			};

		this.contests.forEach((contest, idx) => {
			let n = contest.data.problems.length;
			let cmpScore = andThen((A, B) => -cmp(A.records[idx].score, B.records[idx].score), cmpIdx);
			let cmpPoints = andThen((A, B) => -cmp(A.records[idx].points, B.records[idx].points), cmpIdx);
			cmpFns.details.push(cmpScore);
			for (let i = 0; i < n; ++i)
				cmpFns.details.push(andThen((A, B) => -cmp(A.records[idx].details[i][0], B.records[idx].details[i][0]), cmpIdx));
			cmpFns.details.push(cmpScore, cmpPoints);
		});

		$container.find('th').click(function (e) {
			let tr = this.parentNode, idx = rows.indexOf(tr), idc = [].indexOf.call(tr.cells, this);
			if (idx === 0) {
				if (idc === 0) return sort(cmpFns.natural);
				if (idc === 1) return sort(cmpFns.username);
				if (idc === tr.cells.length - 2) return sort(cmpFns.score);
				if (idc === tr.cells.length - 1) return sort(cmpFns.points);
			} else if (idx === 1) {
				return sort(cmpFns.details[idc]);
			} else {
				console.warn('[Warning] Unknown element', this);
			}
		});
	}

	static async getContest(contest) {
		// load data if immutable
		if (contest.status === 2) {
			try {
				let res = localStorage.getItem(`contest_${contest.id}`);
				if (!res) throw Error;
				contest.data = JSON.parse(res);
				return;
			} catch (e) {
			};
		}
		// fetch data
		let response = await (await fetch(`/contest/${contest.id}/standings`)).text();
		let raw = response.match(/<div id="standings"><\/div><script type="text\/javascript">(.*?)<\/script>/s);
		if (!raw) {
			contest.data = 'failed';
			return;
		}
		raw = raw[1];
		raw = raw.slice(0, raw.lastIndexOf('$'));
		contest.data = (r => {
			let standings_version, contest_id, standings, score, problems;
			eval(r);
			return {standings_version, contest_id, standings, score, problems};
		})(raw);
		// save data
		if (contest.status === 2) {
			localStorage.setItem(`contest_${contest.id}`, JSON.stringify(contest.data));
		}
	}

	static async main() {
		const statuses = {
			'等待评测': 0,
			'正在评测': 1,
			'已结束': 2,
			'pending final test': 0,
			'final testing': 1,
			'ended': 2
		}
		document.title = document.title.replace(/40[34]/, '互测总榜');
		$('div.uoj-content').empty();
		this.contests = [];
		let response = await (await fetch('/contests')).text();
		for (let match of response.matchAll(/<tr><td><a.*?<\/tr>/gs)) {
			let $cell = $.parseHTML(match[0])[0].cells[0];
			let $a = $cell.querySelector('a');
			let id = +$a.href.slice($a.href.lastIndexOf('/') + 1);
			if (!isNaN(id) && !vains.includes(id)) {
				let status = statuses[$cell.querySelector('sup')?.textContent];
				if (status) this.contests.push({id, name: $a.textContent, status});
			}
		}
		let promises = this.contests.map(this.getContest);
		await Promise.all(promises);
		this.contests = this.contests.filter(contest => contest.data !== 'failed').sort((x, y) => x.id - y.id);

		this.analyze();
		this.render();
	}
};

(async () => {
	$('.navbar .navbar-nav').append('<li><a href="/ranklist">卷王榜</a></li>')
							.append('<li><a href="/standings">互测总榜</a></li>');
	$('div.uoj-footer>p:last-child').append(` | <a href="https://github.com/yhx-12243/ioihw-helper">ioihw-helper ${version}</a>（已修改）`);

	if (location.pathname === '/ranklist') {
		await Ranklist.render();
	}

	if (location.pathname === '/standings') {
		await mainRanklist.main();
	}

	if (location.pathname.startsWith('/problems')) {
		$('.table thead tr th:last-child').css('width', '170px');
		$('.table thead tr').eq(0).append('<th class="text-center" style="width: 95px;">来源</th>');
		$('.table tbody tr').each(function (index, element) {
			let $element = $(element);
			let problemId = $element.children('td').eq(0).text().slice(1);
			let {problemType, authorName} = getProblemInfo(problemId);

			let extraContent = '';
			if (problemType === '互测题') {
				extraContent = `by ${getUserLink(authorName, 1500)}`;
			}

			$element.append('<td>' + extraContent + '</td>');
		});
	}

	let match;
	if (match = location.pathname.match(/\/problem\/(\d+)/)) {
		let problemId = parseInt(match[1]);
		let {problemType, authorName} = getProblemInfo(problemId);

		$('.nav-tabs').eq(0).append(`<li>
			<span style="display: block; padding: 10px 15px; font-weight: bold">
				${problemType}
				<span style="font-weight: normal">by</span>
				${getUserLink(authorName, 1500)}
			</span>
		</li>`);
	}

	globalRender();
})();
