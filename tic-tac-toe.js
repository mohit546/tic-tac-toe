var board = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
],
boardSize = 3,
count = 0;

var sketchBoard = document.createElement('div');
sketchBoard.id = 'sketchBoard';
sketchBoard.style.cssText = 'position: absolute; top: 40%; left: 45%;';
document.getElementsByTagName('body')[0].appendChild(sketchBoard);

var eventListener = function(e) {
	if (e.target.innerText.length) return;
	if (parseInt(count) % 2 === 0) {
		this.innerText = 'X';
	} else {
		this.innerText = 'O';
	}
	count++;
	if(count == 9){
		setTimeout(function () { alert('Draw !!!'); resetBoard(); }, 100);
	}
	checkWinner();
}

var drawBoard = function(){
	for (var i = 0, l = board.length; i < l; i++) {
		for (var j = 0, len = board[i].length; j < len; j++) {
			var sqare = document.createElement('div');
			sqare.id = i + '' + j;
			sqare.style.cssText = 'width: 50px; height: 50px; border: 1px solid #aaa; display: inline-block; float: left; line-height: 1.5; text-align: center; font-size: 2em;';
			sqare.addEventListener('click', eventListener);
			document.getElementById('sketchBoard').appendChild(sqare);
		}
		document.getElementById('sketchBoard').appendChild(document.createElement('br'));
	}
}();

var checkWinner = function(){
	var verticalCheck1 = '';
	var verticalCheck2 = '';
	var verticalCheck3 = '';
	var diagonalCheck1 = '';
	var diagonalCheck2 = '';
	var temp = 2;
	for (var i = 0, l = board.length; i < l; i++) {
		var horizontalCheck = '';
		verticalCheck1 = verticalCheck1 + '' + document.getElementById(i + '' + 0).innerText;
		verticalCheck2 = verticalCheck2 + '' + document.getElementById(i + '' + 1).innerText;
		verticalCheck3 = verticalCheck3 + '' + document.getElementById(i + '' + 2).innerText;

		diagonalCheck1 = diagonalCheck1 + '' + document.getElementById(i + '' + i).innerText;
		diagonalCheck2 = diagonalCheck2 + '' + document.getElementById(i + '' + parseInt(temp-i)).innerText;

		for (var j = 0, len = board[i].length; j < len; j++) {
			horizontalCheck = horizontalCheck + '' + document.getElementById(i + '' + j).innerText;
		}

		getCount(horizontalCheck);
		getCount(verticalCheck1);
		getCount(verticalCheck2);
		getCount(verticalCheck3);
		getCount(diagonalCheck1);
		getCount(diagonalCheck2);
	}
}

var getCount = function (word){
	if (word.length == 3) {
		var count = word.split(word[0]).length - 1;
		if (count == 3) {
			anounceWinner(word[0]);
		}
	}
}

var anounceWinner = function(w){
	setTimeout(function () { alert(w + ' win !!!'); resetBoard(); }, 100);
};

var resetBoard = function(){
	count = 0;
	for (var i = 0, l = board.length; i < l; i++) {
		for (var j = 0, len = board[i].length; j < len; j++) {
			document.getElementById(i + '' + j).innerText = '';
		}
	}
};
