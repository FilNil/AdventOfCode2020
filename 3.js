const fs = require("fs");
let strings = fs.readFileSync("data/3.txt", "utf-8").split("\n");
let matrix = strings.map(s => s.split(''))


// Part 1
let x = 0
let y = 0
const result1 = matrix.reduce((treesHit, path, i) => {
	x += 1
	y += 3
	if(x < matrix.length) {
		if (y >= path.length) {
			y = y - path.length
		}
		treesHit += matrix[x][y] === '#'
	}
	return treesHit
}, 0)

// Part 2
let slopes = [[1,1],[1,3],[1,5],[1,7],[2,1]].map(x => ({
	x_inc: x[0], y_inc: x[1], x: 0, y: 0, hits: 0,
}))

for (const i in matrix) {
	slopes.forEach(s => {
		s.x += s.x_inc
		s.y += s.y_inc

		if (s.x < matrix.length) {
			if (s.y >= matrix[i].length) {
				s.y = s.y - matrix[i].length
			}
			s.hits += matrix[s.x][s.y] === '#'
		}
	})
}

const result2 = slopes.reduce((totalHits, s) => totalHits *= s.hits, 1)

console.log(result1, result2)