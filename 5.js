const fs = require("fs");
let strings = fs.readFileSync("data/5.txt", "utf-8").split("\n");

function binarySearch(p, rules) {
	if (rules.length === 1) {
		return p[['R', 'B'].includes(rules[0]) ? 1 : 0]
	}
	return binarySearch(
		['R', 'B'].includes(rules.shift()) ? [(p[1] - p[0] + 1) / 2 + p[0], p[1]] : [p[0], (p[1] - p[0] + 1) / 2 - 1 + p[0]],
		rules
	)
}

let sum, rules
const result1 = strings.reduce((highest, s) => {
	rules = s.split('')
	sum = (binarySearch([0, 127], rules.slice(0, 7)) * 8) + binarySearch([0, 7], rules.slice(7, 10))
	return highest > sum ? highest : sum
}, 0)

const result2 = strings.map(s => {
	rules = s.split('')
	return (binarySearch([0, 127], rules.slice(0, 7)) * 8) + binarySearch([0, 7], rules.slice(7, 10))
}).sort().find((id, i, ids) => ids[i] + 1 === ids[i + 1] - 1) + 1

console.log(result1, result2)