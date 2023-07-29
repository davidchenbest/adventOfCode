package main

import (
	"advent/utils"
	"fmt"
	"reflect"
)

func main() {
	lines, err := utils.ReadFile("input")
	if err != nil {
		fmt.Println(err)
		return
	}
	// fmt.Println(process(lines))
	fmt.Println(process2(lines))

}

func process(lines []int) int {
	fmt.Println(reflect.TypeOf(lines[0]))
	var pre int = lines[0]
	var count int
	for _, line := range lines {
		if pre < line {
			count++
		}
		pre = line
	}
	return count
}

func process2(lines []int) int {
	window := lines[:3]
	count := 0
	for i := 1; i < len(lines); i++ {
		next := lines[i : i+3]
		if sum(window) < sum(next) {
			count++
		}
		window = next
	}
	return count

}

func process2b(lines []int) int {
	window := sum(lines[:3])
	count := 0
	for i := 1; i < len(lines)-2; i++ {
		next := window - lines[i-1] + lines[i+2]
		if window < next {
			count++
		}
		window = next
	}
	return count

}

func sum(nums []int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}
