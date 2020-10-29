

module.exports = function(input) {
	let tempdate=new Date(parseInt(input.split(' ')[0].split('-')[0]), 
	                      parseInt(input.split(' ')[0].split('-')[1])-1,
	                      parseInt(input.split(' ')[0].split('-')[2]),
	                      parseInt(input.split(' ')[1].split(':')[0]),
	                      parseInt(input.split(' ')[1].split(':')[1])); 
	let tempvalue=tempdate.getFullYear()+'-'+(tempdate.getMonth()+1>9 ? tempdate.getMonth()+1 : '0'+(tempdate.getMonth()+1))+'-'+
			(tempdate.getDate()>9 ? tempdate.getDate() : '0'+tempdate.getDate())+' '+
			(tempdate.getHours()>9 ? tempdate.getHours() : '0'+tempdate.getHours())+':'+
			(tempdate.getMinutes()>9 ? tempdate.getMinutes() : '0'+tempdate.getMinutes());
    return {
		date: new Date(input),
		value: tempvalue,
		add: function(num, type) {
			if (num<0) throw new TypeError('Error');
			if (!((type=='minutes') || (type=='hours') || (type=='days') || (type=='months') || (type=='years'))) throw new TypeError('Error');
			
			if (type=='minutes') this.date.setTime(this.date.getTime()+1000*60*num);
			if (type=='hours') this.date.setTime(this.date.getTime()+1000*60*60*num);
			if (type=='days') this.date.setTime(this.date.getTime()+1000*60*60*24*num);
			if (type=='months') this.date.setMonth(this.date.getMonth()+num);
			if (type=='years') this.date.setFullYear(this.date.getFullYear()+num);
			this.value=this.getValue();
			return this;
		},
		subtract: function (num, type) {
			if (num<0) throw new TypeError('Error');
			if (!((type=='minutes') || (type=='hours') || (type=='days') || (type=='months') || (type=='years'))) throw new TypeError('Error');
			
			if (type=='minutes') this.date.setTime(this.date.getTime()-1000*60*num);
			if (type=='hours') this.date.setTime(this.date.getTime()-1000*60*60*num);
			if (type=='days') this.date.setTime(this.date.getTime()-1000*60*60*24*num);
			if (type=='months') this.date.setMonth(this.date.getMonth()-num);
			if (type=='years') this.date.setFullYear(this.date.getFullYear()-num);
			this.value=this.getValue();
			return this;
		},
		getValue: function() {
			return this.date.getFullYear()+'-'+(this.date.getMonth()+1>9 ? this.date.getMonth()+1 : '0'+(1+this.date.getMonth()))+'-'+
			(this.date.getDate()>9 ? this.date.getDate() : '0'+this.date.getDate())+' '+
			(this.date.getHours()>9 ? this.date.getHours() : '0'+this.date.getHours())+':'+
			(this.date.getMinutes()>9 ? this.date.getMinutes() : '0'+this.date.getMinutes());
		}
	};
}
