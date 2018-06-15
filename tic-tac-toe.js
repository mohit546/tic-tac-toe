var board = [[{}, {}, {}, {x: 0, o: 0}], [{}, {}, {}, {x: 0, o: 0}], [{}, {}, {}, {x: 0, o: 0}], [{x: 0, o: 0}, {x: 0, o: 0}, {x: 0, o: 0}, {x: 0, o: 0}]];
boardSize = 3,
count = 0,
digonal = {
	one: ['00', '11', '22'],
	two: ['02', '11', '20']
};
var isComputer = false;

var sketchBoard = document.createElement('div');
sketchBoard.id = 'sketchBoard';
sketchBoard.style.cssText = 'position: absolute; top: 40%; left: 45%;';
document.getElementsByTagName('body')[0].appendChild(sketchBoard);

var checkDigonal = function(){
	var x1 = x2 = o1 = o2 = 0;
	for(var i = 0, l = digonal.one.length; i < l; i++){
		if(board[digonal.one[i].charAt(0)][digonal.one[i].charAt(1)]['player'] == 'X'){ x1++; }
		if(board[digonal.two[i].charAt(0)][digonal.two[i].charAt(1)]['player'] == 'X'){ x2++; }
		if(board[digonal.one[i].charAt(0)][digonal.one[i].charAt(1)]['player'] == 'O'){ o1++; }
		if(board[digonal.two[i].charAt(0)][digonal.two[i].charAt(1)]['player'] == 'O'){ o2++; }

		if(x1 == 3 || x2 == 3) anounceWinner('X');
		if(o1 == 3 || o2 == 3) anounceWinner('O');
	}
};

var eventListener = function(e) {
	if (e.target.innerText.length) return;
	if (parseInt(count) % 2 === 0) {
		this.innerText = 'X';
		board[parseInt(this.id[0])][parseInt(this.id[1])]['player'] = 'X';
		board[parseInt(this.id[0])][board.length - 1]['x']++;
		board[board.length - 1][parseInt(this.id[1])]['x']++;
		if (board[parseInt(this.id[0])][board.length - 1]['x'] == 3 || board[board.length - 1][parseInt(this.id[1])]['x'] == 3){
			anounceWinner('X');
		}
		if (isComputer) computer();
	} else {
		this.innerText = 'O';
		board[parseInt(this.id[0])][parseInt(this.id[1])]['player'] = 'O';
		board[parseInt(this.id[0])][board.length - 1]['o']++;
		board[board.length - 1][parseInt(this.id[1])]['o']++;
		if (board[parseInt(this.id[0])][board.length - 1]['o'] == 3 || board[board.length - 1][parseInt(this.id[1])]['o'] == 3) {
			anounceWinner('O');
		}
	}
	checkDigonal();
	count++;
	if(count == 9){
		setTimeout(function () { alert('Draw !!!'); resetBoard(); }, 100);
	}
	console.log(board);
}

var drawBoard = function(){
	for (var i = 0, l = board.length - 1; i < l; i++) {
		for (var j = 0, len = board[i].length - 1; j < len; j++) {
			var sqare = document.createElement('div');
			sqare.id = i + '' + j;
			sqare.style.cssText = 'width: 50px; height: 50px; border: 1px solid #aaa; display: inline-block; float: left; line-height: 1.5; text-align: center; font-size: 2em;';
			sqare.addEventListener('click', eventListener);
			document.getElementById('sketchBoard').appendChild(sqare);
			board[i][j]['box'] = sqare;
		}
		document.getElementById('sketchBoard').appendChild(document.createElement('br'));
	}
}();

var anounceWinner = function(w){
	setTimeout(function () { alert(w + ' win !!!'); resetBoard(); }, 100);
};

var resetBoard = function(){
	count = 0;
	board = [[{}, {}, {}, { x: 0, o: 0 }], [{}, {}, {}, { x: 0, o: 0 }], [{}, {}, {}, { x: 0, o: 0 }], [{ x: 0, o: 0 }, { x: 0, o: 0 }, { x: 0, o: 0 }, { x: 0, o: 0 }]];
	for (var i = 0, l = board.length - 1; i < l; i++) {
		for (var j = 0, len = board[i].length - 1; j < len; j++) {
			document.getElementById(i + '' + j).innerText = '';
			board[i][j]['box'] = document.getElementById(i + '' + j);
		}
	}
};

var computer = function(){
	count++;
	var xlistx = [];
	var xlisty = [];
	var olistx = [];
	var olisty = [];
	var xCountx = 0;
	var xCounty = 0;
	var oCountx = 0;
	var oCounty = 0;
	for(var i = 0, l = board.length-1; i < l; i++){
		xlistx.push(board[i][l].x);
		olistx.push(board[i][l].o);
		xlisty.push(board[l][i].x);
		olisty.push(board[l][i].o);
		// for (var j = 0; j < l; j++){
		// 	console.log(i, j, board[i][j]['player']);
		// 	if(!board[i][j]['player']){
		// 		board[i][j]['player'] = 'O';
		// 		board[i][j]['box'].innerText = 'O';
		// 		board[i][l]['o']++;
		// 		board[l][j]['o']++;
		// 		return;
		// 	}
		// }
	}

	var xMax = Math.max(...xlistx),
		xMaxIndex = xlistx.indexOf(xMax);
	var yMax = Math.max(...xlisty),
		yMaxIndex = xlisty.indexOf(yMax);

	console.log('xlistx list ---> ', xlistx);
	console.log('xlisty list ---> ', xlisty);
	console.log('olistx list ---> ', olistx);
	console.log('olisty list ---> ', olisty);
	console.log('xMax ---> ', xMax, xMaxIndex);
	console.log('yMax ---> ', yMax, yMaxIndex);

	// if (!board[i][j]['player']) {
	// 	board[i][j]['player'] = 'O';
	// 	board[i][j]['box'].innerText = 'O';
	// 	board[i][l]['o']++;
	// 	board[l][j]['o']++;
	// 	return;
	// }
	var finalIndex = null;

	for(var i = 0, l = 3; i < l; i++){
		console.log('xMax ---> ', finalIndex);
		// console.log('finalIndex ---> ', board[finalIndex][i]);
		if (xMax > yMax){
			finalIndex = xMaxIndex;
			if (!board[finalIndex][i]['player']) {
				board[finalIndex][i]['player'] = 'O';
				board[finalIndex][i]['box'].innerText = 'O';
				board[finalIndex][l]['o']++;
				board[l][i]['o']++;
				break;
			}
		} else{
			finalIndex = yMaxIndex;
			if (!board[i][finalIndex]['player']) {
				board[i][finalIndex]['player'] = 'O';
				board[i][finalIndex]['box'].innerText = 'O';
				board[l][finalIndex]['o']++;
				board[l][finalIndex]['o']++;
				break;
			}
		};
	}
};
