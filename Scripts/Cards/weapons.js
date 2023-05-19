var weapons=[{
    'wID':0,
    'name':'Safety Scissors',
    'type':'attack',
    'SB':3,
    'img':'Assets/Images/Cards/Weapons/0.jpg',
    'cost':1,
    'desc':'Piercing damage, 3 SB to use',
    
    'effect':function(card,enemy){
        if(card=='params'){
            alert('test');
        }
    }
},
{
    'wID':1,
    'name':'Pencil',
    'type':'buff',
    'affects':'AP',
    'by':5,
    'SB':2,
    'img':'Assets/Images/Cards/Weapons/1.jpg',
    'cost':4,
    'desc':'+5 AP, 2 SB to use'
},
{
    'wID':2,
    'name':'Chemicals',
    'type':'attack',
    'SB':3,
    'img':'Assets/Images/Cards/Weapons/2.jpg',
    'cost':7,
    'desc':'Removes opponents buffs, 2 SB to use',
    
    'effect':function(card,enemy){
        if(enemy.eName=='Redacted'){
            //prevent Redacted effect
        }
        else{
            enemy
        }
    }
},
{
    'wID':3,
    'name':'Book',
    'type':'buff',
    'affects':'DP',
    'by':5,
    'SB':2,
    'img':'Assets/Images/Cards/Weapons/3.jpg',
    'cost':8,
    'desc':'+5 DP, 2 SB to use'
},
{
    'wID':4,
    'name':'Safety Glasses',
    'type':'buff',
    'affects':'DP',
    'by':3,
    'SB':1,
    'img':'Assets/Images/Cards/Weapons/4.jpg',
    'cost':4,
    'desc':'+3 DP, 1 SB to use'
},
{
    'wID':5,
    'name':'Ruler',
    'type':'buff',
    'affects':'AP',
    'by':3,
    'SB':1,
    'img':'Assets/Images/Cards/Weapons/5.jpg',
    'cost':4,
    'desc':'+3 AP, 1 SB to use'
},
{
    'wID':6,
    'name':'God Card',
    'type':'attack',
    'SB':0,
    'img':'Assets/Images/Cards/Weapons/6.jpg',
    'cost':7,
    'desc':'Redacted',
    
    'effect':function(card,enemy){
        if(enemy.eName=='Redacted'){
            //prevent Redacted effect
        }
        else{
            enemy
        }
    }
},]