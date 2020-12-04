const fs = require("fs");
let strings = fs.readFileSync("data/4.txt", "utf-8").split("\n\n");

let regexp1 = new RegExp(['byr','iyr','eyr','hgt','hcl','ecl','pid'].reduce((str, key) => {
	return str += '(?=[\\s\\S]*' + key+ ')'
}, ''))

const result1 = strings.reduce((nbrValid, passport) => nbrValid += regexp1.test(passport), 0)


let rulesWithSpan = [
	{ rule: 'byr:[1,2][9,0]\\d\\d', key: 'byr', from: 1920, to: 2002 },
	{ rule: 'iyr:20[1,2]\\d', 		key: 'iyr', from: 2010, to: 2020 },
	{ rule: 'eyr:20[2,3]\\d', 		key: 'eyr', from: 2020, to: 2030 },
	{ rule: 'hgt:\\d{2,3}(cm|in)', 	key: 'hgt', in: {from:59, to:76}, cm: {from:150, to:193}},
]
let rules = rulesWithSpan.concat([
	{ rule: 'hcl:#(\\d|[a-f]){6}', 	key: 'hcl' },
	{ rule: 'ecl:(amb|blu|brn|gry|grn|hzl|oth)', key: 'ecl' },
	{ rule: 'pid:\\d{9}', 			key: 'pid' }
])

let regexp2 = new RegExp(rules.reduce((str, obj) => {
	return str += '(?=[\\s\\S]*' + obj.rule + '(\\s|$))'
}, ''))

const result2 = strings.reduce((nbrValid, passport) => {
	return nbrValid += (
		regexp2.test(passport) &&
		rulesWithSpan.every(r => {
			m = passport.match(RegExp(`(?<=${r.key}:).*?(?=\\s|$)`))[0]
			if (r.hasOwnProperty('from')) {
				return m >= r.from && m <= r.to
			} else {
				return m.slice(0, m.length - 2) >= r[m.slice(m.length - 2)].from &&
					m.slice(0, m.length - 2) <= r[m.slice(m.length - 2)].to
			}
		})
	)
},0)

console.log(result1, result2)
