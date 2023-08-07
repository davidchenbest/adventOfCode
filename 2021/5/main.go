package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	var starts [][]int
	var ends [][]int
	fileName := "input"
	file, _ := os.Open(fileName)
	defer file.Close()
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		points := strings.Split(scanner.Text(), " -> ")
		first := strings.Split(points[0], ",")
		second := strings.Split(points[1], ",")

		starts = append(starts, strsToNum(first))
		ends = append(ends, strsToNum(second))
	}
	maxx, maxy := findMaxXY(append(starts, ends...))
	cords := make([][]int, maxy+1)
	for i := range cords {
		cords[i] = make([]int, maxx+1)
	}

	process(starts, ends, cords)
	// print(cords)

}

func process(starts, ends [][]int, cords [][]int) {
	for i := range starts {
		fillCords(cords, starts[i], ends[i])
	}
	count := 0
	for _, r := range cords {
		for _, c := range r {
			if c > 1 {
				count++
			}
		}
	}
	fmt.Println(count)
}

func compare(i int, j int) (int, int) {
	if i > j {
		return j, i
	}
	return i, j
}
func fillCords(cords [][]int, start []int, end []int) {
	x1 := start[0]
	y1 := start[1]
	x2 := end[0]
	y2 := end[1]
	if x1 == x2 {
		min, max := compare(y1, y2)
		for i := min; i <= max; i++ {
			cords[i][x1]++
		}
	} else if y1 == y2 {
		min, max := compare(x1, x2)
		for i := min; i <= max; i++ {
			cords[y1][i]++
		}
	} else {
		// diagonal line
		//mark the end point
		cords[y2][x2]++
		for x1 != x2 && y1 != y2 {
			cords[y1][x1]++
			if x1 < x2 {
				x1++
			} else {
				x1--
			}
			if y1 < y2 {
				y1++
			} else {
				y1--
			}
		}

	}

}
func findMaxXY(cords [][]int) (int, int) {
	maxx := 0
	maxy := 0
	for _, cord := range cords {
		x := cord[0]
		y := cord[1]
		if maxx < x {
			maxx = x
		}
		if maxy < y {
			maxy = y
		}
	}
	return maxx, maxy
}

func strsToNum(strs []string) []int {
	var nums []int
	for _, str := range strs {
		num, _ := strconv.Atoi(str)
		nums = append(nums, num)
	}
	return nums
}

func print(cords [][]int) {
	for _, row := range cords {
		for _, col := range row {
			fmt.Printf("%2d", col)
		}
		fmt.Println()
	}
}
