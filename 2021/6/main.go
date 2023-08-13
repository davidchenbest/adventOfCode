package main

import (
	"advent/utils"
	"bufio"
	"fmt"
	"os"
	"strings"
)

var print = fmt.Println

func main() {
	fileName := "input"
	file, _ := os.Open(fileName)
	defer file.Close()
	scanner := bufio.NewScanner(file)
	scanner.Scan()
	line := scanner.Text()
	nums := utils.StringsToInt(strings.Split(line, ","))
	process2(nums)
}

func process2(nums []int) {
	//optimize solution of first process
	/*
		keep track of how many fish in each life cycle
	*/
	var days [9]int
	for _, num := range nums {
		days[num]++
	}

	for i := 0; i < 256; i++ {
		var temp [9]int
		for i := 8; i > -1; i-- {
			if i == 0 {
				temp[8] = days[0]
				temp[6] += days[0]
			} else {
				temp[i-1] = days[i]
			}
		}
		days = temp
		// print(days)
	}

	sum := 0
	for _, num := range days {
		sum += num
	}
	print(sum)
}

func process(nums []int) {
	for i := 0; i < 80; i++ {
		for i, num := range nums {
			if num == 0 {
				nums[i] = 6
				nums = append(nums, 8)
			} else {

				nums[i]--
			}
		}
		// print(nums)
	}
	print(len(nums))
}
