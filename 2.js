const fs = require("fs");
let strings = fs.readFileSync("data/2.txt", "utf-8").split("\n");
let s

const result1 = strings.reduce((count, string) => {
	s = string.split(/-|\ |:\ /)
	return count += new RegExp(`^([^${s[2]}]*${s[2]}[^${s[2]}]*){${s[0]},${s[1]}}$`).test(s[3])
}, 0)

const result2 = strings.reduce((count, string) => {
	s = string.split(/-|\ |:\ /)
	return count += new RegExp(`(?=^.{${s[0] - 1}}${s[2]})(?=^.{${s[1] - 1}}[^${s[2]}])|(?=^.{${s[0] - 1}}[^${s[2]}])(?=^.{${s[1] - 1}}${s[2]})`).test(s[3])
}, 0)

console.log(result1, result2)
