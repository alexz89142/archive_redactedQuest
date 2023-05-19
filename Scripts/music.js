    //Songs
    var menu = new Howl({src: ['Assets/Audio/Music/menu.mp3'],autoplay:false,loop:true});
    var shop = new Howl({src: ['Assets/Audio/Music/shop.ogg'],loop:true});
    var battleM = new Howl({src: ['Assets/Audio/Music/battle.mp3'],loop:true});

    //Battle SFX
    var attackSfx = new Howl({src:['Assets/Audio/SFX/Battle/attack.mp3']});
    var placeCard = new Howl({src:['Assets/Audio/SFX/Battle/cardplace.wav']});
    var lose = new Howl({src:['Assets/Audio/SFX/Battle/lose.mp3']});
    var statD = new Howl({src:['Assets/Audio/SFX/Battle/statdecrease.wav']});
    var statI = new Howl({src:['Assets/Audio/SFX/Battle/statincrease.mp3']});
    var win = new Howl({src:['Assets/Audio/SFX/Battle/win.mp3']});

    //GUI SFX
    var connected = new Howl({src:['Assets/Audio/SFX/GUI/connected.wav']});
    var connecting = new Howl({src:['Assets/Audio/SFX/GUI/connecting.wav'],loop:true});
    var connError = new Howl({src:['Assets/Audio/SFX/GUI/connectionerror.wav']});
    var click = new Howl({src:['Assets/Audio/SFX/GUI/click.wav']});
    var back = new Howl({src:['Assets/Audio/SFX/GUI/back.wav']});
    var buy = new Howl({src:['Assets/Audio/SFX/GUI/buy.ogg']})
    
    function mMusic(){
        menu.play();
        win.stop()
        lose.stop()
        battleM.stop();
    }
    
    function bMusic(){
        menu.stop();
        win.stop()
        lose.stop()
        battleM.play();
    }
    
    $('.connBTN').click(function(){
        connecting.play();
    });
    $('.CObb').click(function(){
        connecting.stop();
    })