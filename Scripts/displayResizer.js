function canSize(){
                   var thonk1;
                   var thonk2;
                   
                   if(true){//window.innerWidth!=canvas.width && window.innerHeight>=canvas.height){
                       /*canvas.width=window.innerWidth;
                       canvas.height=canvas.width/2.021;// 1920/950
                       ctx.scale(canvas.width/1920,canvas.height/950);
                       
                       $('#overlay').css('width',window.innerWidth);
                       $("#overlay").css('height',window.innerWidth/2.021);
                       //$("#overlay").css('background-color','blue');*/
                       
                       thonk1=(window.innerWidth/1920);
                       
                       $('#form').css('transform','scale('+thonk1+','+thonk1+')perspective(1px)');
                       $('#game').css('transform','scale('+thonk1+','+thonk1+')perspective(1px)');
                   }
                   
                   /*if(window.innerHeight<canvas.height){
                       canvas.height=window.innerHeight;
                       canvas.width=canvas.height/.494;
                       ctx.scale(canvas.width/1920,canvas.height/950);
                       
                       $("#overlay").css('height',window.innerHeight);
                       $('#overlay').css('width',window.innerHeight/.494);
                       //$("#overlay").css('background-color','green');
                       
                       thonk2=(window.innerHeight/950);
                       
                       $('#form').css('transform','scale('+thonk2+','+thonk2+')perspective(1px)');
                       
                       //The key to solving this one is definitely in looking at the differences in
                       //how the overlay operates in X>Y and in Y>X
                   }*/
               }