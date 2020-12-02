const fs = require("fs");
let nbrs = fs.readFileSync("data/1.txt", "utf-8").split("\n").map(Number);

let tmp, answer1, answer2
for (let i of nbrs) {
	tmp = nbrs.find(j => j + i === 2020)
	if (tmp) {
		answer1 = i * tmp
		break;
	}
}

console.log("Svar på uppgift 1:", answer1)

for (let i = 0; i < nbrs.length; i++) {
	for (let j = 0; j < nbrs.length; j++) {
		tmp = nbrs.find(k => {
			return nbrs[i] + nbrs[j] + k === 2020
		})
		if (tmp) {
			answer2 = nbrs[i] * nbrs[j] * tmp
			break;
		}
	}
}

console.log("Svar på uppgift 2:", answer2)