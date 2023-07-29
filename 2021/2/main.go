package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	depth := 0
	horizontal := 0
	aim := 0

	fileName := "input"
	file, _ := os.Open(fileName)
	defer file.Close()
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		result := strings.Split(line, " ")
		nav := result[0]
		unit, _ := strconv.Atoi(result[1])
		process2(&depth, &horizontal, &aim, nav, unit)

	}
	fmt.Println(depth * horizontal)
}

func process(depth *int, horizontal *int, nav string, unit int) {
	switch nav {
	case "forward":
		*horizontal += unit
	case "down":
		*depth += unit
	case "up":
		*depth -= unit
	}
}
func process2(depth *int, horizontal *int, aim *int, nav string, unit int) {
	switch nav {
	case "forward":
		*horizontal += unit
		*depth += *aim * unit
	case "down":
		*aim += unit
	case "up":
		*aim -= unit
	}
}
