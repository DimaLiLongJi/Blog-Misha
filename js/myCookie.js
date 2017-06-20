// 保存cookie
function setCookie(name,value,setdate){
	var mydate=new Date(); //设置保存时间
	mydate.setDate(mydate.getDate()+setdate);
	document.cookie=name+'='+value+';expirse='+mydate;
}

// 获取cookie的value
function getCookie(name){
	var cookieArray=document.cookie.split(';');//将cookie集分为无数数组
	for(var i=0;i<cookieArray.length;i++){
		var cookieName=cookieArray[i].split('=');
		if(cookieName[0]==name){
			return cookieName[1];
		}
	}
	return '';
}

// 删除cookie
function deletCookie(name){
	setCookie(name,-1,-1);
}