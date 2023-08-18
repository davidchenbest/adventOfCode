package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

var print = fmt.Println

func main() {
	unique := make(map[int]int)
	unique[2] = 1
	unique[4] = 4
	unique[3] = 7
	unique[7] = 8
	countsUnique := 0

	fileName := "test"
	file, _ := os.Open(fileName)
	defer file.Close()
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		outputs := strings.Split(strings.Split(line, " | ")[1], " ")
		for _, out := range outputs {
			l := len(out)
			_, exists := unique[l]
			if exists {
				countsUnique++
			}
		}
	}
	print(countsUnique)

}
