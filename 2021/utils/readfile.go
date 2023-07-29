package utils

import (
	"bufio"
	"os"
	"strconv"
)

func ReadFile(fileName string) ([]int, error) {
	var lines []int

	file, err := os.Open(fileName)
	if err != nil {
		return lines, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		line := scanner.Text()
		if num, err := strconv.Atoi(line); err == nil {
			lines = append(lines, num)
		}
	}

	return lines, nil
}
