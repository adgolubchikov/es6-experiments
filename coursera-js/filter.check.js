var lib = require('./filter.js');

var friends = [
  {

    name: 'Сэм',
    
    gender: 'Мужской',
    
    email: 'luisazamora@example.com',
    
    favoriteFruit: 'Картофель'
  
  },
  
  {
  
    name: 'Эмили',
    
    gender: 'Женский',
    
    email: 'roachpugh@example.com',
    
    favoriteFruit: 'Яблоко'
  
  }
];

var bestFriends = lib.query(

  friends,

  lib.select('name', 'gender', 'email'),

  lib.filterIn('favoriteFruit', ['Яблоко', 'Картофель'])

);

console.info(bestFriends);

/*

[

  { name: 'Сэм', gender: 'Мужской', email: 'luisazamora@example.com' },
  
  { name: 'Эмили', gender: 'Женский', email: 'roachpugh@example.com' }

]

*/
