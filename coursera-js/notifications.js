module.exports = {
	on: function (event, subscriber, handler) {
		if (subscriber === undefined) {
			return this;
		} else {
			if(!this.hasOwnProperty(event)){
				this[event] = [];
			}
			this[event].push({
				subscriber: subscriber,
				handler: handler.bind(subscriber)
			});
			return this;
		}
	},
	off: function (event, subscriber) {
		if (this[event] == undefined) {
			return this;
		} else if (this.hasOwnProperty(event) && subscriber === undefined) {
			this[event].splice(0, this[event].length);
			return this;
		} else {
			if (this.hasOwnProperty(event)) {
				for (let i = this[event].length - 1; i >= 0; --i) {

					if(this[event][i].subscriber === subscriber) {
						this[event].splice(i, 1);
					}
				}
				return this;
			}
		}
	},
	emit: function (event) {
		if (this[event] != undefined && this[event].length > 0) {
			this[event].forEach(item => item.handler());
		}
	 	return this;
	}
};
