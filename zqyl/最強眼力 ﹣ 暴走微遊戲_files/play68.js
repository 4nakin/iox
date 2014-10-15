var moreGamesLocation = 'http://112.124.100.147/game.html';

function play68_init() {
	updateShare(0);
}

function updateShare(bestScore) {
	imgUrl = 'http://game.9g.com/zqyl/icon.png';
	lineLink = 'http://112.124.100.147/zqyl/';
	descContent = "考考你的眼力！你的眼睛跟得上嗎？";
	updateShareScore(bestScore);
	appid = '';
}

function updateShareScore(bestScore) {
	if(bestScore > 0) {
		shareTitle = "我玩《最強眼力》過了" + bestScore + "關，眼都花了！";
	}
	else{
		shareTitle = "不玩《最強眼力》怎麼知道自己的眼力原來這麼好？";
	}
}