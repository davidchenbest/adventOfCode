package main

import (
	"advent/utils"
	"bufio"
	"fmt"
	"os"
	"strings"
)

var print = fmt.Println

type FuelNeeded struct {
	results map[int]int
}

func (f *FuelNeeded) get(i int) int {
	if i < 2 {
		return i
	}
	if f.results[i] > 0 {
		return f.results[i]
	}
	// print(i)
	result := i + f.get(i-1)
	f.results[i] = result
	return result

}
func main() {
	fileName := "input"
	file, _ := os.Open(fileName)
	defer file.Close()
	scanner := bufio.NewScanner(file)
	scanner.Scan()
	line := scanner.Text()
	positions := utils.StringsToInt(strings.Split(line, ","))
	process2(positions)

}
func process(positions []int) {
	var results []int
	for i := 0; i < len(positions); i++ {
		pos := positions[i]
		steps := 0
		for _, p := range positions {
			steps += abs(pos - p)
		}
		results = append(results, steps)

	}
	print(findMin(results))
}

func process2(positions []int) {
	fuelNeeded := FuelNeeded{results: make(map[int]int)}

	var results []int
	for i := 0; i < len(positions); i++ {
		fuel := calTotalForPos(positions, fuelNeeded, positions[i])
		results = append(results, fuel)

	}
	//find new lowest cost position nearby intial lowest cost position
	cost, i := findMin(results)
	position := positions[i]
	left := position - 1
	right := position + 1

	for {
		leftV := calTotalForPos(positions, fuelNeeded, left)
		if leftV >= cost {
			break
		}
		print(left)
		cost = leftV
		left--
	}
	for {
		rightV := calTotalForPos(positions, fuelNeeded, right)
		if rightV >= cost {
			break
		}
		print(right)

		cost = rightV
		right++
	}
	print(cost)
}

func calTotalForPos(positions []int, fuelNeeded FuelNeeded, pos int) int {
	fuel := 0
	for _, p := range positions {
		steps := abs(pos - p)
		// print(steps)
		fuel += fuelNeeded.get(steps)
	}
	return fuel
}

func abs(n int) int {
	if n < 0 {
		return n * -1
	}
	return n
}

func findMin(nums []int) (int, int) {
	min := nums[0]
	index := -1
	for i, n := range nums {
		if min > n {
			min = n
			index = i
		}
	}
	return min, index
}
