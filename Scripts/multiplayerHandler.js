var peer;
var MyID;
var Gconn;

var connTo;

var rNum;
var hOt='placeholder';


function openListener(C) {
    console.log(conn);
    conn = C;
    
    if (connTo == undefined) {
        connTo = C.peer;
    }
    console.log(C);
    
    $('.connStat').text('Received challenge');
    //$('.connStat').text(C.peer+' wants to play');
    $('.accept').fadeIn('fast');
    $('.deny').fadeIn('fast');

    conn.on('data', function(data) {
        console.log(data);
        
        if(data.dataType=='cardPlace'){
            opponentMove('Opponent placed '+cards[data.card].name);
            
            console.log(eHandCards);
            eAdder(data.place,data.card);
        }
        if(data.dataType=='buff'){
            opponentMove("Opponent raised their "+eHandCards[data.cIndex].name+"'s "+data.stat+" by "+data.amount)
            buff(data.type,data.cIndex,data.stat,data.amount);
            
            updateStats(eDom[data.cIndex].children(),data.cIndex,eHandCards[data.cIndex].HP,eHandCards[data.cIndex].DP,eHandCards[data.cIndex].AP);
        }
        if(data.dataType=='weaponPlace'){
            opponentMove('Opponent equipped '+eHandCards[data.cardPlace-1].name+' with '+weapons[data.weapon].name);
            
            console.log('Weapon stuff');
            $('#eHand').children('#c'+data.cardPlace).children('.wHolder').children().replaceWith("<div class='iCard' style='background-image:url(Assets/Images/Cards/Weapons/"+data.weapon+".jpg);'></div>");
            
            data.cardPlace--;
            
            if(weapons[data.weapon].type=='buff'){
                
            }
            if(weapons[data.weapon].type=='attack'){
                eHandCards[data.cardPlace].weapon=weapons[data.weapon].name;
                eHandCards[data.cardPlace].weaponNum=data.weaponNum;
            }
        }
        if(data.dataType=='coin'){
            rNum=data.coinNum;
            coinFlipper();
        }
        if(data=='Your turn'){
            console.log('About to call startTurn');
            startTurn();
        
            enableGo();
        }
        if(data.dataType=='Battle'){
            if(data.first=='P'){
                battleP();
            }
            if(data.first=='E'){
                battleE();
            }
        }
        if(data=='Start game'){
            $('.accept').fadeOut('fast');
            boardReset();
            $('#pInfo').show();
            $('#pSet').fadeIn('fast');
            
            
            $('#setOpen').fadeOut('fast');
            $('#conn').fadeOut('fast');
            $('#pSet').fadeIn('fast');
            $('#game').hide();
            $('#overlay').fadeOut('fast');
        }
        if(data.dataType=='SBchange'){
            $('#eSB').text(data.amount);
        }
        if(data=='I lost'){
            $('.connBTN').fadeIn('fast');
            if(pSession.uID!=-69){
                pSession.money+=2;
                updatePlayerXML();
                buy.play();
            }
            
            remReq=false;
            remAcc=false;
                
            $('#game').show();
            $('#pSet').fadeOut('fast');
            $('#setOpen').fadeIn('fast');
            
            updatePlayerXML();
            stopTurn();
            battleM.stop();
            win.play();
            
            $('#preG').hide();
            $('#endMsg').show('fast');
            $('#endWrd').text('You win');
            $('#overlay').fadeIn('fast');
            $('.connStat').text('Awaiting Connection');
        }
        if(data=='rematch'){
            remAcc=true;
            
            remCheck();
        }
        if(data=="I'm out"){
            $('#endRem').css("background-image","url('Assets/Images/UI/html/gameEnd/endBtns/endRem/endRemU.png')");
            remDeny=true;
        }
    });
}

//var pSession;

function testGame() {
    console.log('test1');
    pSession = {
        'name': 'player',
        'uID': 1,
        'cards': [0, 0, 0],
        'cDeck': [0, 0, 0],
        'weapons': [0, 0, 0],
        'wDeck': [0, 0, 0],
        'effects': [0, 0, 0],
        'eDeck': [0, 0, 0],
        'money': 0
    };
    
    var hOt='heads';
    
    if (hOt == 'heads') {
        decideCoin();

        var coinData = {
            'dataType': 'coin',
            'coinNum': rNum
        };
    }
    console.log('test2');
}

function opponentMove(m){
    var fMove=('<div>'+m+'<hr></div>');
    
    $('#opponentMov').prepend(fMove);
}
