const fs = require("fs");
let strings = fs.readFileSync("data/2.txt", "utf-8").split("\n");
let s
let res = strings.filter(string => {
	s = string.split(/-|\ |:\ /)
	return new RegExp(`^([^${s[2]}]*${s[2]}[^${s[2]}]*){${s[0]},${s[1]}}$`).test(s[3])
}).length

console.log(res)
