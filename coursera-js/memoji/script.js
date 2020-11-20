const Memoji = {
	app: document.querySelector('#app'),
	winbutton: document.querySelector('#win button'),
	losebutton: document.querySelector('#lose button'),
	values: '🐮 🐓 🦃 🐟 🦄 🐞 🐮 🐓 🦃 🐟 🦄 🐞'.split(' '),
	timer: document.querySelector('#timer'),
	duration: 60,

	cards: {},
	cardsSelected: [],
	cardsFlipped: 0,
	isStarted: false,
	init: function() {
		this.start();

		let self = this;
		this.app.onclick = function(event) {
			if (event.target.classList.contains('side')) {
				let target = self.cards[event.target.parentNode.id];
				if (!self.isStarted) {
					self.isStarted = true;
					self.run();
				}

				if (target.node.classList.contains('rotate')) return; //igrone clicks on rotated cards

				if (!target.node.classList.contains('rotate') && self.cardsSelected.length < 2) {
					target.node.classList.add('rotate');

					if (self.cardsSelected.length == 0) {
						self.cardsSelected[0] = target;
					}
					else if (self.cardsSelected.length == 1) {
						self.cardsSelected[1] = target;
						//matching 2 opened
						if (self.cardsSelected[0].value == self.cardsSelected[1].value) {
							self.cardsSelected[0].node.classList.add('match');
							self.cardsSelected[1].node.classList.add('match');
							self.cardsSelected = [];
							self.cardsFlipped += 2;
							if (self.cardsFlipped == self.values.length) self.win();
						}
						else {
							self.cardsSelected[0].node.classList.add('mismatch');
							self.cardsSelected[1].node.classList.add('mismatch');
						}
					}
					//click on closed + 2 opened mismatch
				}
				else if (!target.node.classList.contains('rotate') && self.cardsSelected.length == 2) {
					self.cardsSelected[0].node.classList.remove('rotate');
					self.cardsSelected[1].node.classList.remove('rotate');
					self.cardsSelected[0].node.classList.remove('mismatch');
					self.cardsSelected[1].node.classList.remove('mismatch');
					self.cardsSelected = [];
					target.node.classList.add('rotate');
					self.cardsSelected[0] = target;
				}
			}
		};
		this.winbutton.onclick = function() {
			clearTimeout(self.finish);
			clearInterval(self.counter);
			document.querySelector('#win').style.display = 'none';
			document.querySelector('#lose').style.display = 'none';
			document.querySelector('#message').style.display = 'none';
			self.cards = {};
			self.cardsSelected = [];
			self.cardsFlipped = 0;
			self.isStarted = false;
			self.start();
		};
		this.losebutton.onclick = this.winbutton.onclick;
	},
	start: function() {
		this.values = this.values.sort(() => Math.random() - 0.5); //shuffle

		//Making cards and card elements
		this.app.innerHTML = '';
		for (let i = 0; i < this.values.length; i++) {
			let temp = document.createElement('div');
			temp.setAttribute('id', i);
			temp.className = 'card';
			temp.innerHTML = '<div class="side front">' + this.values[i] + '</div><div class="side back"></div>';
			this.app.appendChild(temp);
			this.cards[i] = {
				id: i,
				value: this.values[i],
				node: temp
			};
		}

		//Timer setup
		if (this.duration % 60 < 10) {
			this.timer.innerText = Math.floor(this.duration / 60) + ':0' + this.duration % 60;
		}
		else {
			this.timer.innerText = Math.floor(this.duration / 60) + ':' + this.duration % 60;
		}
	},
	run: function() {
		let seconds = this.duration, self=this;

		this.counter = setInterval(function() {
			seconds--;
			if (seconds >= 10) {
				this.timer.innerText = '0:' + seconds;
			}
			else if (seconds < 10 && seconds > 0) {
				this.timer.innerText = '0:0' + seconds;
			}
			else if (seconds == 0) {
				this.timer.innerText = '0:0' + seconds;
				clearInterval(this.counter);
			}
		}, 1000);

		this.finish = setTimeout(function() {
			if (self.cardsFlipped !== self.values.length) {
				self.lose();
			}
		}, seconds * 1000);
	},
	win: function() {
		clearInterval(this.counter);
		document.querySelector('#win').style.display = 'block';
		document.querySelector('#message').style.display = 'flex';
	},
	lose: function() {
		clearInterval(this.counter);
		document.querySelector('#lose').style.display = 'block';
		document.querySelector('#message').style.display = 'flex';
	}
}


Memoji.init();
