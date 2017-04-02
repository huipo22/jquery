/**
 * Created by Zhichao Liu on 1/5/2016.
 */
var Game = function () {
    this.clientW = document.documentElement.clientWidth;
    this.clientH = document.documentElement.clientHeight;
    this.letterArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    this.letterLen = 5;
    this.speed = 3;
    this.spans = [];
    this.currArr = [];
    this.currPosArr = [];
    this.dead = 10;
    this.score = 0;
    this.stagePass = 10;
    this.stage = 1;
    this.press = 0;
    this.lifeEl = document.getElementById('life');
    this.scoreEl = document.getElementById('score');
};

Game.prototype = {
    play: function () {//将字母显示到body
        this.getLetter(this.letterLen);
        this.move();
        this.keyPress();
        this.scoreEl.innerHTML = this.score;
        this.lifeEl.innerHTML = this.dead;
    },
    keyPress: function () {
        var that = this;
        document.onkeydown = function (e) {
            var ev = e||window.event;
            var code = String.fromCharCode(ev.keyCode);
            for(var i = 0 ; i < that.spans.length;i++){
                if(that.spans[i].innerHTML == code){
                    document.body.removeChild(that.spans[i]);
                    that.spans.splice(i,1);
                    that.currPosArr.splice(i,1);
                    that.currArr.splice(i,1);
                    that.getLetter(1);
                    that.score++;
                    that.press++;
                    that.scoreEl.innerHTML = that.score;
                    if(that.press == that.stagePass){
                        that.nextStage();
                    }
                    break;
                }
            }
        };
    },
    nextStage:function(){
        clearInterval(this.t);
        for(var i = 0 ; i < this.spans.length;i++){
            document.body.removeChild(this.spans[i]);
        }
        this.spans = [];
        if(this.speed<20){
            this.speed++;
        }
        if(this.letterLen<26){
            this.letterLen++;
        }
        this.press = 0;
        this.stagePass +=5;
        this.currArr = [];
        this.currPosArr = [];
        this.play();
    },
    move:function(){
        var that = this;
        this.t = setInterval(function () {
            for(var i = 0 ; i<that.spans.length;i++){
                var top = that.spans[i].offsetTop+that.speed;
                that.spans[i].style.top = top +'px';
                if (top>that.clientH){
                    document.body.removeChild(that.spans[i]);
                    that.spans.splice(i,1);
                    that.currPosArr.splice(i,1);
                    that.currArr.splice(i,1);
                    console.log(that.currArr,that.currPosArr);
                    that.getLetter(1);
                    that.dead--;
                    that.lifeEl.innerHTML = that.dead;
                    if(that.dead==0){
                        alert('you lose!');
                        this.restart();
                    }
                }
            }
        },50)
    },
    getLetter: function (number) {//获取指定字母
        var letter = this.getRand(number);
        var pos = [];
        for(var i = 0 ; i < letter.length ; i++){
            var span = document.createElement('span');
            span.innerHTML = letter[i];
            var width=30;

            var x = 100+(this.clientW-200)*Math.random();
            var y = Math.floor(Math.random()*100);

            while(this.checkPosition(this.currPosArr,x,width)){
                var x = 100+(this.clientW-200)*Math.random();
            }
            pos.push({minX:x,maxX:x+width});
            this.currPosArr.push({minX:x,maxX:x+width});
            span.style.cssText = 'position:absolute;left:'+x+'px;top:'+y+'px;color:#fff;font-size:50px;width:50px;height:50px';
            document.body.appendChild(span);
            this.spans.push(span);
        }
        return span;
    },
    getRand:function(number){//获取随机字母
        var arr = [];
        for(var i=0;i<number;i++){
            var rand = Math.floor(Math.random()*this.letterArr.length);
            while(this.checkLetter(this.currArr,this.letterArr[rand])){
                rand = Math.floor(Math.random()*this.letterArr.length);
            }
            arr.push(this.letterArr[rand]);
            this.currArr.push(this.letterArr[rand]);
        }
        return arr;
    },
    checkLetter: function (arr, val) {//检测重复字母
        for(var i = 0 ; i<arr.length;i++){
            if(arr[i]==val){
                return true;
            }
        }
        return false;
    },
    checkPosition: function (arr,x,width) {
        for(var i = 0 ; i < arr.length ; i++){
            if(!(x+width<arr[i].minX||arr[i].maxX+width<x)){
                return true;
            }
        }
        return false;
    },
    restart: function () {
        clearInterval(this.t);
        for(var i = 0 ; i < this.spans.length;i++){
            document.body.removeChild(this.spans[i]);
        }
        this.spans = [];
        this.speed = 3;
        this.letterLen = 5;
        this.press = 0;
        this.stagePass = 10;
        this.dead = 10;
        this.score = 0;
        this.currArr = [];
        this.currPosArr = [];
        this.play();
    }
};