module.exports = {
    query: function(database, ...operations) {
        if (arguments.length === 1) return database;
        let copy = JSON.parse(JSON.stringify(database));
        operations.sort((a, b) => (a[0] == 'filterIn' ? -1 : 1));
        operations.forEach(function(operation) {
			if (operation[0]=='select') {
                copy.forEach(function(item) {
                    let keys = Object.keys(item);
                    keys.forEach(function(key) {
                        if (!operation[1].includes(key)) delete item[key];
                    });
                });
			}
			else {
				let fieldName = operation[1];
                let values = operation[2];
                copy = copy.filter(function(item) {
                    if (item[fieldName] === undefined) return false;
                    if (Array.isArray(values)) {
						if (values.includes(item[fieldName])) return true;
					}
					else if (values === item[fieldName]) return true;
                    return false;
                });
			}
        });
        return copy;
    },
    select: function(...fields) {
        return ['select', fields];
    },
    filterIn: function(fieldName, values) {
        return ['filterIn', fieldName, values];
    }
};
