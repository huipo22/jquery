$.extend({
	trim:function(str,m){
		var m=m||"both";
		if(m=="both"){
			return str.replace(/^\s*|\s*$/g,'');
		}else if(m=="left"){
			return str.replace(/^\s*/g,'')
		}else if(m=="right"){
			return str.replace(/\s*$/g,'')
		}else if(m=="all"){
			return str.replace(/\s*/g,'')
		}
	}
})