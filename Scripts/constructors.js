 //Thinking about a layer maker function which takes the object array and then turns it into a draw array
 //in which the first entries are the first to be drawn
 
 function Card(p,x,sx,y,sy,w,h,i){
                   this.p=p;
                   this.x=x;
                   this.sx=sx;
                   this.y=y;
                   this.sy=sy;
                   this.w=w;
                   this.h=h;
                   this.i=i;
                   
                   this.clickOn=function(){
                       $('#debug').text(this.x+"/"+this.y);
                       $('#debug2').text(this.sx+"/"+this.sy);
                       this.x=this.sx+(mouseX-oldX);
                       this.y=this.sy+(mouseY-oldY);
                   };
                   
                   this.clickOff=function(){
                       this.sx=this.x;
                       this.sy=this.y;
                       $('#debug').text(this.x+"/"+this.y);
                       $('#debug2').text(this.sx+"/"+this.sy);
                   };
               }
               
               function Sine(p,x,y,w,h,i){
                   this.p=p;
                   this.x=x;
                   this.y=y;
                   this.w=w;
                   this.h=h;
                   this.i=i;
                   
                   this.clickOn=function(){
                       this.p='Assets/Images/UI/Canvas/Buttons/SIcl.png';
                   };
                   
                   this.clickOff=function(){
                       this.p='Assets/Images/UI/Canvas/Buttons/SInocl.png';
                       //alert('To the sign in');
                       $('#overlay').fadeIn('fast');
                   };
                   
                   this.mouseOff=function(){
                       this.p='Assets/Images/UI/Canvas/Buttons/SInocl.png';
                   };
               }
               
               function Play(p,x,y,w,h,i){
                   this.p=p;
                   this.x=x;
                   this.y=y;
                   this.w=w;
                   this.h=h;
                   this.i=i;
                   
                   this.clickOn=function(){
                       this.p='Assets/Images/UI/Canvas/Buttons/QPcl.png';
                   };
                   
                   this.clickOff=function(){
                       this.p='Assets/Images/UI/Canvas/Buttons/QPnocl.png';
                   };
               }