const fs = require("fs");
let strings = fs.readFileSync("data/6.txt", "utf-8").split("\n\n");

const result1 = strings.reduce((sum, s) => sum += new Set(s.replace(/\s/g, '').split('')).size, 0)
	
let splitString
const result2 = strings.reduce((sum, group) => {
	splitString = group.split('\n').map(s => [...new Set(s.split(''))])
	if(splitString.length === 1) {
		return sum += splitString[0].length
	}
	return sum += splitString.reduce((a, b) => [...b].filter(Set.prototype.has, new Set(a))).length
}, 0)

console.log(result1, result2)