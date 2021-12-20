  <!--
  //设计“word对象”的数据结构，并用对象的方法实现初步的代码组织
  //en6为全局变量，由大学英语6级词汇形成字符串，组成数组
   var myWord = {
	  id: 0 ,
	  en: "" ,
	  pn: "" ,
	  cn: "" ,
      getWord: function(id){

	  },//end of getWord Method
	 showWord : function(id){

	 } //end of showWord Method
   };//end of myWord Object

//建立一个模型对象，模拟和记录APP的运行状态
  var Model = {
    learnWords : [] , //学习单词的id组成的数组
	learnId : 0 ,
  }; //End of  Model 


  
   window.onload = function(){
//动态控制UI，包括：针对不同屏幕的字体大小设置，主区域的高度设置
    var fontSize =  Math.floor(window.innerWidth/100) ;
	
	switch (fontSize){
     case 17 :	 case 16 :	 case 15 : 
	 case 14 :	 case 13 : 	 case 12 :
	 case 11 : fontSize =  fontSize*1.5 ; break;
     case 10 : 
     case 9 :  fontSize =  fontSize*1.8 ; break;
     case 8 :  
     case 7 :  fontSize =  fontSize*2 ; break;
     case 6 :  
     case 5 :  fontSize =  fontSize*2.5 ; break;
     case 4 : 
	 case 3 : fontSize =  fontSize*3 ; break;
	 default: fontSize =  fontSize*3; 
	}
	document.body.style.fontSize = fontSize + "px" ;
   
   var sectionHeight =  window.innerHeight - 150 - 50 - 50 ;
   document.querySelector("section").style.height = sectionHeight + "px";
 
 //为所有自定义的按钮设定特殊风格
   var Buttons = my$("nav span");
   for (var i=0; i<Buttons.length ; i++) {
	   Buttons[i].onclick = function(){
	     for (var j=0; j<Buttons.length ; j++){
			 Buttons[j].className = "" ;
	     }
		this.className = "onclickStyle" ;
	   };//end of  Buttons[i].onclick
   }
 
   //每次打开页面，则随机出现一张图片
   var myImages = [] ;//图像对象 组成的 数组
   for (var i=1; i<8; i++ ){
	   var img = new Image();
	   img.src = "images/" + i + ".jpg" ;
	   //img.style.opacity = "0.5" ;
	   myImages.push(img) ;
   }
       Model.myImages = myImages ;//把图片集传给Model对象，提供使用
   var backPicDom =  my$("article#help div#backPic") ;
   var randInt =  Math.floor(Math.random()*7) ;
   backPicDom.appendChild(myImages[randInt]);



 
   //脚步信息，加上当前时间信息
   var myDate = new Date();
   my$("footer").textContent += myDate.getFullYear() +'年' + (myDate.getMonth()+1) +'月' + myDate.getDate() +'日'; 
 
   };//end of window.onload

  /***自定义的通用函数my$：引用Web页上的Dom元素API有二个，querySelectorAll和querySelector，API名称不好拼写，本函数可以合并这二个API的功能，并简化代码的编写****/
  function my$(para){
	if(!para){
	  throw para + " : wrong Selector para,you get nothing !" ;
	}
   var dom = document.querySelectorAll(para) ;
   if (dom.length > 1){
	   console.log("you get Dom Array list reference.");
	   return dom ;
   }else{
     dom = document.querySelector(para) ;
	 if (dom){
       console.log("you get a Dom reference.");
       return dom ;
	 }else{
	   throw para + " : wrong Selector para,you get nothing !" ;
	 }
   }
  }//end of my$
 
  //-->
