 <!-- 
var myWord = {
  	  id: 0 ,
  	  en: "" ,
  	  pn: "" ,
  	  cn: "" ,
      getWord: function(id){
  	    var id = id || this.id ;
  		var wordArr = en6[id].split("/") ;
  		this.en = wordArr[0];
  		this.pn = wordArr[1];
  		this.cn = "" ;
        for (var i=2 ; i < wordArr.length; i++){
           this.cn += wordArr[i] ;
         }
  	  } ,//end of getWord Method
  	 showWord : function(id){
         var id = id || this.id ;
  		      this.getWord(id);
  		 var  enDom = my$("article#word input#en") ;
         var  pnDom = my$("article#word p#pn")  ;
  	     var  cnDom = my$("article#word p#cn") ;
  	     enDom.value = this.en ;
  		 pnDom.textContent = "【" + this.pn + "】";
  		 cnDom.textContent = this.cn ;
  	 } //end of showWord Method
   };//end of myWord Object
  
  //建立一个模型对象，模拟和记录APP的运行状态
  var Model = {
    learnWords : [] , //学习单词的id组成的数组
  	learnId : 0 ,
  	status: "" ,
  	myImages: null ,
    showHelp: function(){
  	 var helpInfoDom = my$("article#help p#textInfo") ;
  	 var helpInfo = "" ;
  	 switch (this.status){
  	  case "" : helpInfo = "You have not set any button of the Menu Bar . " ; break ;
      case "read" : helpInfo = "您选择了 " + "读一读" + "模式  . 已经为您选择20个单词，点击读一读按钮继续学习后续单词." ; break ;
  	  case "write" : helpInfo = "您选择了 " + "写一写" + " 模式 . 输入单词后，点击确认按钮查看结果，点击下一个按钮，切换单词." ; break ;
      case "select" : helpInfo = "您选择了 " + "选一选" + " 模式 . 点击中文选项回答，点击下一个切换单词……" ; break ;
  	  case "search" : helpInfo =  "您选择了 " + "\"搜一搜\"模式！" + "输入你要搜的英文，点击确认按钮，确认搜索词，" + "再点击下一个按钮，就可逐个查看搜到的类似单词." ; break ;
      case "listen" : helpInfo = "您选择了 " + "听一听" + " 模式！.这个功能正在开发中,目前只能听傲慢与偏见的原文朗读…… " ; break ;
  	 }
  	 helpInfoDom.textContent = helpInfo ;
  	 //为每次反馈的帮助，换一个图片背景
  	 var backPicDom =  my$("article#help div#backPic") ;
     var randInt =  Math.floor(Math.random()*5) ;
  	 var childDom = backPicDom.querySelector("img");
     backPicDom.removeChild(childDom);
     backPicDom.appendChild(this.myImages[randInt]);
  	},//End of showHelp
   similarWords: [],
  	nowSimilarId: 0,
  }; //End of  Model 


  
   for (var i=0; i < 20 ; i++){
  	   var randInt = Math.floor(Math.random()*en6.length) ;
       Model.learnWords.push(randInt);
   }//每次循环产生10个随机单词放在 Model 模型中
  
  
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
   
   var sectionHeight =  window.innerHeight - 150 - 50 - 30 ;//让section尽量填满剩余的纵向空间，最后的30这个数字没有依据，仅凭经验来设置为30px。
   document.querySelector("section").style.height = sectionHeight + "px";
   
   //为所有自定义的按钮设定特殊风格
   var Buttons = my$("header nav span");
   for (var i=0; i<Buttons.length ; i++) {
  	   Buttons[i].onclick = function(){
  	     for (var j=0; j<Buttons.length ; j++){
  			 Buttons[j].className = "" ;
			     }
  		this.className = "onclickStyle" ;
  	   };//end of  Buttons[i].onclick
   }
   
   //将图片文件导入内存变量，用Model对象的属性实现访问，每次打开页面或用户点击菜单按钮，则随机在帮助区显现一张图片。
   var myImages = [] ;//图像对象 组成的 数组
   for (var i=1; i<6; i++ ){
  	   var img = new Image();
  	   img.src = "images/fbs" + i + ".jpg" ;
  	   //img.style.opacity = "0.5" ;
  	   myImages.push(img) ;
   }
       Model.myImages = myImages ;//把图片集传给Model对象，提供使用
   var backPicDom =  my$("article#help div#backPic") ;
   var randInt =  Math.floor(Math.random()*5) ;
   backPicDom.appendChild(myImages[randInt]);
  

  /*
   下面统一使用Dom元素的addEventListener API方法，实现事件监听，这是现代Web 浏览器的标准。
   与给Dom元素属性事件赋值相比，addEventListener方法可以对一个事件，反复叠加使用多个函数监听。
   代码在前面使用了对按钮的onclick事件赋值，实现交互样式变化，下面若再对按钮使用onclick事件赋值，则会清除变化样式的函数。
  */
  //每点击读就会显示文字
   
	
  my$("nav span#read").addEventListener("click", function(){
  	 Model.status = this.id ;
  	 Model.showHelp();
	 //每点击读就会显示文字
		var learn = Model.learnWords ;
  		var id = learn[Model.learnId] ;
  		//console.log("en6:" + id);
  		my$("article#word h1").textContent = "NO. " + (Model.learnId+1) + " / " + "单词 ID : "+ id ;
  		myWord.showWord(id);
  		if (Model.learnId + 1 === learn.length){
  			Model.learnId  = 0 ;
  		}else{
  		   Model.learnId ++ ;
  		}
  	  
	 var okDom = my$("section article#word nav span#ok");
 	 okDom.onclick = function(){};//读一读没有确认需求，清除其他模式的，确认按钮代码

  	  var nextDom = my$("section article#word nav span#next");
  	  nextDom.onclick = function(){
  	    var learn = Model.learnWords ;
  		var id = learn[Model.learnId] ;
  		//console.log("en6:" + id);
  		my$("article#word h1").textContent = "NO. " + (Model.learnId+1) + " / " + "单词 ID : "+ id ;
  		myWord.showWord(id);
  		if (Model.learnId + 1 === learn.length){
  			Model.learnId  = 0 ;
  		}else{
  		   Model.learnId ++ ;
  		}
  	  }//end of function nextDom.onclick
  	 },false);//End nav span#read".addEventListener "click"
  
  my$("nav span#write").addEventListener("click", function(){
  	 Model.status = this.id ;
  	 Model.showHelp();

     Model.learnId  = 0 ;
     my$("article#word h1").textContent = "请输入英文单词！" ;
     myWord.getWord(Model.learnWords[Model.learnId]);
     myWord.showWord(Model.learnWords[Model.learnId]);
     my$("article#word input#en").value = "" ;
     var nextDom = my$("section article#word nav span#next");
     var okDom = my$("section article#word nav span#ok");

 	 okDom.onclick = function(){
       var inputEnDom = my$("section article#word input#en");
  	   var inputs = inputEnDom.value.trim() ;
	   if (inputs === myWord.en){
       my$("article#word h1").textContent = "非常正确： " + inputs ;
	  }else{
	   my$("article#word h1").textContent = "错误, 正确： " + myWord.en ;
	  }
  	 }//处理okDom.onclick结束
     nextDom.onclick = function(){
      Model.learnId < Model.learnWords.length - 1 ?  Model.learnId ++ : Model.learnId = 0 ;
      my$("article#word h1").textContent = "请输入英文单词！" ;
      myWord.getWord(Model.learnWords[Model.learnId]);
      myWord.showWord(Model.learnWords[Model.learnId]);
      my$("article#word input#en").value = "" ;
      }//处理空格键结束
  	 },//end of nav span#write click
  	false);//end of 写一写 nav span#write
   
  
  my$("nav span#select").addEventListener("click", function(){
  	 Model.status = this.id ;
  	 Model.showHelp();
     
	 Model.learnId = 0 ;
	 myWord.showWord(Model.learnWords[Model.learnId]);
	 //Model.learnWords是一个数组，存放抽取的20个单词用于的id，（id可以通过myWord对象的getWord(id)和showWord(id)方法使用）
	 my$("article#word h1").textContent = "为英文单词选择正确中文含义！" ;
     var nextDom = my$("section article#word nav span#next");
     var okDom = my$("section article#word nav span#ok");
     okDom.onclick = function(){} ;
     showSelection() ;
    function showSelection(){
	  var parent = my$("article#word p#cn") ;
      parent.textContent = "" ;//清除单词中文区的所有内容
      for (var i=0; i<3 ; i++) {
		  var pDom = document.createElement("p");
          pDom.textContent = "临时文字内容" ;
          parent.appendChild(pDom);
      }
	 var cn = my$("section article#word p#cn p");
     var bingo = Math.floor(Math.random()*3) ;
	 for (var i=0; i<3 ; i++){
		 if (bingo ===i){
			 myWord.getWord(Model.learnWords[Model.learnId]);
			 cn[i].textContent = myWord.cn ;
             cn[i].bingo = "ok" ;
			 en.textContent = myWord.en ;
		 }else{
			 var j = Math.floor(en6.length*Math.random());
			 myWord.getWord(j);
		     cn[i].textContent = myWord.cn ; 
             cn[i].bingo = "wrong" ;
		 }
		 cn[i].onclick = function(){
		    if (this.bingo ==="ok"){
				my$("article#word h1").textContent ="Good! You are right.";
		    }else{
			    my$("article#word h1").textContent ="Sorry, you are wrong!";
			}
		 };//end of 选项 的click
	  }
	  
	  //end of for loop
	}////end of showSelection function
     nextDom.onclick = function(){
	  if (Model.learnId === Model.learnWords.length -1){
       Model.learnId = 0 ;
	  }else{
		  Model.learnId ++ ;
	   }
	   myWord.showWord(Model.learnWords[Model.learnId]);
	   my$("article#word h1").textContent = "为英文单词，选择正确中文含义！" ;
       showSelection();
	  }//nextDom.onclick切换到下一单词
	}//end of select menu 
  	,false);//end of 选一选 nav span#select
  
   
  my$("nav span#search").addEventListener("click", function(){
  	 Model.status = this.id ;
  	 Model.showHelp();
	 
    var inputEnDom = my$("section article#word input#en");
     inputEnDom.value = "" ;
    my$("section article#word p#pn").textContent = "";
	my$("section article#word p#cn").textContent = "";

     my$("article#word h1").textContent = "请输入3个字母以上的搜索词" ;
     my$("article#word input#en").value = "" ;
     var nextDom = my$("section article#word nav span#next");
     var okDom = my$("section article#word nav span#ok");

 	 okDom.onclick = function(){
  	 var inputs = inputEnDom.value.trim() ;
  	  my$("article#word h1").textContent = "你正在搜: " + inputs ;
  	  var  similar = [] ;
  	  for (var i=0; i<en6.length ; i++){
  		  myWord.getWord(i);
  		 
  		  if (myWord.en === inputs || ( inputs.length >=3 && myWord.en.search(inputs)!==-1 ) ) {
  		      //与输入完全匹配      或者  输入3个以上字母的关键字，并能部分匹配
  			  similar.push(i) ;
  		  }
  	  }//end of en6 loop
      Model.similarWords = similar ;

     }//处理okDom.onclick结束
  
      nextDom.onclick = function(){
       	 var i =  Model.nowSimilarId ;
  		 var id = Model.similarWords[i] ;
  		 myWord.showWord(id);  
		if (Model.nowSimilarId <Model.similarWords.length -1){
          Model.nowSimilarId ++ ;
         }else{
  		  Model.nowSimilarId = 0 ;
  		 }
  	    }//处理nextDom.onclick结束
   	 }//end of 匿名函数onclick
  	,false);// 搜一搜
  
  my$("nav span#listen").addEventListener("click", function(){
  	 Model.status = this.id ;
  	 Model.showHelp();
	 my$("article#word h1").textContent = "点击确认钮，可实现音频播放的开/关！" ;
      my$("article#word input#en").value = "Jane Autin" ;
      my$("article#word p#pn").textContent = "Pride And Prejudice" ;
      my$("article#word p#cn").textContent = "原文音频，点击确认" ;
	 var nextDom = my$("section article#word nav span#next");
     var okDom = my$("section article#word nav span#ok");
	var voice = new Audio();
	var i = 1 ;
	var path ="http://lijianhong.top/mp3/pride and prejudice 0" ;
	voice.src = path + i + ".mp3";
	var playing = false;
	var timer = (new Date()).getTime();
	voice.addEventListener("canplaythrough",function(){
	   var timer1 = (new Date()).getTime();
	   var costTime = timer1 - timer ;
	   console.log("canplaythrough 事件发生在 " + costTime +" ms .");
	    },false);
	okDom.onclick = function(){
		    if (!playing) {
              voice.play();
		    }else{
			  voice.pause();
			}
            playing = ! playing ;
		};
    nextDom.onclick = function(){
	  i++ ;
      voice.src = path + i + ".mp3";
	  timer = (new Date()).getTime();
	};
  	},false);//听一听傲慢与偏见的原文朗读音频

   //实现脚步信息，对当前时间反馈
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
  
