/*Important
Heroku uses ephemeral filesystems, everytime the dyno reboots
it deletes all newly created files

Possible fixes:
- Switch to JSON accounts
- Look into other forms of data storage
*/
$(document).contextmenu(function(e) {
    e.preventDefault();
});

$('#pInfo').show();
$('#pInfo').css('opacity',0);
mMusic();

var thingArr=[]
console.log(thingArr);

var userOffPass;
/*var pSession = {
    'name': 'player',
    'uID': -1,
    'cards': [],
    'cDeck': [],
    'weapons': [],
    'wDeck': [],
    'effects': [],
    'eDeck': [],
    'money': 0
};*/

var move;

//Select
$('#chHost').click(function() {
    $('#choose').fadeOut('fast', function() {
        $('#host').fadeIn('fast');
        hOt = 'heads';
    });
});

$('#chConn').click(function() {
    $('#choose').fadeOut('fast', function() {
        $('#conn').fadeIn('fast');
    });
    hOt = 'tails';
});

//Host
$('.accept').click(function() {
    $('.deny').fadeOut('fast');
    var conn = peer.connect(connTo); //Connecting to peer
    Gconn = conn;

    $(this).fadeOut('fast', function() {
        $('.startG').delay(250).fadeIn('fast');
    });
});

//Conn
$('#connBTN').click(function() {
    $('.connBTN').fadeOut('fast');
    $('.cancelBTN').fadeIn('fast');
    connTo = $('#conn_tBox').val();

    var conn = peer.connect(connTo); //Connecting to peer
    Gconn = conn;

    Gconn.send('test');
});

$('#connBK').click(function() {
    $('#conn').fadeOut('fast', function() {
        $('#choose').fadeIn('fast');
    });
    $('#conn')
});

//Global variables
var mouseX;
var mouseY;
var oldX;
var oldY;
var timeout;

var objArray = [];

var current = $('#sCtrls');

var MsV = 10;
var MuV = 10;
var SfV = 10;


$('.oButton').click(function() {
    click.currentTime = 0;
    click.play();
});

$('.gButton').click(function() {
    click.currentTime = 0;
    click.play();
});

$('.backButton').click(function() {
    back.currentTime = 0;
    back.play();
});

//Sign in GUI
$('#SIbb').click(function() {
    $('#overlay').fadeOut('fast');
    $('#form').fadeOut('fast');
    $('#sCtrls').fadeIn('fast');

    current = $('#sCtrls');
});
$('#SIsi').click(function() {
    var userATFS = $('#userATMP').val();
    var userPass = $('#passATMP').val();

    signIn(userATFS, userPass);
    $('#pInfo').css('opacity',1);
});

function signIn(user, pass) {
    var userDirect = ('PHP/Accounts/' + user + '.xml');

    $.ajax({
        type: 'GET',
        url: userDirect,
        dataType: 'xml',
        success: function(result) {
            $('#UAerror').hide();
            $('#userATMP').css('background-color','white');
            
            console.log('Username found');

            var xmlPass = $(result).find('pass').text();

            if (pass == xmlPass) {
                $('#passATMP').css('background-color','white');
                $('#PAerror').hide();
                
                var loadName = user;
                var loaduID = $(result).find('uID').text();
                userOffPass = pass;
                console.log(userOffPass);
                var loadCards = $(result).find('cards').text();
                console.log(loadCards);
                var loadCDeck = $(result).find('cDeck').text();
                var loadWeapons = $(result).find('weapons').text();
                var loadWDeck = $(result).find('wDeck').text();
                var loadEffects = $(result).find('effects').text();
                var loadEDeck = $(result).find('eDeck').text();
                var loadMoney = $(result).find('money').text();

                $('#form').fadeOut('fast', function() {
                    $('#menu').fadeIn('fast');
                });
                current = $('#menu');

                $('#userATMP').val('');
                $('#passATMP').val('');

                loadPlayer(loadName, loaduID, loadCards, loadCDeck, loadWeapons, loadWDeck, loadEffects, loadEDeck, loadMoney);

                if (peer != undefined) {
                    peer.destroy();
                }
                
                peer = new Peer(user, { host: 'pqpeer.herokuapp.com', port:'' });
                //peer = new Peer(user,{key: 'o3ft8d7oai9hpvi'});

                peer.on('open', function(id) {
                    MyID = id;
                    console.log('You are ' + MyID);
                    $('#urID').text(MyID);
                });

                peer.on('connection', openListener);
            }
            else {
                $('#PAerror').text('Wrong password');
                $('#passATMP').css('background-color','#ff6363');
                $('#PAerror').show();
            }
        },
        cache:false,
        error: function(error){
            $('#UAerror').text('User not found');
            $('#userATMP').css('background-color','#ff6363');
            $('#UAerror').show();
        }
    });
}

function loadPlayer(name, uID, cardsL, cDeckL, weaponsL, wDeckL, effectsL, eDeckL, money) {
    pSession = {
        'name': name,
        'uID': uID,
        'cards': [],
        'cDeck': [],
        'weapons': [],
        'wDeck': [],
        'effects': [],
        'eDeck': [],
        'money': money
    };

    for (var x = 0; x < cardsL.split(',').length; x++) {
        var arr = cardsL.split(',');
        if(arr[0]!=""){
            pSession.cards[x] = cards[arr[x]];
        }
    }
    for (var x = 0; x < cDeckL.split(',').length; x++) {
        var arr = cDeckL.split(',');
        if(arr[0]!=""){
           pSession.cDeck[x] = cards[arr[x]]; 
        }
    }
    for (var x = 0; x < weaponsL.split(',').length; x++) {
        var arr = weaponsL.split(',');
        if(arr[0]!=""){
           pSession.weapons[x] = weapons[arr[x]]; 
        }
    }
    for (var x = 0; x < wDeckL.split(',').length; x++) {
        var arr = wDeckL.split(',');
        if(arr[0]!=""){
           pSession.wDeck[x] = weapons[arr[x]];
        }
    }
    for (var x = 0; x < effectsL.split(',').length; x++) {
        var arr = effectsL.split(',');
        if(arr[0]!=""){
           pSession.effects[x] = effects[arr[x]];
        }
    }
    for (var x = 0; x < eDeckL.split(',').length; x++) {
        var arr = eDeckL.split(',');
        if(arr[0]!=""){
           pSession.eDeck[x] = effects[arr[x]];
        }
    }
    
    $('#pName').text(pSession.name);
    $('#pMon').text('$'+pSession.money);
    cardsInit();
    
    console.log(pSession);
}

function updatePlayerXML() {
    $('#pName').text(pSession.name);
    $('#pMon').text('$'+pSession.money);
    
    console.log('updatePlayerXML called');
    var rFile = (pSession.name + '.xml');
    
    var cardsString='';
    console.log(pSession);
    for(var x=0;x<pSession.cards.length;x++){
        var appCard=pSession.cards[x].cardID;
        
        if(x!=pSession.cards.length-1){
            appCard=appCard+',';
        }
        
        cardsString=cardsString+appCard;
    }
    var cDeckString='';
    for(var x=0;x<pSession.cDeck.length;x++){
        var appCard=pSession.cDeck[x].cardID;
        
        if(x!=pSession.cDeck.length-1){
            appCard=appCard+',';
        }
        
        cDeckString=cDeckString+appCard;
    }
    var weaponsString='';
    for(var x=0;x<pSession.weapons.length;x++){
        var appCard=pSession.weapons[x].wID;
        
        if(x!=pSession.weapons.length-1){
            appCard=appCard+',';
        }
        
        weaponsString=weaponsString+appCard;
    }
    var wDeckString='';
    for(var x=0;x<pSession.wDeck.length;x++){
        var appCard=pSession.wDeck[x].wID;
        
        if(x!=pSession.wDeck.length-1){
            appCard=appCard+',';
        }
        
        wDeckString=wDeckString+appCard;
    }
    var effectsString='';
    for(var x=0;x<pSession.effects.length;x++){
        var appCard=pSession.effects[x].eID;
        
        if(x!=pSession.effects.length-1){
            appCard=appCard+',';
        }
        
        effectsString=effectsString+appCard;
    }
    var eDeckString='';
    for(var x=0;x<pSession.eDeck.length;x++){
        var appCard=pSession.eDeck[x].eID;
        
        if(x!=pSession.eDeck.length-1){
            appCard=appCard+',';
        }
        
        eDeckString=eDeckString+appCard;
    }
    
    
    var rWrite = ("<?xml version='1.0'?><account><name>" + pSession.name + "</name><uID>" + pSession.uID + "</uID><pass>" + userOffPass + "</pass><cards>" + cardsString+"</cards><cDeck>" + cDeckString+ "</cDeck><weapons>" + weaponsString + "</weapons><wDeck>" +wDeckString+ "</wDeck><effects>" +effectsString+ "</effects><eDeck>" +eDeckString+ "</eDeck><money>" + pSession.money + "</money></account>");
    
    $.post('PHP/Accounts/creatAcc.php', { fileTo: rFile, stuff: rWrite }, function() {
        console.log('written');
    });
}

function logOut() {
    pSession = {
        'name': 'playername',
        'uID': -1,
        'cards': [],
        'cDeck': [],
        'weapons': [],
        'wDeck': [],
        'effects': [],
        'eDeck': [],
        'money': 0
    };

}
$('#gSign').mouseup(function() {
    $('#overlay').fadeIn('fast');
    $('#form').fadeIn('fast');
    $('#sCtrls').fadeOut('fast');

    current = $('#form');
});

$('#MEplay').click(function() {
    console.log(MyID);
    $('#menu').fadeOut('fast', function() {
        $('#play').fadeIn('fast');
    });
    current = $('#play');
});
$('#MEbb').click(function() {
    $('#pInfo').css('opacity',0);
    $('#menu').fadeOut('fast', function() {
        $('#form').fadeIn('fast');
    });
    current = $('#form');
});
$('#CHbb').click(function() {
    $('#play').fadeOut('fast', function() {
        $('#menu').fadeIn('fast');
    });
    current = $('#menu');
});
$('#chHost').click(function() {
    $('#choose').fadeOut('fast', function() {
        $('#host').fadeIn('fast');
    });
    current = $('#host');
});
$('#HObb').click(function() {
    $('#host').fadeOut('fast', function() {
        $('#choose').fadeIn('fast');
    });
    current = $('#choose');
});
$('#chConn').click(function() {
    $('#choose').fadeOut('fast', function() {
        $('#conn').fadeIn('fast');
    });
    current = $('#conn');
});
$('#CObb').click(function() {
    $('#conn').fadeOut('fast', function() {
        $('#choose').fadeIn('fast');
    });
    current = $('#choose');
});

$('#MEshop').click(function() {
    $('#menu').fadeOut('fast', function() {
        $('#shop').fadeIn('fast');
    });
    current = $('#shop');
});
$('#tcT').click(function() {
    $('#SHtc').css('z-index', 2);
    $('#SHef').css('z-index', 1);
    $('#SHwp').css('z-index', 1);

    $('#StBr').show();
    $('#SeBr').hide();
    $('#SwBr').hide();
});
$('#efT').click(function() {
    $('#SHtc').css('z-index', 1);
    $('#SHef').css('z-index', 2);
    $('#SHwp').css('z-index', 1);

    $('#StBr').hide();
    //$('#SeBr').show();
    $('#SwBr').hide();
});
$('#wpT').click(function() {
    $('#SHtc').css('z-index', 1);
    $('#SHef').css('z-index', 1);
    $('#SHwp').css('z-index', 2);

    $('#StBr').hide();
    $('#SeBr').hide();
    //$('#SwBr').show();
});
$('#SHbb').click(function() {
    $('#shop').fadeOut('fast', function() {
        $('#menu').fadeIn('fast');
    });
    current = $('#menu');
});
$('#setOpen').click(function() {
    current.fadeToggle('fast');
    $('#setWrap').fadeToggle('fast');
});
$('#pSet').click(function() {
    current.fadeToggle('fast');
    $('#setWrap').fadeToggle('fast');
});
$('#SEbb').click(function() {
    $('#settings').fadeOut('fast', function() {
        current.fadeIn('fast');
    });
});
$('#MsV').slider({
    value: 10,
    step: 1,
    max: 10,
    change: function() {
        MsV = $('#MsV').slider('option', 'value');
        volumeSync();
    }
});
$('#MuV').slider({
    value: 10,
    step: 1,
    max: 10,
    change: function() {
        MuV = $('#MuV').slider('option', 'value');
        volumeSync();
    }
});
$('#SfV').slider({
    value: 10,
    step: 1,
    max: 10,
    change: function() {
        SfV = $('#SfV').slider('option', 'value');
        volumeSync();
    }
});

function volumeSync() {
    menu.volume((MuV / 100) * MsV);

    shop.volume((MuV / 100) * MsV);
    battleM.volume((MuV / 85) * MsV);

    attackSfx.volume((SfV / 100) * MsV);
    placeCard.volume((SfV / 100) * MsV);
    lose.volume((SfV / 100) * MsV);
    statD.volume((SfV / 100) * MsV);
    statI.volume((SfV / 100) * MsV);
    win.volume((SfV / 100) * MsV);
    connected.volume((SfV / 100) * MsV);
    connecting.volume((SfV / 100) * MsV);
    connError.volume((SfV / 100) * MsV);
    click.volume((SfV / 100) * MsV);
    back.volume((SfV / 100) * MsV);
}

//Quickplay GUI
$('#gQuik').click(function() {
    $('#pInfo').css('opacity',0);
    pSession = {
    'name': 'player',
    'uID': -69,
    'cards': [],
    //'cDeck': [cards[0]],
    'cDeck': [],
    'weapons': [],
    //'wDeck': [weapons[6]],
    'wDeck': [],
    'effects': [],
    'eDeck': [],
    'money': 0
    };
    
    for(var x=0;x<7;x++){
        do{
            var rNum1=Math.floor(Math.random() * 5) + 0; 
        }
        while(rNum1==1);
        
        var rNum2=Math.floor(Math.random() * 5) + 0;  
        var rNum3=Math.floor(Math.random() * 2) + 0;  
        
        pSession.cDeck[x]=cards[rNum1];
        pSession.wDeck[x]=weapons[rNum2];
        pSession.eDeck[x]=effects[rNum3];
    }
    console.log(rNum1+","+rNum2+","+rNum3);
    console.log(pSession);
    
    if (peer != undefined) {
        peer.destroy();
    }
    peer = new Peer({ host: 'pqpeer.herokuapp.com', port:'' });
    //peer = new Peer({key: 'o3ft8d7oai9hpvi'});

    peer.on('open', function(id) {
        MyID = id;
        console.log('You are ' + MyID);
        $('#urIDQP').text(MyID);
    });

    peer.on('connection', openListener);
});

//Quickplay conn
$('#connBTNQP').click(function() {
    $('.connBTN').fadeOut('fast');
    console.log('test');
    connTo = $('#conn_tBoxQP').val();

    var conn = peer.connect(connTo); //Connecting to peer
    Gconn = conn;

    Gconn.send('test');
});


function shopInit() {
    for (var x = 0; x < 50; x++) {
        var cCard = cards[x];

        if (cCard != undefined && cCard.hasOwnProperty('cardID') && cCard.type == 'reg') {
            //*$("#tcCont").append("<div title='"+cCard.name+"&#013; HP "+cCard.HP+"|DP "+cCard.DP+"|AP "+cCard.AP+" &#013;&#013;"+cCard.efDef+"' class='shopCard'><div class='shopICard' style='background-image:url(Assets/Images/Cards/Characters/" + cCard.cardID + ".jpg);'><span class='data'>" + cCard.cardID + "</span></div><div class='scInfo'><div class='scM'>$2</div><div class='scN'>" + cCard.name + "</div></div></div>");*/
            $("#tcCont").append("<div title='"+cCard.name+"&#013; HP "+cCard.HP+"|DP "+cCard.DP+"|AP "+cCard.AP+"' class='shopCard'><div class='shopICard' style='background-image:url(Assets/Images/Cards/Characters/" + cCard.cardID + ".jpg);'><span class='data'>" + cCard.cardID + "</span></div><div class='scInfo'><div class='scM'>$2</div><div class='scN'>" + cCard.name + "</div></div></div>");
        }
        if (cCard != undefined && cCard.hasOwnProperty('cardID') && cCard.type == 'woke') {
            /*$("#tcCont").append("<div title='"+cCard.name+"&#013; HP "+cCard.HP+"|DP "+cCard.DP+"|AP "+cCard.AP+" &#013;&#013;"+cCard.efDef+"' class='shopCard'><div class='shopICard' style='background-image:url(Assets/Images/Cards/Characters/" + cCard.cardID + ".jpg);'><span class='data'>" + cCard.cardID + "</span></div><div class='scInfo'><div class='scM'>$15</div><div class='scN'>" + cCard.name + "</div></div></div>");*/
            $("#tcCont").append("<div title='"+cCard.name+"&#013; HP "+cCard.HP+"|DP "+cCard.DP+"|AP "+cCard.AP+"' class='shopCard'><div class='shopICard' style='background-image:url(Assets/Images/Cards/Characters/" + cCard.cardID + ".jpg);'><span class='data'>" + cCard.cardID + "</span></div><div class='scInfo'><div class='scM'>$15</div><div class='scN'>" + cCard.name + "</div></div></div>");
        }
    }

    for (var x = 0; x < 9; x++) {
        var cCard = effects[x];

        if (cCard != undefined && cCard.hasOwnProperty('eID')) {
            $("#ecCont").append("<div title='"+cCard.name+"&#013; HP "+cCard.HP+"|DP "+cCard.DP+"|AP "+cCard.AP+" &#013;&#013;"+cCard.efDef+"' class='shopCard'><div class='shopICard' style='background-image:url(Assets/Images/Cards/Effects/" + cCard.eID + ".jpg);'><span class='data'>" + cCard.eID + "</span></div><div class='scInfo'><div class='scM'>$" + cCard.cost + "</div><div class='scN'>" + cCard.name + "</div></div></div>");
        }
    }

    for (var x = 0; x < 6; x++) {
        var cCard = weapons[x];

        if (cCard != undefined && cCard.hasOwnProperty('wID')) {
            $("#wcCont").append("<div title='"+cCard.name+"&#013; HP "+cCard.HP+"|DP "+cCard.DP+"|AP "+cCard.AP+" &#013;&#013;"+cCard.efDef+"' class='shopCard'><div class='shopICard' style='background-image:url(Assets/Images/Cards/Weapons/" + cCard.wID + ".jpg);'><span class='data'>" + cCard.wID + "</span></div><div class='scInfo'><div class='scM'>$" + cCard.cost + "</div><div class='scN'>" + cCard.name + "</div></div></div>");
        }
    }
}

shopInit();

function cardsInit() {
    console.log(pSession.cards);
    
    $('#tcContCH').empty();
    $('#wcContCH').empty();
    $('#ecContCH').empty();
    $('#tcContCD').empty();
    $('#wcContCD').empty();
    $('#ecContCD').empty();
    
    for (var x = 0; x < pSession.cards.length; x++) {
        var cCard = pSession.cards[x];

        if (cCard != undefined && cCard.hasOwnProperty('cardID')) {
            /*$("#tcContCH").append("<div title='"+cCard.name+"&#013; HP "+cCard.HP+"|DP "+cCard.DP+"|AP "+cCard.AP+" &#013;&#013;"+cCard.efDef+"' class='boxCard'><div class='shopICard cBoxCard' style='background-image:url(Assets/Images/Cards/Characters/" + cCard.cardID + ".jpg);'></div><div class='scInfo'><div class='scN'>" + cCard.name + "</div><div class='scNum'>"+cCard.cardID+"</div></div></div>");*/
            $("#tcContCH").append("<div title='"+cCard.name+"&#013; HP "+cCard.HP+"|DP "+cCard.DP+"|AP "+cCard.AP+"' class='boxCard'><div class='shopICard cBoxCard' style='background-image:url(Assets/Images/Cards/Characters/" + cCard.cardID + ".jpg);'></div><div class='scInfo'><div class='scN'>" + cCard.name + "</div><div class='scNum'>"+cCard.cardID+"</div></div></div>");
        }
    }

    for (var x = 0; x < pSession.effects.length; x++) {
        var cCard = pSession.effects[x];

        if (cCard != undefined && cCard.hasOwnProperty('eID')) {
            $("#ecContCH").append("<div title='"+cCard.name+"&#013; HP "+cCard.HP+"|DP "+cCard.DP+"|AP "+cCard.AP+" &#013;&#013;"+cCard.efDef+"' class='boxCard'><div class='shopICard cBoxCard' style='background-image:url(Assets/Images/Cards/Effects/" + cCard.eID + ".jpg);'></div><div class='scInfo'><div class='scN'>" + cCard.name + "</div><div class='scNum'>"+cCard.eID+"</div></div></div>");
        }
    }

    for (var x = 0; x < pSession.weapons.length; x++) {
        var cCard = pSession.weapons[x];

        if (cCard != undefined && cCard.hasOwnProperty('wID')) {
            $("#wcContCH").append("<div title='"+cCard.name+"&#013; HP "+cCard.HP+"|DP "+cCard.DP+"|AP "+cCard.AP+" &#013;&#013;"+cCard.efDef+"' class='boxCard'><div class='shopICard cBoxCard' style='background-image:url(Assets/Images/Cards/Weapons/" + cCard.wID + ".jpg);'></div><div class='scInfo'><div class='scN'>" + cCard.name + "</div><div class='scNum'>"+cCard.wID+"</div></div></div>");
        }
    }
    for (var x = 0; x < pSession.cDeck.length; x++) {
        var cCard = pSession.cDeck[x];

        if (cCard != undefined && cCard.hasOwnProperty('cardID')) {
            $("#tcContCD").append("<div title='"+cCard.name+"&#013; HP "+cCard.HP+"|DP "+cCard.DP+"|AP "+cCard.AP+" &#013;&#013;"+cCard.efDef+"' class='boxCard'><div class='shopICard deckCard' style='background-image:url(Assets/Images/Cards/Characters/" + cCard.cardID + ".jpg);'></div><div class='scInfo'><div class='scN'>" + cCard.name + "</div><div class='scNum'>"+cCard.cardID+"</div></div></div>");
        }
    }

    for (var x = 0; x < pSession.eDeck.length; x++) {
        var cCard = pSession.eDeck[x];

        if (cCard != undefined && cCard.hasOwnProperty('eID')) {
            $("#ecContCD").append("<div title='"+cCard.name+"&#013; HP "+cCard.HP+"|DP "+cCard.DP+"|AP "+cCard.AP+" &#013;&#013;"+cCard.efDef+"' class='boxCard'><div class='shopICard deckCard' style='background-image:url(Assets/Images/Cards/Effects/" + cCard.eID + ".jpg);'></div><div class='scInfo'><div class='scN'>" + cCard.name + "</div><div class='scNum'>"+cCard.eID+"</div></div></div>");
        }
    }

    for (var x = 0; x < pSession.wDeck.length; x++) {
        var cCard = pSession.wDeck[x];

        if (cCard != undefined && cCard.hasOwnProperty('wID')) {
            $("#wcContCD").append("<div title='"+cCard.name+"&#013; HP "+cCard.HP+"|DP "+cCard.DP+"|AP "+cCard.AP+" &#013;&#013;"+cCard.efDef+"' class='boxCard'><div class='shopICard deckCard' style='background-image:url(Assets/Images/Cards/Weapons/" + cCard.wID + ".jpg);'></div><div class='scInfo'><div class='scN'>" + cCard.name + "</div><div class='scNum'>"+cCard.wID+"</div></div></div>");
        }
    }
    
    $('.boxCard').click(function() {
        if ($(this).parent().attr('id') == 'tcContCH' && pSession.cDeck.length<5) {
            var cIndex = $(this).index();
    
            pSession.cDeck.push(pSession.cards[cIndex]);
            pSession.cards.splice(cIndex, 1);
        }
        else if ($(this).parent().attr('id') == 'tcContCH' && pSession.cDeck.length>=5) {
            connError.play();
        }
        
        if ($(this).parent().attr('id') == 'tcContCD' && pSession.cDeck.length>1) {
            var cIndex = $(this).index();
    
            pSession.cards.push(pSession.cDeck[cIndex]);
            pSession.cDeck.splice(cIndex, 1);
        }
        else if ($(this).parent().attr('id') == 'tcContCD' && pSession.cDeck.length<=1) {
            connError.play()
        }
        
        
        if ($(this).parent().attr('id') == 'wcContCH' && pSession.wDeck.length<3) {
            var cIndex = $(this).index();
    
            pSession.wDeck.push(pSession.weapons[cIndex]);
            pSession.weapons.splice(cIndex, 1);
        }
        else if ($(this).parent().attr('id') == 'wcContCH' && pSession.wDeck.length>=3) {
            connError.play();
        }
        if ($(this).parent().attr('id') == 'wcContCD') {
            var cIndex = $(this).index();
    
            pSession.weapons.push(pSession.wDeck[cIndex]);
            pSession.wDeck.splice(cIndex, 1);
        }
        
        
        if ($(this).parent().attr('id') == 'ecContCH' && pSession.eDeck.length<4) {
            var cIndex = $(this).index();
    
            pSession.eDeck.push(pSession.effects[cIndex]);
            pSession.effects.splice(cIndex, 1);
        }
        else if ($(this).parent().attr('id') == 'ecContCH' && pSession.eDeck.length>=4) {
            connError.play();
        }
        if ($(this).parent().attr('id') == 'ecContCD') {
            var cIndex = $(this).index();
    
            pSession.effects.push(pSession.eDeck[cIndex]);
            pSession.eDeck.splice(cIndex, 1);
        }
        
        cardsInit();
        updatePlayerXML();
    });
}

function chestAnimDown() {
    $('#shopChest').animate({
        width: 76.5,
        height: 60.25
    }, 1000, chestAnimUp);
}

function chestAnimUp() {
    $('#shopChest').animate({
        width: 86.5,
        height: 68.25
    }, 1000, chestAnimDown);
}

$('#MEcards').click(function() {
    $('#cards').fadeIn('fast', function() {
        $('#menu').fadeOut('fast');
    });
    current = $('#menu');
});

$('#tcTC').click(function() {
    console.log('test1');
    $('#CHtc').css('z-index', 2);
    $('#CHef').css('z-index', 1);
    $('#CHwp').css('z-index', 1);
    
    $('#CDtc').css('z-index', 2);
    $('#CDef').css('z-index', 1);
    $('#CDwp').css('z-index', 1);
});
$('#efTC').click(function() {
    $('#CHtc').css('z-index', 1);
    $('#CHef').css('z-index', 2);
    $('#CHwp').css('z-index', 1);
    
    $('#CDtc').css('z-index', 1);
    $('#CDef').css('z-index', 2);
    $('#CDwp').css('z-index', 1);
});
$('#wpTC').click(function() {
    $('#CHtc').css('z-index', 1);
    $('#CHef').css('z-index', 1);
    $('#CHwp').css('z-index', 2);
    
    $('#CDtc').css('z-index', 1);
    $('#CDef').css('z-index', 1);
    $('#CDwp').css('z-index', 2);
});

$('#CAbb').click(function() {
    $('#cards').fadeOut('fast', function() {
        $('#menu').fadeIn('fast');
    });
    current = $('#menu');
});
var toCDtxt = 'To Deck';
$('#toCD').click(function() {
    if (toCDtxt == 'To Deck') {
        toCDtxt = 'To Cards';
        $(this).text(toCDtxt);
        return;
    }
    if (toCDtxt == 'To Cards') {
        toCDtxt = 'To Deck';
        $(this).text(toCDtxt);
        return;
    }
});

//Quickplay
$('#gQuik').click(function() {
    $('#overlay').fadeIn('fast');
    $('#quickPlay').fadeIn('fast');
})
$('#CHbbQP').click(function() {
    $('#overlay').fadeOut('fast');
    $('#quickPlay').fadeOut('fast', function() {
        $('#sCtrls').fadeIn('fast');
    });
    current = $('#menu');
});
$('#chHostQP').click(function() {
    $('#chooseQP').fadeOut('fast', function() {
        $('#hostQP').fadeIn('fast');
    });
    current = $('#hostQP');
});
$('#HObbQP').click(function() {
    $('#hostQP').fadeOut('fast', function() {
        $('#chooseQP').fadeIn('fast');
    });
    current = $('#chooseQP');
});
$('#chConnQP').click(function() {
    $('#chooseQP').fadeOut('fast', function() {
        $('#connQP').fadeIn('fast');
    });
    current = $('#connQP');
});
$('#CObbQP').click(function() {
    $('#connQP').fadeOut('fast', function() {
        $('#chooseQP').fadeIn('fast');
    });
    current = $('#chooseQP');
});

$('#SIce').click(function() {
    var userATFS = $('#userATMP').val();
    var userWrite = (userATFS + '.xml');
    var writeDirect = ('PHP/Accounts/' + userATFS + '.xml');
    var passCe = $('#passATMP').val();

    var writeStuff = ("<?xml version='1.0'?> <account> <name>" + userATFS + "</name> <uID></uID> <pass>" + passCe + "</pass> <cards>,3</cards> <cDeck>0,2</cDeck> <weapons></weapons> <wDeck></wDeck> <effects></effects> <eDeck></eDeck> <money>10</money> </account>");
    
    if (passCe!='' && userATFS != '' && userATFS.length<15 && userATFS.indexOf('/')==-1 && userATFS.indexOf('.')==-1 && userATFS.indexOf('$')==-1 ) {
        $.ajax({
            type: 'GET',
            url: writeDirect,
            dataType: 'xml',
            success: function(result) {
                $('#UAerror').text('User exists');
                $('#userATMP').css('background-color', '#ff6363');
                $('#UAerror').show();
            },
            cache: false,
            error: function(error) {
                $('#userATMP').css('background-color', 'white');
                $('#UAerror').hide();

                $.post('PHP/Accounts/creatAcc.php', { fileTo: userWrite, stuff: writeStuff }, function() {
                    console.log('written');

                    signIn(userATFS, passCe);
                });
            }
        });
    }
    if(passCe==''){
        $('#PAerror').text('Password is empty');
        $('#passATMP').css('background-color','#ff6363');
        $('#PAerror').show();
    }
    else{
        $('#passATMP').css('background-color','white');
        $('#PAerror').hide();
    }
    if(userATFS == '' || userATFS.length>=15 || userATFS.indexOf('/')!=-1 || userATFS.indexOf('.')!=-1 || userATFS.indexOf('$')!=-1 ){
        $('#UAerror').text('Text/Num and <15 characters only');
        $('#userATMP').css('background-color', '#ff6363');
        $('#UAerror').show();
    }
});

$('.shopCard').click(function() {
    buy.play();
    
    var costO=$(this).children('.scInfo').children('.scM').text();
    var costN=costO.split('$');
    var costNo2=costN.join('');
    var costN2=parseInt(costNo2);
    
    if (pSession.money>=costN2) {
        if ($(this).parent().attr('id') == 'tcCont') {
            console.log('tc test');
            pSession.cards.push(cards[$(this).children('.shopICard').children().text()]);
        }
        if ($(this).parent().attr('id') == 'wcCont') {
            pSession.weapons.push(weapons[$(this).children('.shopICard').children().text()]);
        }
        if ($(this).parent().attr('id') == 'ecCont') {
            pSession.effects.push(effects[$(this).children('.shopICard').children().text()]);
        }
        
        pSession.money=pSession.money-costN2;
        cardsInit();
        updatePlayerXML();
    }
    console.log(pSession);
})

var cardsCur='CH';
$('#toCD').click(function() {
    if(cardsCur=='CH'){
        $('#CH').stop();
        $('#CD').stop();
        
        $('#CH').fadeOut('fast');
        $('#CD').fadeIn('fast');
        
        cardsCur='CD';
        return;
    }
    if(cardsCur=='CD'){
        $('#CH').stop();
        $('#CD').stop();
        
        $('#CD').fadeOut('fast');
        $('#CH').fadeIn('fast');
        
        cardsCur='CH';
        return;
    }
});

$(document).tooltip({
    track:true,
    show:{effect:'slideDown'},
    hide:false
});

$('#tcContCH').sortable({
    out:function(e,ui){
        console.log(e.target.id);
        var thing=e.target.id;
        var cCont=$('#'+thing);
        console.log(cCont.children());
        
        var x=0;
        pSession.cards=[];
        
        do{
            console.log(cCont.children().eq(x));
            pSession.cards[x]=cards[cCont.children().eq(x).children('.scInfo').children('.scNum').text()];
            
            x=x+1;
            console.log(x);
        }
        while(cCont.children().eq(x).length!=0);
        updatePlayerXML();
    }
});

$('#ecContCH').sortable({
    out:function(e,ui){
        console.log(e.target.id);
        var thing=e.target.id;
        var cCont=$('#'+thing);
        console.log(cCont.children());
        
        var x=0;
        pSession.effects=[];
        
        do{
            console.log(cCont.children().eq(x));
            pSession.cards[x]=effects[cCont.children().eq(x).children('.scInfo').children('.scNum').text()];
            
            x=x+1;
            console.log(x);
        }
        while(cCont.children().eq(x).length!=0);
        updatePlayerXML();
    }
});

$('#wcContCH').sortable({
    out:function(e,ui){
        console.log(e.target.id);
        var thing=e.target.id;
        var cCont=$('#'+thing);
        console.log(cCont.children());
        
        var x=0;
        pSession.weapons=[];
        
        do{
            console.log(cCont.children().eq(x));
            pSession.weapons[x]=weapons[cCont.children().eq(x).children('.scInfo').children('.scNum').text()];
            
            x=x+1;
            console.log(x);
        }
        while(cCont.children().eq(x).length!=0);
        updatePlayerXML();
    }
});

$('#tcContCD').sortable({
    out:function(e,ui){
        console.log(e.target.id);
        var thing=e.target.id;
        var cCont=$('#'+thing);
        console.log(cCont.children());
        
        var x=0;
        pSession.cDeck=[];
        
        do{
            console.log(cCont.children().eq(x));
            pSession.cDeck[x]=cards[cCont.children().eq(x).children('.scInfo').children('.scNum').text()];
            
            x=x+1;
            console.log(x);
        }
        while(cCont.children().eq(x).length!=0);
        updatePlayerXML();
    }
});

$('#ecContCD').sortable({
    out:function(e,ui){
        console.log(e.target.id);
        var thing=e.target.id;
        var cCont=$('#'+thing);
        console.log(cCont.children());
        
        var x=0;
        pSession.eDeck=[];
        
        do{
            console.log(cCont.children().eq(x));
            pSession.eDeck[x]=effects[cCont.children().eq(x).children('.scInfo').children('.scNum').text()];
            
            x=x+1;
            console.log(x);
        }
        while(cCont.children().eq(x).length!=0);
        updatePlayerXML();
    }
});

$('#wcContCD').sortable({
    out:function(e,ui){
        console.log(e.target.id);
        var thing=e.target.id;
        var cCont=$('#'+thing);
        console.log(cCont.children());
        
        var x=0;
        pSession.wDeck=[];
        
        do{
            console.log(cCont.children().eq(x));
            pSession.wDeck[x]=weapons[cCont.children().eq(x).children('.scInfo').children('.scNum').text()];
            
            x=x+1;
            console.log(x);
        }
        while(cCont.children().eq(x).length!=0);
        updatePlayerXML();
    }
});
$('#endBak').click(function() {
    Gconn.send("shnaw");
    
    $('#endMsg').fadeOut('fast');
    
    if(pSession.uID==-69){
        $('#chooseQP').fadeIn('fast');
    }
    else{
        $('#choose').fadeIn('fast');
    }
});

var remReq=false;
var remAcc=false;
var remDeny=false;

function remCheck() {
    if (remReq == true && remAcc == true) {
        boardReset();
        bMusic();
        if (hOt == 'heads') {
            decideCoin();
    
            var coinData = {
                'dataType': 'coin',
                'coinNum': rNum
            };
            Gconn.send(coinData);
        }
    }
}
$('#endBak').click(function() {
    Gconn.send("I'm out");
    mMusic();
    Gconn=null;
});

$('#shopChest').click(function() {
    $(this).hide();
    $('#CCbb').hide();
    chest();
});

var cInte=[];

function chest() {
    if (pSession.money > 9) {
        buy.play()
        pSession.money-=10;
        updatePlayerXML();
        
        $('#chestCont').fadeIn('fast', function() {
            var chestCards = [];
    
            for (var x = 0; x < 3; x++) {
                var randomCard = Math.floor(Math.random() * 11) + 0;
                chestCards[x] = randomCard;
                pSession.cards.push(cards[randomCard]);
            }
            for (var x = 0; x < 3; x++) {
                console.log("cc"+chestCards[x]);
            }
            cardsInit();
    
            cInte[0] = setInterval(chestCardFlip, 10, $('#chestCard2'), chestCards[0], 0);
            cInte[1] = setInterval(chestCardFlip, 10, $('#chestCard1'), chestCards[1], 1);
            cInte[2] = setInterval(chestCardFlip, 10, $('#chestCard3'), chestCards[2], 2);
        });
    }
    else{
        connError.play();
    }
}

var chF=[-180,-180,-180];

function chestCardFlip(c,n,a){
    chF[a]=chF[a]+1;
    
    c.css({transform:"rotateY("+chF[a]+"deg)"});
    
    if(chF[a]==-90){
        c.css('background-image', "url('Assets/Images/Cards/Characters/" + n + ".jpg')");
    }
    if(chF[a]==0){
        clearInterval(cInte[a]);
        cInte=[];
        chF=[];
        
        $('#CCbb').fadeIn('fast');
    }
    
    $('#CCbb').click(function() {
        $('#CCbb').fadeOut('fast');
        $('#shopChest').show();
        $('#chestCont').fadeOut('fast', function() {
            c.css({ transform: "rotateY(-180deg)" });
            c.css('background-image', "url('Assets/Images/Cards/back2.jpg')");
            
            chF=[-180,-180,-180];
        });
    });
}

$('#endRem').mousedown(function(){
    if (remDeny!=true){
        $(this).css('background-image',"url('Assets/Images/UI/html/gameEnd/endBtns/endRem/endRemB.png')");
    }
    else{
        connError.play();
    }
});
$('#endRem').mouseup(function() {
    if (remDeny != true) {
        $(this).css('background-image', "url('Assets/Images/UI/html/gameEnd/endBtns/endRem/endRemA.png')");

        Gconn.send('rematch');
        remReq = true;

        remCheck();
    }
    else{
        connError.play()
    }
});
$('.deny').click(function() {
    $('.accept').fadeOut('fast');
    $('.deny').fadeOut('fast');
    $('.connStat').text('Awaiting Connection');
});
$('.cancelBTN').click(function() {
    connecting.stop();
    connError.play();
    $('.connBTN').fadeIn('fast');
});