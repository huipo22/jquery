// $(function(){
// 	var $imgs=$(".lists img");
// 	var $link=$(".index li");
// 	var $banner=$(".banner");
// 	var $span=$(".box span")
// 	var index=0;
// 	var t=setInterval(move,2000);
// 	function move(){
// 		console.log(index)
// 		index=(++index==$imgs.length)?index=0:index;
// 		console.log(index)
// 		aa(index)
// 	}
// 	//重复代码  封成函数
// 	function aa(index){
// 		$imgs.css('display','none').eq(index).css('display','block');
// 		$link.removeClass('hot').eq(index).addClass('hot');
// 		$span.html(index+1)
// 	}
// 	$link.click(function(){
// 		index=$(this).index();//必须是  .index();
// 		aa(index)
// 	})
// 	var $left=$(".left");
// 	var $right=$(".right");
// 	$right.click(function(){
// 		move();
// 	})
// 	/*
// 		一直循环
// 		index  0    1
// 		index  1    2
// 		index  2    3
// 		index  3    4
// 		index  4    0

// 		index -1    4
// 		index  4    0
// 		index  3    4
// 		index  2    3
// 		index  1    2
// 		index  0    1
// 	*/
// 	$left.click(function(){
// 		index--;
// 		if(index<0){
// 			console.log(index)
// 			index=$imgs.length-1
// 			console.log(index)
// 		}
// 		aa(index)
// 	})
// 	$banner.mouseover(function(){
// 		clearInterval(t);
// 	})
// 	$banner.mouseout(function(){
// 		t=setInterval(move,2000);
// 	})
// })
$(function(){
	var lists=$(".lists img");
	var links=$(".index li")
	var banner=$(".banner");
	var index=0;
	var span=$(".box span")
	function move(){
		//index=(++index==lists.length?index=0:index);
		index=(++index==lists.length?index=0:index);
		aa();
	}
	function aa(){
		lists.css({display:'none'}).eq(index).css({display:'block'})
		links.removeClass('hot').eq(index).addClass('hot');
		span.html(index+1)
	}
	var t=setInterval(move,2000);

	// banner.mouseover(function(){
	// 	clearInterval(t)
	// })
	// banner.mouseout(function(){
	// 	t=setInterval(move,2000)
	// })
	banner.hover(function(){
		clearInterval(t)
	},function(){
		t=setInterval(move,2000)
	})
	links.click(function(){
		index=$(this).index();
		aa();
	})
	var left=$(".left");
	var right=$(".right");
	left.click(function(){
		index--;
		if(index<0){
			index=links.length-1
		}
		aa();
	})
	right.click(function(){
		move();
	})
})