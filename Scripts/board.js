            $('.wCard').click(function() {
                console.log('Weapons card clicked');
            });
            $('.wHolder').click(function() {
                console.log('Weapons card clicked');
            });
            //This'll work, just change the character effect trigger to the iCard itself instead of phCard, then just
            //have an if that checks if it's an a pHcard
            
            
            dragInit();
            var SB=0;
            var sbPlus = 0;
            
            $('#endMsg').hide(); 
            $('#startG').hide();
            
            $('.startG').click(function() {
                $(this).fadeOut('fast');
                $('.host').fadeOut('fast');
                $('#setOpen').fadeOut('fast');
                $('#pSet').fadeIn('fast');
                Gconn.send('Start game');
                
                boardReset();
                
                $('#game').hide();
                $('#overlay').fadeOut('fast', function() {
                    console.log(hOt);
                    if (hOt == 'heads') {
                        decideCoin();

                        var coinData = {
                            'dataType': 'coin',
                            'coinNum': rNum
                        };
                        Gconn.send(coinData);
                    }
                });
            });
            
            $('#startGQP').click(function() {
                $('#pInfo').show();
                $('#pName').hide();
                $('#pLevel').hide();
                $('#pMon').hide();
            
                $('#pSet').fadeIn('fast');
            });
            
            //Overlay-------------//
            $('#accept').hide();
            $('#host').hide();
            $('#conn').hide();
            
            //Select
            $('.chHost').click(function() {
                $('#choose').fadeOut('fast',function(){
                    $('#host').fadeIn('fast');
                });
                hOt='heads';
            });
            
            $('.chConn').click(function() {
                $('#choose').fadeOut('fast',function(){
                    $('#conn').fadeIn('fast');
                });
                hOt='tails';
            });
            
            //Host
            $('#hostBK').click(function() {
                $('#host').fadeOut('fast',function(){
                    $('#choose').fadeIn('fast');
                });
            })
            $('#accept').click(function(){
                var conn=peer.connect(connTo); //Connecting to peer
                Gconn=conn;
                
                $(this).fadeOut('fast',function(){
                   $('#startG').delay(250).fadeIn('fast'); 
                });
            });
            
            //Conn
            $('#connBTN').click(function() {
                connTo=$('#conn_tBox').val();
                
                var conn=peer.connect(connTo); //Connecting to peer
                Gconn=conn;
                
                Gconn.send('test');
            });
            
            $('#connBK').click(function() {
                $('#conn').fadeOut('fast',function(){
                    $('#choose').fadeIn('fast');
                });
                $('#conn')
            });
            //--------------------//
            
            //Battle-------------//
            function flowStarter() {
                console.log(eHandCards);
                dragInit();
                bDeckCheck();
                
                if(sbPlus==0){
                    sbPlus=sbPlus+2;
                }
                else{
                    sbPlus=sbPlus+1;
                }
            
                SB = 0 + sbPlus;
                
                for(var x=0;x<handCards.length;x++){
                    if(handCards[x].weapon!='' &&handCards[x].weapon!=undefined){
                        SB=SB-weapons[handCards[x].weaponNum].SB;
                    }
                }
                
                $('#pSB').text(SB);
            
                Gconn.send({ 'dataType': 'SBchange', 'amount': SB });
                
                console.log('In flowStarter about to decide Turns');
                if (hOt == 'heads' && rNum==1){
                    startTurn();
                    
                    enableGo();
                }
                if(hOt=='heads' && rNum==2){
                    stopTurn();
                }
                
                if(hOt=='tails' && rNum==1){
                    stopTurn();
                }
                if(hOt=='tails' && rNum==2){
                    startTurn();   
                        
                    enableGo();
                }
                console.log('done');
                endCheck();
            }
            
            function go(){
                if(hOt=='heads' && rNum==1){
                    Gconn.send('Your turn');
                }
                if(hOt=='heads' && rNum==2){
                    Gconn.send({'dataType':'Battle','first':'P'});
                    
                    battleE();
                }
                
                if(hOt=='tails' && rNum==1){
                    Gconn.send({'dataType':'Battle','first':'P'});
                    
                    battleE();
                }
                if(hOt=='tails' && rNum==2){
                    Gconn.send('Your turn');  
                }
                stopTurn();
            }
            
            $('#coin').hide();
            
            function decideCoin() {
                if (hOt=='heads') {
                    rNum = Math.floor((Math.random() * 2) + 1);
                }
                
                coinFlipper();
            }
            
            function offsetInit() {
                pOffsets = [
                    $('#pHand').children('#c1').offset(),
                    $('#pHand').children('#c2').offset(),
                    $('#pHand').children('#c3').offset(),
                    $('#pHand').children('#c4').offset(),
                    $('#pHand').children('#c5').offset()
                ];
            
                eOffsets = [
                    $('#eHand').children('#c1').offset(),
                    $('#eHand').children('#c2').offset(),
                    $('#eHand').children('#c3').offset(),
                    $('#eHand').children('#c4').offset(),
                    $('#eHand').children('#c5').offset()
                ];
            }
            
            function coinFlipper() {
                bMusic();
                connecting.pause();
                
                aDeckInit();
                bDeckCheck();
                wDeckInit();
                eDeckInit();
                
                var cInt;
                var cY = 0;
                var coinDom = $('#coin');
                var flip = 1;
                coinFlip();
            
                function coinFlip() {
                    coinDom.fadeIn(1000, function() { cInt = setInterval(coinAnim, 3); });
                }
            
                function coinAnim() {
                    var stopSide=0;
                    
                    if(rNum==1){
                        stopSide=720;
                    }
                    if(rNum==2){
                        stopSide=540;
                    }
                    
                    if (cY >= stopSide) {
                        clearInterval(cInt);
                        flip = 1;
                        coinDom.delay(1000).fadeOut(500,function(){cY=0;flowStarter();});
                        //offsetInit();
                    }
                    else {
                        coinDom.css({ transform: 'rotateY(' + cY + 'deg)' });
            
                        cY = cY + 1;
                    }
                    if (cY % 180 != 0 && cY % 90 == 0) {
                        if (flip % 2 == 0) {
                            coinDom.css('background-image', 'url("Assets/Images/Board/coin/heads.png")');
                        }
                        else {
                            coinDom.css('background-image', 'url("Assets/Images/Board/coin/tails.png")');
                        }
                        flip = flip + 1;
                    }
                }
            }
            
            function rollDie(){
                var result=(Math.random() * 10) + 1;
                return result;
            }
            
            function dragInit(){
                 $('.eCard').draggable({
                    stack: '.card',
                    scroll: false,
                    /*,containment:'body'*/
                    snap: '.phCard',
                    snapMode: 'inner',
                    revert: true
                });
            
                /*$('.tCard').draggable({
                    stack: '.card',
                    scroll: false,
                    /*,containment:'body
                    snap: '.pHolder',
                    snapMode: 'inner',
                    revert: true
                });*/
            
                $('.wCard').draggable({
                    stack: '.card',
                    scroll: false,
                    /*,containment:'body'*/
                    snap: '.phCard',
                    snapMode: 'inner',
                    revert: true
                });
            }
            
            function stopTurn(){
                $('#opponentMov').animate({left:0},'fast');
                
                //$('.tCard').draggable('disable');
                $('.wCard').draggable('disable');
                $('.eCard').draggable('disable');
                
                $('#effects').animate({'left':-255});
                $('#weapons').animate({'left':-520});
                $('#characters').animate({'right':-256});
                
                $('#effects').unbind('mouseenter mouseleave')
                $('#weapons').unbind('mouseenter mouseleave')
                $('#characters').unbind('mouseenter mouseleave')
            }
            
            function startTurn() {
                $('#characters').mouseenter(function() {
                    $(this).stop();
                    $(this).animate({ right: '0px' }, 'slow');
                });
                $('#characters').mouseleave(function() {
                    $(this).stop()
                    $(this).animate({ right: '-160px' }, 'slow');
                });
            
                $('#weapons').mouseenter(function() {
                    $(this).stop();
                    $(this).animate({ left: '0px' }, 'slow');
                });
                $('#weapons').mouseleave(function() {
                    $(this).stop();
                    $(this).animate({ left: '-422px' }, 'slow');
                });
            
                $('#effects').mouseenter(function() {
                    $(this).stop();
                    $(this).animate({ left: '0px' }, 'slow');
                });
                $('#effects').mouseleave(function() {
                    $(this).stop();
                    $(this).animate({ left: '-160px' }, 'slow');
                });
                $('#opponentMov').animate({left:-205},'fast');
                
                //$('.tCard').draggable('enable');
                $('.wCard').draggable('enable');
                $('.eCard').draggable('enable');
            
                $('.pHolder').droppable({
                    accept: '.tCard',
                
                    drop: function(event, ui) {
                        if ($(this).parent().attr('class') != 'card ehCard') {
                            var cIndex = ($(this).parent().index()) - 1;
                            var cNum = $(ui.draggable).text();
                            var node1 = ('<div class="pHolder"></div>');
                
                            if (SB > 0) {
                                //use card.type to account for wokes
                                handCards[cIndex].cardID = bDeckCards[cNum].cardID;
                                handCards[cIndex].type = bDeckCards[cNum].type;
                                handCards[cIndex].name = bDeckCards[cNum].name;
                                handCards[cIndex].gender = bDeckCards[cNum].gender;
                                handCards[cIndex].img = bDeckCards[cNum].img;
                                handCards[cIndex].HP = bDeckCards[cNum].HP;
                                handCards[cIndex].AP = bDeckCards[cNum].AP;
                                handCards[cIndex].DP = bDeckCards[cNum].DP;
                                handCards[cIndex].SB = bDeckCards[cNum].SB;
                                handCards[cIndex].attack = bDeckCards[cNum].attack;
                                handCards[cIndex].effect = bDeckCards[cNum].effect;
                                handCards[cIndex].weapon = bDeckCards[cNum].weapon;
                                handCards[cIndex].actEffect = bDeckCards[cNum].actEffect;
                
                                bDeckCards.splice(cNum, 1, 'pHolder');
                
                                var card = handCards[cIndex];
                                updateStats($(this), cIndex, card.HP, card.DP, card.AP);
                                $(ui.draggable).children().children('.data').text(cIndex);
                                $(this).replaceWith($(ui.draggable).children()); //fix this
                                $(ui.draggable).append(node1);
                                //$(ui.draggable).draggable('disable'); This is to fix the tCards no longer being draggable, which was cause by turning off the ability to reenable draggables
                
                                enableGo(); //PeerJS
                                var cardData = {
                                    'dataType': 'cardPlace',
                                    'card': handCards[cIndex].cardID,
                                    'place': cIndex
                                };
                
                                Gconn.send(cardData); //SB
                                SB = SB - 1;
                                $('#pSB').text(SB);
                                Gconn.send({
                                    'dataType': 'SBchange',
                                    'amount': SB
                                });
                                placeCard.play();
                            }
                        }
                    }
                });
                $('#effects').animate( {
                    'left': -160
                }
                );
                $('#weapons').animate( {
                    'left': -422
                }
                );
                $('#characters').animate( {
                    'right': -160
                }
                );
            }
            
            function battleP(){
                battleParams={
                'playerDom':battleStuff[0],
                'playerOff':battleStuff[1],
                'targetDom':battleStuff[2],
                'targetOff':battleStuff[3],
                'type':'P'
                };
                
                battle();
            }
            
            function battleE(){
                battleParams={
                'playerDom':battleStuff[2],
                'playerOff':battleStuff[3],
                'targetDom':battleStuff[0],
                'targetOff':battleStuff[1],
                'type':'E'
                };
                
                battle();
            }
            
            $('#go').hide();
            function enableGo(){
                var check=handCheck();
                
                if(check==true){
                    $('#go').fadeIn('fast');
                }
                if(check==false){
                    $('#go').fadeOut('fast');
                }
            }
            
            $('#go').click(function() {
                go();
                $('#go').fadeToggle('fast');
                //turn over turn to other player or go into battle
            })
            
            function handCheck(){
                var gt=0;
                for(var x=0;x<5;x++){
                    if(handCards[x].cardID!='pHolder'){
                        return true;
                    }
                    else{
                        gt++;
                    }
                }
                if(gt==5){
                    return false;
                }
            }
            
            //During battle
            //--------------------------------//
            $('#effects').css('left',-255);
            $('#weapons').css('left',-520);
            $('#characters').css('right',-256);
            
            var aDeckCards=[];
            var bDeckCards=['pHolder','pHolder','pHolder','pHolder'];
            var handCards=[new gCard('pHolder'),new gCard('pHolder'),new gCard('pHolder'),new gCard('pHolder'),new gCard('pHolder')];
            var pDom=[
                $('#pHand').children('#c1'),
                $('#pHand').children('#c2'),
                $('#pHand').children('#c3'),
                $('#pHand').children('#c4'),
                $('#pHand').children('#c5')
            ];
            var pOffsets=[
                $('#pHand').children('#c1').offset(),
                $('#pHand').children('#c2').offset(),
                $('#pHand').children('#c3').offset(),
                $('#pHand').children('#c4').offset(),
                $('#pHand').children('#c5').offset()
            ];
            
            var eHandCards=[new gCard('pHolder'),new gCard('pHolder'),new gCard('pHolder'),new gCard('pHolder'),new gCard('pHolder')];
            var eDom=[
                $('#eHand').children('#c1'),
                $('#eHand').children('#c2'),
                $('#eHand').children('#c3'),
                $('#eHand').children('#c4'),
                $('#eHand').children('#c5')
            ];
            var eOffsets=[
                $('#eHand').children('#c1').offset(),
                $('#eHand').children('#c2').offset(),
                $('#eHand').children('#c3').offset(),
                $('#eHand').children('#c4').offset(),
                $('#eHand').children('#c5').offset()
            ];
            
            var purgatory=[];
            
            var battleStuff=[pDom,pOffsets,eDom,eOffsets];
            
            var wDeck=['pHolder','pHolder','pHolder'];
            var eDeck=['pHolder','pHolder','pHolder','pHolder'];
            
            function gCard(cardID, type, name, gender, img, HP, AP, DP, SB, attack, effect, weapon, actEffect) {
                this.cardID = cardID;
                this.type = type;
                this.name = name;
                this.gender = gender;
                this.img = img;
                this.HP = HP;
                this.AP = AP;
                this.DP = DP;
                this.SB = SB;
                this.attack = attack;
                this.effect = effect;
                this.weapon = weapon;
                this.actEffect = actEffect;
            }
            
            function aDeckInit(){
                console.log(pSession);
                for(var x=0;x<pSession.cDeck.length;x++){
                    aDeckCards[x]=pSession.cDeck[x];
                }
            }
            
            function aDeckRandom(){
                for(var x=0;x<10;x++){
                    var rNum=Math.floor((Math.random() * 6) + 0);
                    
                    aDeckCards[x]=cards[rNum];
                }
            }
            
            function eAdder(eP, eC) {
                console.log(eHandCards);
                eHandCards[eP].cardID = cards[eC].cardID;
                eHandCards[eP].type = cards[eC].type;
                eHandCards[eP].name = cards[eC].name;
                eHandCards[eP].gender = cards[eC].gender;
                eHandCards[eP].img = cards[eC].img;
                eHandCards[eP].HP = cards[eC].HP;
                eHandCards[eP].AP = cards[eC].AP;
                eHandCards[eP].DP = cards[eC].DP;
                eHandCards[eP].SB = cards[eC].SB;
                eHandCards[eP].attack = cards[eC].attack;
                eHandCards[eP].effect = cards[eC].effect;
                eHandCards[eP].weapon = cards[eC].weapon;
                eHandCards[eP].actEffect = cards[eC].actEffect;
                eHandCards[eP].efDef = cards[eC].efDef;
                
                updateStats(eDom[eP].children(),eP,eHandCards[eP].HP,eHandCards[eP].DP,eHandCards[eP].AP);
                eHand();
            }
            
            function bDeckCheck(){
                console.log('bTest');
                var tDeck=$('#tCont');
                
                for(var x=0;x<4;x++){
                    console.log('bTest2');
                    if(tDeck.children('#c'+(1+x)).children().attr('class')=='pHolder'){//'background-image:url('"+aDeckCards[aDeckCards.length-1].img+"')'
                    console.log('bTest3');
                    console.log(aDeckCards.length);
                        if(aDeckCards.length>0){
                            bDeckCards[x]=aDeckCards[aDeckCards.length-1];
                            /*tDeck.children('#c'+(1+x)).children().replaceWith("<div title='"+aDeckCards[aDeckCards.length-1].name+"&#013; HP "+aDeckCards[aDeckCards.length-1].HP+"|DP "+aDeckCards[aDeckCards.length-1].DP+"|AP "+aDeckCards[aDeckCards.length-1].AP+" &#013;&#013;"+aDeckCards[aDeckCards.length-1].efDef+"' style='background-image:url("+aDeckCards[aDeckCards.length-1].img+");' class='iCard charCard pCard'><span class='data'>"+x+"</span></div>");*/
                            tDeck.children('#c'+(1+x)).children().replaceWith("<div title='"+aDeckCards[aDeckCards.length-1].name+"&#013; HP "+aDeckCards[aDeckCards.length-1].HP+"|DP "+aDeckCards[aDeckCards.length-1].DP+"|AP "+aDeckCards[aDeckCards.length-1].AP+"' style='background-image:url("+aDeckCards[aDeckCards.length-1].img+");' class='iCard charCard pCard'><span class='data'>"+x+"</span></div>");
                            aDeckCards.splice(aDeckCards.length-1,1);
                            
                            //$(tDeck.children('#c'+(1+x))).draggable('destroy');
                            $(tDeck.children('#c'+(1+x))).draggable({
                                stack:'.card',
                                scroll:false,
                                /*,containment:'body'*/
                                snap:'.pHolder',
                                snapMode:'inner',
                                revert:true
                            });
                        }
                    }
                }
            }
            
            function wDeckInit(){
                for(var x=0;x<3;x++){
                    if(pSession.wDeck[x]!=undefined){
                        wDeck[x]=pSession.wDeck[x];
                        
                        //Now add the cards graphically
                        $('#weapons').children('#c'+(x+1)).children().replaceWith("<div title='"+wDeck[x].desc+"' style='background-image:url("+wDeck[x].img+");' class='iCard'><span class='data'>"+wDeck[x].wID+"</span></div>");
                    }
                }
            }
            
            function eDeckInit(){
                 for(var x=0;x<4;x++){
                    if(pSession.eDeck[x]!=undefined){
                        eDeck[x]=pSession.eDeck[x];
                        
                        //Now add the cards graphically
                        $('#effects').children().children('#c'+(x+1)).children().replaceWith("<div title='"+eDeck[x].desc+"' style='background-image:url("+eDeck[x].img+");' class='iCard'><span class='data'>"+eDeck[x].eID+"</span></div>");
                    }
                }
            }
            
            var battleX=0;
            var battleY=0;
            var battleParams={
                'playerDom':'',
                'playerOff':'',
                'targetDom':'',
                'targetOff':'',
                'type':''
            };
            var lastType;
            
            function buff(type,cIndex,stat,amount){
                statI.play();
                var cCard;
                
                if(type=='P'){
                    cCard=handCards[cIndex];
                }
                if(type=='E'){
                    cCard=eHandCards[cIndex];
                }
                
                if(stat=='health'){
                    cCard.HP+=amount;
                }
                if(stat=='defense'){
                    cCard.DP+=amount;
                }
                if(stat=='attack'){
                    cCard.AP+=amount;
                }
                
                if(type=='P'){
                    updateStats(pDom[cIndex].children(),cIndex,cCard.HP,cCard.DP,cCard.AP);
                }
            }
            
            function battle() {
                var playerDom = battleParams.playerDom;
                var playerOff = battleParams.playerOff;
                var targetDom = battleParams.targetDom;
                var targetOff = battleParams.targetOff;
                var type = battleParams.type;
                
                var distance = 0;
                
                var cPlayer;
                var cEnemy;
            
                if (type == 'P') {
                    distance = -270;
                    cPlayer = handCards[battleX];
                    cEnemy = eHandCards[battleY];
                }
                if (type == 'E') {
                    distance = 270;
                    cPlayer = eHandCards[battleX];
                    cEnemy = handCards[battleY];
                }
            
                if (battleX < 5) { //Check every card using the Y loop, which will call the X loop again at it's end
                    var currentC = playerDom[battleX];
            
                    if (playerDom[battleX].children().attr('class') != 'pHolder ui-droppable'){ //As long as the player is a card
                        if (battleY < 5) { //Y loop
                            
                            if (targetDom[battleY].children().attr('class') != 'pHolder ui-droppable') { //As long as the opponent is a card
                                var tt = targetDom[battleY];
            
                                currentC.animate({ //Animate the card and
                                        top: targetOff[battleY].top - ((playerOff[battleX].top) + distance),
                                        left: targetOff[battleY].left - (playerOff[battleX].left)
                                    }, 500,function(event,cPl=cPlayer,t=type,cE=cEnemy,eID=cEnemy.cardID,tD=tt){
                                        attack(cPl,type,cE,eID,tD
                                        );
                                        
                                        if(cEnemy.HP<=0){
                                            console.log('This enemy has been knocked out: '+type);
                                            
                                            cardKO(battleY,type);
                                        }
                                        
                                        battleY++;
                                        battle();
                                        return;
                                    }
                                ).delay(500);
                            }
                            else {//As long as the opponent is not a card
                                battleY++;
                                battle();
                                return;
                            }
                        }
                        if (battleY == 5) { //Exit Y loop and step through X loop
                            currentC.animate({
                                top: 0,
                                left: 0
                            }, 500, function() {
                                battleY = 0;
                                battleX++;
                                battle();
                                return;
                            });
                        }
                    }
                    else { //If the player is not a card
                        battleX++;//Skip to the next player card
                        battle();
                        return;
                    }
                }
                if (battleX == 5) { //Exit X loop/end function. Once all card places have been checked
                    
                    battleX = 0;
                    battleParams={
                        'playerDom':'',
                        'playerOff':'',
                        'targetDom':'',
                        'targetOff':'',
                        'type':''
                    };
                    
                    if(hOt=='heads' && rNum==1 && type=='P' || hOt=='tails' && rNum==2 && type=='P'){
                        battleE();
                    }
                    if(hOt=='heads' && rNum==2 && type=='E' || hOt=='tails' && rNum==1 && type=='E'){
                        battleP();
                    }
                    
                    if(hOt=='heads' && rNum==1 && type=='E' || hOt=='tails' && rNum==2 && type=='E'){
                        flowStarter();
                    }
                    if(hOt=='heads' && rNum==2 && type=='P' || hOt=='tails' && rNum==1 && type=='P'){
                        flowStarter();
                    }
                    
                    return;
                }
            }
            
            function attack(attacker,attackerType,target,targetID,tDom){
                attackSfx.play();
                
                var rDamage=attacker.AP;
                var tIndex=(tDom.index());
                
                if(attackerType=='E'){
                 tIndex--;
                }
                if(attacker.weapon!='Safety Scissors'){
                    rDamage=rDamage-target.DP;
                }
                if(attacker.weapon=='Safety Scissors'){
                }
                
                else if(attacker.actEffect=='intimidate'){
                    rDamage-(target.DP/2);
                }
                
                else if(attacker.weapon=='Chemicals'){
                    rDamage-(target.DP-(target.DP-cards[targetID]));
                }
                
                else if (attacker.weapon=='God Card'){
                    rDamage=999;
                }
                
                if(attackerType=='P'){
                    eHandCards[tIndex].HP-=rDamage;
                    updateStats(tDom.children(),tIndex,eHandCards[tIndex].HP,target.DP,target.AP);
                    
                    return;
                }
                if(attackerType=='E'){
                    handCards[tIndex].HP=handCards[tIndex].HP-rDamage;
                    
                    updateStats(tDom.children(),tIndex,handCards[tIndex].HP,target.DP,target.AP);
                    
                    return;
                }
            }
            
            function cardKO(index,type){
                var KOcard;
                
                if(type=='E'){
                    KOcard=handCards[index];
                    var cID=KOcard.cardID;
                    
                    purgatory.splice(0,0,cards[cID]);
                    handCards.splice(index,1,new gCard('pHolder'));
                    
                    $('#pStack').prepend("<div class='ppHolder'></div>");
                    $('#pStack').children().replaceWith($('#pHand').children('#c'+(index+1)).children());
                    
                    $('#pHand').children('#c'+(index+1)).append("<div class='pHolder ui-droppable'></div>");
                    $('#pHand').children('#c'+(index+1)).append("<div class='wHolder'><div></div></div>");
                    $('#pStats').children('#ps'+(index+1)).children('.sHp').text("000");
                    $('#pStats').children('#ps'+(index+1)).children('.sDp').text("00");
                    $('#pStats').children('#ps'+(index+1)).children('.sAp').text("00");
                }
                if(type=='P'){
                    KOcard=eHandCards[index];
                    
                    eHandCards.splice(index,1,new gCard('pHolder'));
                    
                    $('#eStack').prepend("<div class='ppHolder'></div>");
                    $('#eStack').children().replaceWith($('#eHand').children('#c'+(index+1)).children());
                    
                    $('#eHand').children('#c'+(index+1)).append("<div class='pHolder ui-droppable'></div>");
                    $('#eStats').children('#es'+(index+1)).children('.eHp').text("000");
                    $('#eStats').children('#es'+(index+1)).children('.eDp').text("00");
                    $('#eStats').children('#es'+(index+1)).children('.eAp').text("00");
                }
            }
            
            function endCheck(){
                var total=0;
                
                console.log(aDeckCards);
                console.log(bDeckCards);
                for(var x=0;x<4;x++){
                    if(bDeckCards[x]!='pHolder'){
                        total=total+1;
                    }
                }
                
                console.log(handCards);
                for(var x=0;x<5;x++){
                    if(handCards[x].cardID!='pHolder'){
                        total=total+1;
                    }
                }
                if(purgatory.length==0){
                    total=-69;
                }
                if(total==0){
                    stopTurn();
                    $('#preG').hide();
                    $('#endMsg').show('fast');
                    $('#endWrd').text('You lose');
                    $('#overlay').fadeIn('fast');
                    $('#game').show();
                    Gconn.send('I lost');
                    $('.connBTN').fadeIn('fast');
                    if (pSession.uID != -1) {
                        pSession.money += 1;
                        updatePlayerXML();
                        buy.play();
                    }
                    $('#setOpen').fadeIn('fast');
                    $('#pSet').fadeOut('fast');
                    updatePlayerXML();
                    
                    battleM.stop();
                    lose.play();
                    $('.connStat').text('Awaiting Connection');
                }
                //MAKE SURE TO RUN THIS AT THE END OF FLOWSTARTER
            }
            
            function eHand(){
                console.log(eHandCards);
                for(var x=0;x<eHandCards.length;x++){
                    if(eHandCards[x].cardID!='pHolder'){
                        /*$('#eHand').children('#c'+(x+1)).children('.pHolder').replaceWith("<div title='"+eHandCards[x].name+"&#013; HP "+eHandCards[x].HP+"|DP "+eHandCards[x].DP+"|AP "+eHandCards[x].AP+" &#013;&#013;"+eHandCards[x].efDef+"' class='iCard'><img class='cImg' src='"+eHandCards[x].img+"'></div>");*/
                        $('#eHand').children('#c'+(x+1)).children('.pHolder').replaceWith("<div title='"+eHandCards[x].name+"&#013; HP "+eHandCards[x].HP+"|DP "+eHandCards[x].DP+"|AP "+eHandCards[x].AP+"' class='iCard'><img class='cImg' src='"+eHandCards[x].img+"'></div>");
                        //Maybe add some kind of animation for when the card gets put in, probably just fade
                    }
                }
            }
            
            function updateStats(place,index,HP,DP,AP){
                var type=place.parent().parent().attr('id');
                
                if(type=='pHand'){
                    handCards[index].HP=HP;
                    handCards[index].DP=DP;
                    handCards[index].AP=AP;
                    
                    var card=handCards[index];
                    
                    index++;
                    place.parent().parent().children().children('#ps'+index).children('.sHp').text(card.HP);
                    place.parent().parent().children().children('#ps'+index).children('.sDp').text(card.DP);
                    place.parent().parent().children().children('#ps'+index).children('.sAp').text(card.AP);
                }
                if(type=='eHand'){
                    eHandCards[index].HP=HP;
                    eHandCards[index].DP=DP;
                    eHandCards[index].AP=AP;
                    
                    var card=eHandCards[index];
                    
                    index++;
                    place.parent().parent().children().children('#es'+index).children('.eHp').text(card.HP);
                    place.parent().parent().children().children('#es'+index).children('.eDp').text(card.DP);
                    place.parent().parent().children().children('#es'+index).children('.eAp').text(card.AP);
                }
            }
            
           
           
           //Graphics
           //--------------------------------//
           
           /* $('.phCard').draggable({
                stack:'.card',
                scroll:false,
                /*,containment:'body'
                snap:'.phCard',
                snapMode:'inner',
                revert:'invalid'
            });*/
            
            //alert(cards[0].type);
            
            
            
            $('.phCard').click(function(){
                var cCard=$(this).children().children().text();
                
                if(SB>=handCards[cCard].SB){
                    handCards[cCard].effect(cCard);
                    SB=SB-handCards[cCard].SB;
                    $('#pSB').text(SB);
                    Gconn.send({ 'dataType': 'SBchange', 'amount': SB });
                }
            });
            $('.phCard').droppable({
                accept:function(c){
                    if($(this).children().attr('class')!='pHolder ui-droppable'){
                        return true;
                    }
                },
                drop:function(event,ui){
                    var cardNum;
                    var pCard;
                    
                    if ($(ui.draggable).attr('class') == 'card eCard ui-draggable ui-draggable-handle ui-draggable-dragging') {
                        var eIndex=$(ui.draggable).index();
                        
                        var effectNum = $(ui.draggable).children().children('.data').text();
                        var effectCard = effects[effectNum];
                        cardNum = $(this).index() - 1;
                        pCard = handCards[cardNum];
                        
                        console.log(effectCard);
                        
                        if (SB >= effectCard.SB) {
                            placeCard.play();
                        
                            var buffData = {
                                'dataType': 'buff',
                                'type': 'E',
                                'cIndex': cardNum,
                                'stat': effectCard.type,
                                'amount': effectCard.amount
                            };
                    
                            Gconn.send(buffData);
                    
                            buff('P', cardNum, effectCard.type, effectCard.amount);
                            updateStats($(this).children(), cardNum, pCard.HP, pCard.DP, pCard.AP);
                    
                            $(ui.draggable).fadeOut('slow');
                    
                            //SB
                            SB = SB - effectCard.SB;
                            $('#pSB').text(SB);
                            Gconn.send({ 'dataType': 'SBchange', 'amount': SB });
                            
                            pSession.eDeck.splice(eIndex,1);
                        }
                    }
                    if ($(ui.draggable).attr('class') == 'card wCard ui-draggable ui-draggable-handle ui-draggable-dragging') {
                        var wIndex=$(ui.draggable).index();
                        
                        var weaponNum = $(ui.draggable).children().children('.data').text();
                        var weaponCard = weapons[weaponNum];
                        cardNum = $(this).index() - 1;
                        pCard = handCards[cardNum];
                    
                        if (SB >= weaponCard.SB) {
                            if (weaponCard.type == 'buff') {
                                buff('P', cardNum, weaponCard.affects, weaponCard.by);
                                updateStats($(this).children(), cardNum, pCard.HP, pCard.DP, pCard.AP);
                    
                                var buffData = {
                                    'dataType': 'buff',
                                    'type': 'E',
                                    'cIndex': cardNum,
                                    'stat': weaponCard.affects,
                                    'amount': weaponCard.by
                                };
                                Gconn.send(buffData);
                            }
                            if (weaponCard.type = 'attack') {
                                pCard.weapon=weaponCard.name;
                                pCard.weaponNum=weaponCard.wID;
                            }
                    
                            var wData = {
                                'dataType': 'weaponPlace',
                                'cardPlace': cardNum + 1,
                                'weapon': weaponNum,
                            };
                            
                            Gconn.send(wData);
                            placeCard.play();
                    
                            $(this).children('.wHolder').children().replaceWith($(ui.draggable.children()));
                    
                            SB = SB - weaponCard.SB;
                            $('#pSB').text(SB);
                            Gconn.send({ 'dataType': 'SBchange', 'amount': SB });
                            
                            pSession.wDeck.splice(wIndex,1);
                        }
                    }
                }
            });
            
            $('.tCard').mousedown(function(){
                $(this).css
            });
            
            var rint;
            var tint;
            var eint;
            var rCount=180;
            var tCount=-90;
            var eCount=90;
            
            $('.tCard').mousedown(function(){
                var thing=$(this);
                //Going to make my own animation using a timer
                if(tint!=''){
                    clearInterval(tint);
                }
                function cRotate(){
                    if(tCount<=0){
                        tCount+=3;
                    }
                    
                    if(tCount<=0){
                        thing.css({transform:'rotate('+tCount+'deg)'});
                    }
                    else if(tCount>0){
                        clearInterval(tint);
                    }
                    //alert(rCount);
                }
                var isDisabled = $(this).draggable('option', 'disabled');
                if(isDisabled==false){
                tint=setInterval(cRotate,1);
                }
            });
            
            $('.tCard').mouseup(function(){
                clearInterval(tint);
                tCount=-90;
                
               $(this).css({transform:'rotate(-90deg)'});
            });
            
            $('.eCard').mousedown(function(){
                var thing=$(this);
                //Going to make my own animation using a timer
                if(eint!=''){
                    clearInterval(eint);
                }
                function cRotate(){
                    if(eCount>=0){
                        eCount-=3;
                    }
                    
                    if(eCount>=0){
                        thing.css({transform:'rotate('+eCount+'deg)'});
                    }
                    else if(eCount<0){
                        clearInterval(eint);
                    }
                    //alert(rCount);
                }
                
                eint=setInterval(cRotate,1);
                
            });
            
            $('.eCard').mouseup(function(){
                clearInterval(eint);
                eCount=90;
                
               $(this).css({transform:'rotate(90deg)'});
            });
            
            $('.ehCard').mouseenter(function(){
                var thing=$(this);
                //Going to make my own animation using a timer
                if(rint!=''){
                    clearInterval(rint);
                }
                function cRotate(){
                    if(rCount>=0){
                        rCount-=3;
                    }
                    
                    if(rCount>=0){
                        thing.css({transform:'rotate('+rCount+'deg)'});
                    }
                    else if(rCount<0){
                        clearInterval(rint);
                    }
                    //alert(rCount);
                }
                
                rint=setInterval(cRotate,1);
                
            });
            
            $('.ehCard').mouseleave(function(){
                clearInterval(rint);
                rCount=180;
                
               $(this).css({transform:'rotate(180deg)'});
               $('#num').text(rCount);
            });
            
            $('.charCard').click(function(){
                
            });
            
            function boardReset() {
                $('#endRem').css('background-image', "url('Assets/Images/UI/html/gameEnd/endBtns/endRem/endRemA.png')");
                remDeny=false;
                
                SB=2;
                sbPlus=0;
                $('#pSB').text(SB);
                remReq=false;
                remAcc=false;
                    
                $('.phCard').empty();
                $('.phCard').append("<div class='pHolder'></div><div class='wHolder'><div></div></div>");
            
                $('.ehCard').empty();
                $('.ehCard').append("<div class='pHolder'></div><div class='wHolder'><div></div></div>");
            
                $('#eStack').empty();
                $('#pStack').empty();
            
                $('.tCard').empty();
                $('.tCard').append("<div class='pHolder'></div>");
                $('.tCard').css({ transform: "rotate(-90deg)" });
            
                $('.wCard').empty();
                $('.wCard').append("<div class='pHolder'></div>");
            
            
                $('.eCard').empty();
                $('.eCard').append("<div class='pHolder'></div>");
                
                $('#opponentMov').empty();
            
                $('#overlay').fadeOut('fast');
                $('#game').fadeOut('fast');
            
                aDeckCards = [];
                bDeckCards = ['pHolder', 'pHolder', 'pHolder', 'pHolder'];
                handCards = [new gCard('pHolder'), new gCard('pHolder'), new gCard('pHolder'), new gCard('pHolder'), new gCard('pHolder')];
                eHandCards = [new gCard('pHolder'), new gCard('pHolder'), new gCard('pHolder'), new gCard('pHolder'), new gCard('pHolder')];
            
                purgatory = [];
            
                battleStuff = [pDom, pOffsets, eDom, eOffsets];
            
                wDeck = ['pHolder', 'pHolder', 'pHolder'];
                eDeck = ['pHolder', 'pHolder', 'pHolder', 'pHolder'];
            }
            
            /*$('.phCard').mousedown(function(e) {
                console.log($(this).children('.iCard').length);

                if (e.button == 2 && $(this).children('.iCard').length != 0) {
                    console.log('Redacted');
                }
                else {
                    console.log('Redacted');
                }
            });

            $('.phCard').contextmenu(function(e) {
                e.preventDefault();

                if ($(this).children('.iCard').length != 0) {
                    console.log('Redacted2');
                }
                else {
                    console.log('Redacted2');
                }
            });*/