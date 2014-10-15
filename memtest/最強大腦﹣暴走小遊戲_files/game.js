window.fbAsyncInit = function() {
    FB.init({
        appId      : '304417756396376',
        xfbml      : true,
        version    : 'v2.0'
    });
    FB.getLoginStatus(function(response) {
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/zh_TW/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var Number;
Number = {
    canClick: false,
    numbers: [],
    createNew: function(index) {
        var number = {
            opened: false,
            index: index
        };
        while (true) {
            var x = Math.floor(Math.random() * 7);
            var y = Math.floor(Math.random() * 7);
            var exist = false;
            for (var i = 0; i < Number.numbers.length; i++) {
                if (Number.numbers[i].isEqual(x, y)) {
                    exist = true;
                    break;
                }
            }
            if (!exist) {
                number.x = x;
                number.y = y;
                break;
            }
        }
        number.isEqual = function (x, y) {
            return (x == number.x && y == number.y);
        };
        var box = number.box = new createjs.Shape();
        box.graphics.beginFill("#d0d0d0").drawRoundRect(number.x * 40 + 2, number.y * 40 + 2, 38, 38, 4);
        box.addEventListener("click", function handleClick(event) {
            if (!Number.canClick)
                return;
            if (Number.check(number.index)) {
                number.opened = true;
                number.showNumber();
                Game.addScore();

                if (number.index == Number.numbers.length - 1) {
                    Game.showNextLevel();
                }

            } else {
                Game.gameOver();
            }

        });
        box.visible = false;
        number.number = new createjs.Text(index + 1, "38px Arial", "#ff7700");
        number.number.textBaseline = "top";
        number.number.x = number.x * 40 + 1;
        number.number.y = number.y * 40 + 1;
        if (number.number.getMeasuredWidth() < 40) {
            number.number.x += (40 - number.number.getMeasuredWidth()) / 2;
        }
        number.number.visible = false;
        number.QM = new createjs.Text("?", "38px Arial", "#ff7700");
        number.QM.x = number.x * 40 + 1;
        number.QM.y = number.y * 40 + 1;
        if (number.QM.getMeasuredWidth() < 40) {
            number.QM.x += (40 - number.QM.getMeasuredWidth()) / 2;
        }
        number.QM.visible = false;
        number.place = function (stage) {
            stage.addChild(number.box);
            stage.addChild(number.number);
            stage.addChild(number.QM);
        };
        number.showNumber = function () {
            number.box.visible = true;
            number.number.visible = true;
            number.QM.visible = false;
            number.number.getStage().update();
        };
        number.showQM = function () {
            number.box.visible = true;
            number.number.visible = false;
            number.QM.visible = true;
            number.number.getStage().update();
        };
        number.remove = function(stage) {
            stage.removeChild(number.box);
            stage.removeChild(number.number);
            stage.removeChild(number.QM);
        };
        return number;
    },
    placeNumbers: function (stage, count) {
        for (var i = 0; i < count; i++) {
            n = Number.createNew(i);
            n.place(stage);
            Number.numbers.push(n);
        }
    },
    showAllNumber: function() {
        for (var i = 0; i < Number.numbers.length; i++) {
            Number.numbers[i].showNumber();
        }
    },
    showAllQM: function() {
        for (var i = 0; i < Number.numbers.length; i++) {
            Number.numbers[i].showQM();
        }
    },
    clear: function(stage) {
        for (var i = 0; i < Number.numbers.length; i++) {
            Number.numbers[i].remove(stage);
        }
        Number.numbers = [];
    },
    check: function(index) {
        var ret = true;
        for (var i = 0; i < index; i++) {
            if (!Number.numbers[i].opened) {
                ret = false;
                break;
            }
        }
        return ret;
    }
};
var Game;
Game = {
    name: "最強大腦",
    link: "http://game.ioxapp.com/memtest/launcher/?f=fb_app",
    picture: 'http://game.ioxapp.com/memtest/icon.jpg',
    caption: "智商拙雞",
    description: '快來測試一下你要不要補腦!',
    score: 0,
    level: 0,
    play: function() {
        $("#index").hide();
        $("#room").show();
    },
    createBackground: function() {
        var background = Game.background = new createjs.Shape();
        background.graphics.beginFill("white").drawRoundRect(0, 0, 282, 282, 4);
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 7; j++) {
                background.graphics.beginFill("#cccccc").drawRoundRect(i * 40 + 2, j * 40 + 2, 38, 38, 4);
            }
        }
        background.x = 0;
        background.y = 0;
        background.visible = false;
        Game.stage.addChild(background);
    },
    createTitle: function() {
        var title_background = Game.title_background = new createjs.Shape();
        title_background.graphics.beginFill("white").drawRoundRect(0, 0, 282, 282, 4);
        title_background.x = 0;
        title_background.y = 0;
        title_background.visible = false;
        title_background.addEventListener("click", function handleClick(event) {
            Game.showNextGame();
        });
        Game.stage.addChild(title_background);
        var tip = Game.tip = new createjs.Text("Tap to start", "24px Arial", "#333333");
        tip.x = (282 - tip.getMeasuredWidth()) / 2;
        tip.y = (282 - tip.getMeasuredHeight()) / 2 + 30;
        tip.visible = false;
        Game.stage.addChild(tip);
        var title = Game.title = new createjs.Text("Level 1", "48px Arial", "#ff3333");
        title.x = (282 - title.getMeasuredWidth()) / 2;
        title.y = (282 - title.getMeasuredHeight()) / 2 - 30;
        title.visible = false;
        Game.stage.addChild(title);
    },
    showNextLevel: function() {
        Game.level += 1;
        Game.title_background.visible = true;
        Game.title.text = "Level " + Game.level;
        Game.title.x = (282 - Game.title.getMeasuredWidth()) / 2;
        Game.title.y = (282 - Game.title.getMeasuredHeight()) / 2 - 30;
        Game.title.visible = true;
        Game.tip.visible = true;
        Number.clear(Game.stage);
        Game.stage.update();
    },
    showNextGame: function() {
        Game.title_background.visible = false;
        Game.title.visible = false;
        Game.tip.visible = false;
        Game.background.visible = true;
        Number.clear(Game.stage);
        Number.placeNumbers(Game.stage, Game.level + 2);
        Number.showAllNumber();
        Game.stage.update();
        Number.canClick = false;
        setTimeout(function() {
            Number.showAllQM();
            Number.canClick = true;
        }, 1500 + (Game.level - 1) * 100);
    },
    addScore: function() {
        Game.score += Game.level;
        $("#lv").html("SCORE:" + Game.score);
    },
    gameOver: function() {
        $("#room").hide();
        $("#dialog").show();
        if (Game.score < 20) {
            $("#game-result").html("You got " + Game.score + " , look like 80 years old.");
        } else if (Game.score < 40) {
            $("#game-result").html("You got " + Game.score + " , look like 70 years old.");
        } else if (Game.score < 80) {
            $("#game-result").html("You got " + Game.score + " , look like 60 years old.");
        } else if (Game.score < 100) {
            $("#game-result").html("You got " + Game.score + " , look like 50 years old.");
        } else if (Game.score < 160) {
            $("#game-result").html("You got " + Game.score + " , look like 40 years old.");
        } else if (Game.score < 240) {
            $("#game-result").html("You got " + Game.score + " , look like 30 years old.");
        } else {
            $("#game-result").html("You got " + Game.score + " , very great!");
        }
        Game.caption = "我在最強大腦中得了" + Game.score + "分，你敢來挑戰麼？脑残不能等，赶紧补起来！";
    },
    share: function() {
        FB.ui({
            method: 'feed',
            name: Game.name,
            link: Game.link,
            picture: Game.picture,
            caption: Game.caption,
            description: Game.description
        }, function(response) {});
    },
    restart: function() {
        Game.level = 0;
        Game.score = 0;
        $("#lv").html("SCORE:" + Game.score);
        Game.showNextLevel();
        Game.stage.update();
        $("#dialog").hide();
        $("#room").show();
    }
};
function loadGame() {
    var stage = Game.stage = new createjs.Stage("gameCanvas");
    createjs.Touch.enable(stage);
    Game.createBackground();
    Game.createTitle();
    Game.showNextLevel();

    stage.update();
}

Zepto(function($){
    $("#play-btn").click(function() {
        Game.play();
    });
    $("#btn-share").click(function() {
        Game.share();
    });
    $("#btn-restart").click(function() {
        Game.restart();
    });
    loadGame();
});
