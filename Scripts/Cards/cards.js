var cards=[
    {
        'cardID':0,
        'type':'reg',
        'name':'Redacted',
        'gender':'male',
        'img':'Assets/Images/Cards/Characters/0.jpg',
        'HP':100,
        'AP':10,
        'DP':5,
        'SB':2,
        
        'effect': function(cardNum){
            effBuff('P','E',cardNum,'DP',2);
        },
        'efDef':'Pixie Cut (Right click)&#013; The defense of this card goes up by 2',
        
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
    {
        'cardID':1,
        'type':'woke',
        'name':'Redacted',
        'gender':'male',
        'img':'Assets/Images/Cards/Characters/1.jpg',
        'HP':100,
        'AP':10,
        'DP':5,
        'SB':2,
        
        'effect':function(){
            alert('Redacted');
        },
        
        'efDef':'Pixie Cut (Right click)&#013; The defense of this card goes up by 2',
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
    {
        'cardID':2,
        'type':'reg',
        'name':'Redacted',
        'gender':'male',
        'img':'Assets/Images/Cards/Characters/2.jpg',
        'HP':105,
        'AP':10,
        'DP':5,
        'SB':2,
        
        'efDef':"Foresight (Right click)&#013; Roll a die, if it lands on 3 the next turns SB is increased by 1",
        'effect':function(){
            alert('Redacted');
        },
        
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
    {
        'cardID':3,
        'type':'reg',
        'name':'Redacted',
        'gender':'male',
        'img':'Assets/Images/Cards/Characters/3.jpg',
        'HP':105,
        'AP':12,
        'DP':7,
        'SB':3,
        
        'efDef':'Sharpen (Right click)&#013; Attack goes up by 2',
        'effect':function(){
            alert('Redacted');
        },
        
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
    {
        'cardID':4,
        'type':'reg',
        'name':'Redacted',
        'gender':'male',
        'img':'Assets/Images/Cards/Characters/4.jpg',
        'HP':100,
        'AP':10,
        'DP':6,
        'SB':2,
        
        'effect':function(){
            alert('Redacted');
        },
        
        'efDef':"Newtons Revenge (Right click)&#013; Equipping bowling balls increases your defense by 2",
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
    {
        'cardID':5,
        'type':'reg',
        'name':'Redacted',
        'gender':'female',
        'img':'Assets/Images/Cards/Characters/5.jpg',
        'HP':90,
        'AP':8,
        'DP':7,
        'SB':2,
        
        'effect':function(){
            alert('Redacted');
        },
        
        'efDef':'Market Crash (Right click)&#013; Harsh economic conditions have toughened you, +3 defense',
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
    {
        'cardID':6,
        'type':'reg',
        'name':'Redacted',
        'gender':'female',
        'img':'Assets/Images/Cards/Characters/6.jpg',
        'HP':110,
        'AP':10,
        'DP':6,
        'SB':2,
        
        'effect':function(){
            alert('Redacted');
        },
        
        'efDef':'Tech Support (Right click)&#013; Support yourself by restoring 15 health',
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
    {
        'cardID':7,
        'type':'reg',
        'name':'Redacted',
        'gender':'male',
        'img':'Assets/Images/Cards/Characters/6.jpg',
        'HP':115,
        'AP':11,
        'DP':6,
        'SB':3,
        
        'effect':function(){
            alert('Redacted');
        },
        
        'efDef':'Meditate (Right click)&#013; Roll a die, if it lands on 6, health is healed by 5',
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
    {
        'cardID':8,
        'type':'woke',
        'name':'Donofrio',
        'gender':'male',
        'img':'Assets/Images/Cards/Characters/6.jpg',
        'HP':230,
        'AP':22,
        'DP':12,
        'SB':4,
        
        'effect':function(){
            alert('Redacted');
        },
        
        'efDef':'Lecture (Right click)&#013; Roll a die, if it lands on 4, the opponent loses a turn',
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
    {
        'cardID':9,
        'type':'reg',
        'name':'Redacted',
        'gender':'female',
        'img':'Assets/Images/Cards/Characters/6.jpg',
        'HP':110,
        'AP':12,
        'DP':6,
        'SB':2,
        
        'effect':function(){
            alert('Redacted');
        },
        
        'efDef':'Self Motivation (Right click)&#013; Roll a die, if it lands on 3, defense increases by 1',
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
    {
        'cardID':10,
        'type':'reg',
        'name':'Redacted',
        'gender':'male',
        'img':'Assets/Images/Cards/Characters/6.jpg',
        'HP':95,
        'AP':8,
        'DP':7,
        'SB':2,
        
        'effect':function(){
            alert('Redacted');
        },
        
        'efDef':'Self Motivation (Right click)&#013; Roll a die, if it lands on 1, defense increases by 5',
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
    {
        'cardID':11,
        'type':'reg',
        'name':'Redacted',
        'gender':'female',
        'img':'Assets/Images/Cards/Characters/6.jpg',
        'HP':90,
        'AP':9,
        'DP':6,
        'SB':2,
        
        'effect':function(){
            alert('Redacted');
        },
        
        'efDef':'Most Dangerous Game (Right click)&#013; Defense goes up by 1, for survival.',
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
    {
        'cardID':12,
        'type':'reg',
        'name':'Redacted',
        'gender':'male',
        'img':'Assets/Images/Cards/Characters/6.jpg',
        'HP':90,
        'AP':7,
        'DP':4,
        'SB':2,
        
        'effect':function(){
            alert('Redacted');
        },
        
        'efDef':'Self Motivation (Right click)&#013; Roll a die, if it lands on 1, defense increases by 5',
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
    {
        'cardID':13,
        'type':'woke',
        'name':'Redacted',
        'gender':'male',
        'img':'Assets/Images/Cards/Characters/6.jpg',
        'HP':180,
        'AP':14,
        'DP':8,
        'SB':2,
        
        'effect':function(){
            alert('Redacted');
        },
        
        'efDef':'Self Motivation (Right click)&#013; Roll a die, if it lands on 1, defense increases by 5',
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
    {
        'cardID':14,
        'type':'reg',
        'name':'Redacted',
        'gender':'female',
        'img':'Assets/Images/Cards/Characters/6.jpg',
        'HP':100,
        'AP':9,
        'DP':5,
        'SB':2,
        
        'effect':function(){
            alert('Redacted');
        },
        
        'efDef':'Self Motivation (Right click)&#013; Roll a die, if it lands on 1, defense increases by 5',
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
    {
        'cardID':15,
        'type':'reg',
        'name':'Redacted',
        'gender':'female',
        'img':'Assets/Images/Cards/Characters/6.jpg',
        'HP':90,
        'AP':6,
        'DP':6,
        'SB':2,
        
        'effect':function(){
            alert('Redacted');
        },
        
        'efDef':'Self Motivation (Right click)&#013; Roll a die, if it lands on 1, defense increases by 5',
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
    {
        'cardID':16,
        'type':'reg',
        'name':'Redacted',
        'gender':'male',
        'img':'Assets/Images/Cards/Characters/6.jpg',
        'HP':105,
        'AP':8,
        'DP':7,
        'SB':2,
        
        'effect':function(){
            alert('Redacted');
        },
        
        'efDef':'Self Motivation (Right click)&#013; Roll a die, if it lands on 1, defense increases by 5',
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
    {
        'cardID':17,
        'type':'woke',
        'name':'Redacted',
        'gender':'male',
        'img':'Assets/Images/Cards/Characters/6.jpg',
        'HP':210,
        'AP':16,
        'DP':14,
        'SB':2,
        
        'effect':function(){
            alert('Redacted');
        },
        
        'efDef':'Self Motivation (Right click)&#013; Roll a die, if it lands on 1, defense increases by 5',
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
    {
        'cardID':18,
        'type':'reg',
        'name':'Redacted',
        'gender':'male',
        'img':'Assets/Images/Cards/Characters/6.jpg',
        'HP':50,
        'AP':11,
        'DP':20,
        'SB':2,
        
        'effect':function(){
            alert('Redacted');
        },
        
        'efDef':'Self Motivation (Right click)&#013; Roll a die, if it lands on 1, defense increases by 5',
        'weapon':'',
        'weaponNum':'',
        'actEffect':''
    },
];

function effBuff(st,t,c,s,a){
    console.log('Effect call');
        buff(st,c,s,a);
    
        var buffData = {
            'dataType': 'buff',
            'type': t,
            'cIndex': c,
            'stat': s,
            'amount': a
        };
    
        Gconn.send(buffData);
        console.log('Effect done');
}