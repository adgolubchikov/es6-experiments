Array.prototype.sum = function(){return this.reduce((a, b) => (a+b), 0); };

console.log([1, 2, 3].sum());
