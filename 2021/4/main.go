package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

type Row struct {
	Spots [5]struct {
		Value   int
		checked bool
	}
}
type Card struct {
	Rows [5]Row
}

func main() {
	var numbers []int
	var cards []Card
	fileName := "test"
	file, _ := os.Open(fileName)
	defer file.Close()
	scanner := bufio.NewScanner(file)
	scanner.Scan()
	inputs := strings.Split(scanner.Text(), ",")
	for _, input := range inputs {
		num, _ := strconv.Atoi(input)
		numbers = append(numbers, num)
	}
	//ignore first empty line
	scanner.Scan()

	count := 0
	var card Card
	for scanner.Scan() {
		if count == 5 {
			cards = append(cards, card)
			count = 0
			continue
		}
		var row Row
		pattern := regexp.MustCompile(`\s+`)
		inputs := pattern.Split(strings.TrimSpace(scanner.Text()), -1)
		for i, input := range inputs {
			num, _ := strconv.Atoi(input)
			row.Spots[i].Value = num
		}

		card.Rows[count] = row
		count++
	}
	//add last card
	cards = append(cards, card)

	// firstCardWin(cards, numbers)
	lastCardWin(cards, numbers)
	// printCards(cards)

}

func firstCardWin(cards []Card, numbers []int) {
	for _, number := range numbers {
		bingo, cardIndex := markNumber(cards, number)
		if bingo {
			fmt.Println(calScore(cards[cardIndex], number))
			break
		}
	}
}

func lastCardWin(cards []Card, numbers []int) {
	for _, number := range numbers {
		bingo, cardIndex := markNumber(cards, number)
		for bingo {
			if len(cards) == 1 {
				fmt.Println(calScore(cards[cardIndex], number))
				return
			}
			cards = append(cards[:cardIndex], cards[cardIndex+1:]...)
			bingo, cardIndex = markNumber(cards, number)
		}
	}

}

func calScore(card Card, winningNum int) int {
	sum := 0
	for _, row := range card.Rows {
		for _, s := range row.Spots {
			if !s.checked {
				sum += s.Value
			}
		}
	}
	return sum * winningNum
}
func markNumber(cards []Card, number int) (bool, int) {
	for ci := range cards {
		for ri := range cards[ci].Rows {
			for si := range cards[ci].Rows[ri].Spots {
				s := &cards[ci].Rows[ri].Spots[si]
				if !s.checked && s.Value == number {
					s.checked = true
					bingo := checkBingo(cards[ci], ri, si)
					if bingo {
						return true, ci
					}
				}
			}
		}
	}
	return false, -1
}

func checkBingo(card Card, row int, col int) bool {
	c := func() bool {
		for _, c := range card.Rows {
			if !c.Spots[col].checked {
				return false
			}
		}
		return true
	}()
	if c {
		return c
	}
	for _, c := range card.Rows[row].Spots {
		if !c.checked {
			return false
		}
	}
	return true
}

func printCards(cards []Card) {
	for _, card := range cards {
		for _, r := range card.Rows {

			for _, s := range r.Spots {
				mark := ""
				if s.checked {
					mark = "x"
				}
				fmt.Printf("%2v%2d", mark, s.Value)
			}
			fmt.Println()
		}
		fmt.Println()
	}
}
