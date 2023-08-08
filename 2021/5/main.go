package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var starts [][]int
	var ends [][]int
	fileName := "test"
	file, _ := os.Open(fileName)
	defer file.Close()
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		var x1, y1, x2, y2 int
		fmt.Sscanf(scanner.Text(), "%d,%d -> %d,%d", &x1, &y1, &x2, &y2)
		starts = append(starts, []int{x1, y1})
		ends = append(ends, []int{x2, y2})

	}

	process2(starts, ends)
}

func process(starts, ends [][]int) {
	M := make(map[string]int)
	for i := range starts {
		x1 := starts[i][0]
		y1 := starts[i][1]
		x2 := ends[i][0]
		y2 := ends[i][1]
		if x1 == x2 || y1 == y2 {
			key := fmt.Sprintf("%v,%v", x1, y1)
			M[key]++
			for x1 != x2 || y1 != y2 {
				if x1 > x2 {
					x1--
				} else if x2 > x1 {
					x1++
				}
				if y1 > y2 {
					y1--
				} else if y2 > y1 {
					y1++
				}
				key := fmt.Sprintf("%v,%v", x1, y1)
				M[key]++
			}
		}
	}
	count := 0
	for key := range M {
		if M[key] > 1 {
			count++
		}
	}
	fmt.Println(count)
}

func process2(starts, ends [][]int) {
	M := make(map[string]int)
	for i := range starts {
		x1 := starts[i][0]
		y1 := starts[i][1]
		x2 := ends[i][0]
		y2 := ends[i][1]
		key := fmt.Sprintf("%v,%v", x1, y1)
		M[key]++
		for x1 != x2 || y1 != y2 {
			if x1 > x2 {
				x1--
			} else if x2 > x1 {
				x1++
			}
			if y1 > y2 {
				y1--
			} else if y2 > y1 {
				y1++
			}
			key := fmt.Sprintf("%v,%v", x1, y1)
			M[key]++
		}
	}
	count := 0
	for key := range M {
		if M[key] > 1 {
			count++
		}
	}
	fmt.Println(count)
}
