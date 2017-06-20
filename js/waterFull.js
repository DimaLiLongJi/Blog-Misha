//waterFall
//获取图片容器的宽度自适应大小
function waterFall(parentId,classname){//parentId为父容器，classname为子元素的classname

	// 找到高度最低图片的位置
	var getminheightLocation=
		function (boxHeightArr,minHeight){
			for (var i in boxHeightArr){//如果高度存在盒子，返回i
				if(boxHeightArr[i]==minHeight){
					return i;
				}
			}
		}

	// 获取classname
	var getByClassName=
		function (parentId,classname){
			var result=[];
			var parentele=document.getElementById(parentId);
			eleall=parentele.getElementsByTagName("*");
			for (var i=0;i<eleall.length;i++) {
				if (eleall[i].className==classname) {
					result.push(eleall[i]);
				}
			}
			return result;
		}



	// 根据屏幕尺寸改变float的行数最后改变父容器width
	var contentAll=getByClassName(parentId,classname); //获取图片div
	var imgWidth=contentAll[0].offsetWidth;//图片框的宽度
	var scerrnwidth=document.documentElement.clientWidth||document.body.clientWidth;
	var num=Math.floor(scerrnwidth/imgWidth);//一排的宽度
	var parent=document.getElementById(parentId)
	parent.style.width=imgWidth*num+"px";//整个图片容器的宽度：图片个数乘以图宽；
	parent.style.position="relative";
	// 得到每张图的高度
	var boxHeightArr=[]; // 得到每张图的高度
	for(var i=0;i<contentAll.length;i++){
		if(i<num){ //i为1排的个数，将第一排的高度存储
			boxHeightArr[i]=contentAll[i].offsetHeight; //将图片大小存储与数组中
		}else{
			var minheight=Math.min.apply(null,boxHeightArr);//得到第一排最小高度
			var minIndex=getminheightLocation(boxHeightArr,minheight);//获取最低位置的那个i
			contentAll[i].style.position="absolute"; //设置图片position为absolu
			contentAll[i].style.top=minheight+"px";//top:最小图片的 高度
			contentAll[i].style.left=contentAll[minIndex].offsetLeft+"px"; //left为其图片的offseLeft
			boxHeightArr[minIndex]=boxHeightArr[minIndex]+contentAll[i].offsetHeight; //最后上面1张加下面一张的图的 高度相加成为新的高度，则minheight换成下一个了
		}
		

	}

}



// 滚动到最后自动加载的flag

function scrolldownCheckFlag(parentId,classname){ //

	// 获取classname
	var getByClassName=
		function (parentId,classname){
			var result=[];
			var parentele=document.getElementById(parentId);
			eleall=parentele.getElementsByTagName("*");
			for (var i=0;i<eleall.length;i++) {
				if (eleall[i].className==classname) {
					result.push(eleall[i]);
				}
			}
			return result;
		}


	


	// 先获得加载到最后一章图片距离顶部的高度
	var parent=document.getElementById(parentId);

	var ccontent=getByClassName(parentId,classname);
	var lastContentHeight=ccontent[ccontent.length-1].offsetTop;
	// console.log(lastContentHeight);

	//
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//被卷上的高度
	var pageHeight=scrollTop+document.documentElement.clientHeight || scrollTop+document.body.clientHeight;//获取屏幕可视区加上上方卷起高度之和
	// console.log(pageHeight);
	if(lastContentHeight<pageHeight){//如果最后一张图的高度开始等于小于页面高度的时候，就可以加载了
		return true;
	}else{
		return false;
	}
}

