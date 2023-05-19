    var images = {};
    
    //Asset loading
    var sources = {
        bGround: 'Assets/Images/UI/Canvas/bg.jpg',

        signUL: 'Assets/Images/UI/Canvas/Buttons/SInocl.png',
        signCL: 'Assets/Images/UI/Canvas/Buttons/SIcl.png',
        quickUL: 'Assets/Images/UI/Canvas/Buttons/QPnocl.png',
        quickCL: 'Assets/Images/UI/Canvas/Buttons/QPcl.png',

        backPR: 'Assets/Images/UI/html/Buttons/BKpr.png',
        backUP: 'Assets/Images/UI/html/Buttons/BKup.png',
        cretPR: 'Assets/Images/UI/html/Buttons/CRpr.jpg',
        cretUP: 'Assets/Images/UI/html/Buttons/CRup.jpg',
        sinePR: 'Assets/Images/UI/html/Buttons/SIpr.jpg',
        sineUP: 'Assets/Images/UI/html/Buttons/SIup.jpg',

        thing: 'Assets/Images/UI/html/signOL.jpg',
        thing2:'Assets/Images/UI/html/shop/chestUP.png',
        thing3:'Assets/Images/UI/html/shop/chestPR.png',
        
        //Cards
        a: 'Assets/Images/Cards/Characters/0.jpg',
        a1: 'Assets/Images/Cards/Characters/1.jpg',
        a2: 'Assets/Images/Cards/Characters/2.jpg',
        a3: 'Assets/Images/Cards/Characters/3.jpg',
        a4: 'Assets/Images/Cards/Characters/4.jpg',
        a5: 'Assets/Images/Cards/Characters/5.jpg',
        a6: 'Assets/Images/Cards/Characters/6.jpg',
        a7: 'Assets/Images/Cards/Characters/8.jpg',
        a8: 'Assets/Images/Cards/Characters/9.jpg',
        a9: 'Assets/Images/Cards/Characters/10.jpg',
        
        //GUI
        
        //Main Menu
        mBg: 'Assets/Images/UI/html/menu/menu.jpg',
        m1: 'Assets/Images/UI/html/menu/cardsPR.png',
        m2: 'Assets/Images/UI/html/menu/cardsUP.png',
        m3: 'Assets/Images/UI/html/menu/playPR.png',
        m4: 'Assets/Images/UI/html/menu/playUP.png',
        m5: 'Assets/Images/UI/html/menu/shopPR.png',
        m6: 'Assets/Images/UI/html/menu/shopUP.png',
        
        //Cards
        cBg: 'Assets/Images/UI/html/cards/CHbg.jpg',
        c1: 'Assets/Images/UI/html/cards/toPR.png',
        c2: 'Assets/Images/UI/html/cards/toUP.png',
        
        //Play
        pBg: 'Assets/Images/UI/html/play/choose/QPbg.jpg',
        p1: 'Assets/Images/UI/html/play/choose/cnBTN.jpg',
        p2: 'Assets/Images/UI/html/play/choose/cnBTNpr.jpg',
        p3: 'Assets/Images/UI/html/play/choose/hostBTN.jpg',
        p4: 'Assets/Images/UI/html/play/choose/hostBTNpr.jpg',
        
        //Host
        s1: 'Assets/Images/UI/html/play/host/startUP.png',
        s2: 'Assets/Images/UI/html/play/host/startPR.png',
        s3: 'Assets/Images/UI/html/play/host/acceptUP.png',
        s4: 'Assets/Images/UI/html/play/host/acceptPR.png',
        
        //Conn
        p5: 'Assets/Images/UI/html/play/conn/connectBTN.jpg',
        p6: 'Assets/Images/UI/html/play/conn/connectBTNpr.jpg',
        
        //Shop
        shBg: 'Assets/Images/UI/html/shop/SHbg.jpg',
        b1: 'Assets/Images/UI/html/shop/Characters.png',
        b2: 'Assets/Images/UI/html/shop/weapons.png',
        b3: 'Assets/Images/UI/html/shop/effects.png',
        b4: 'Assets/Images/UI/html/shop/browseButtonPR.png',
        b5: 'Assets/Images/UI/html/shop/browseButtonUP.png',
        
        //gameEnd
        qBG: 'Assets/Images/UI/html/gameEnd/gameend.jpg',
        q1: 'Assets/Images/UI/html/gameEnd/endBtns/endBak/endBakA.png',
        q2: 'Assets/Images/UI/html/gameEnd/endBtns/endBak/endBakB.png',
    };
    
    //Calls the image loader
    loadImages(sources, function(images) {
        //update();
    });
    //end image loader