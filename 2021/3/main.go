package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	var report [][]int
	fileName := "input"
	file, _ := os.Open(fileName)
	defer file.Close()
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		bits := strings.Split(line, "")
		nums := sliceAtoi(bits)
		report = append(report, nums)
	}

	result := process2(report)
	fmt.Println(result)

}

func process(report [][]int) int {
	var gamma []int
	for col := range report[0] {
		result := findMostCommonBit(report, col)
		gamma = append(gamma, result)
	}
	g := arrayToBinary(gamma)
	var epsilon []int
	for _, g := range gamma {
		if g == 1 {
			epsilon = append(epsilon, 0)
		} else {
			epsilon = append(epsilon, 1)
		}
	}
	e := arrayToBinary(epsilon)

	return g * e

}

func process2(report [][]int) int {
	o := findOxRating(report, 0)
	c := findCo2Rating(report, 0)
	return o * c

}

func findOxRating(report [][]int, col int) int {
	if len(report) <= 1 || col == len(report[0]) {
		return arrayToBinary(report[0])
	}
	common := findMostCommonBit(report, col)
	var newReport [][]int
	if common == 1 || common == -1 {
		for _, r := range report {
			if r[col] == 1 {
				newReport = append(newReport, r)
			}
		}
	} else {
		for _, r := range report {
			if r[col] == 0 {
				newReport = append(newReport, r)
			}
		}
	}

	return findOxRating(newReport, col+1)
}

func findCo2Rating(report [][]int, col int) int {
	if len(report) <= 1 || col == len(report[0]) {
		return arrayToBinary(report[0])
	}
	common := findMostCommonBit(report, col)
	var newReport [][]int
	if common == 1 || common == -1 {
		for _, r := range report {
			if r[col] == 0 {
				newReport = append(newReport, r)
			}
		}
	} else {
		for _, r := range report {
			if r[col] == 1 {
				newReport = append(newReport, r)
			}
		}
	}

	return findCo2Rating(newReport, col+1)
}

func findMostCommonBit(report [][]int, col int) int {
	common := make(map[int]int)
	for i := 0; i < len(report); i++ {
		bit := report[i][col]
		common[bit]++
	}

	highestVal := -1
	highestKey := -1

	for key, val := range common {
		if val > highestVal {
			highestVal = val
			highestKey = key
		}
	}
	isEqualLen := len(report)-common[highestKey] == common[highestKey]
	if isEqualLen {
		return -1
	}
	return highestKey

}

func sliceAtoi(str []string) []int {
	var nums []int
	for _, letter := range str {
		num, _ := strconv.Atoi(letter)
		nums = append(nums, num)
	}
	return nums
}

func arrayToBinary(nums []int) int {
	result := 0
	for _, num := range nums {
		result <<= 1
		if num == 1 {
			result |= 1
		}
	}
	return result
}
