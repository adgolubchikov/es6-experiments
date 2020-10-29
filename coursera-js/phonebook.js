var data = {};

module.exports = function(input) {
    if (input == 'SHOW') {
        let res = [];
        let arr = Object.keys(data);
        arr=arr.sort();
        let i, j;
        for (i = 0; i < arr.length; i++) {
			if (data[arr[i]].length!=0) res.push(arr[i] + ': ' + data[arr[i]].join(', '));
        }
        return res;
    }
    
	let cmd=input.split(' ')[0];
	let num=input.split(' ')[1]; let name=''; let nums=[];
	if (input.split(' ').length>2) {
		name=num;
		nums=input.split(' ')[2].split(',');
	}
	
    if (cmd == 'REMOVE_PHONE') {
        let arr = Object.keys(data);
        let i, j;
        for (i = 0; i < arr.length; i++) {
            let arr2 = data[arr[i]];
            for (j = 0; j < data[arr[i]].length; j++) {
                if (num == data[arr[i]][j]) {
					data[arr[i]].splice(j, 1);
					return true;
				}
            }
        }
        return false;
    }
    
    if (cmd == 'ADD') {
        if (data.hasOwnProperty(name)) {
            data[name] = data[name].concat(nums);
        } else {
            data[name] = nums;
        }
    }

}
