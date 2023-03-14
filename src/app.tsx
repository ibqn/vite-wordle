import { BackspaceIcon } from '@heroicons/react/24/solid'
import { classNames } from '@/utils/class-names'
import { useCallback, useMemo, useState } from 'preact/compat'

import targetWords from '@/data/target-words.json'
import dictionary from '@/data/dictionary.json'

const keyboardRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
]

const buttonClasses = 'ml-1.5 h-[58px] rounded font-bold uppercase text-white'

export const App = () => {
  const [firstRow, secondRow, thirdRow] = useMemo(() => keyboardRows, [])

  const [words, setWords] = useState(Array.from({ length: 6 }, () => ''))
  const [currentRow, setCurrentRow] = useState(0)

  const [targetWord] = useState(
    targetWords[Math.floor(Math.random() * targetWords.length)]
  )
  const [fullMatch, setFullMatch] = useState('')

  console.log('words', words)
  console.log('current row', currentRow)
  console.log('full match', fullMatch)
  console.log(targetWord)

  const handleLetterPress = (letter: string) => () => {
    if (words[currentRow].length === 5) {
      return
    }

    setWords(
      words.map((word, index) => (index === currentRow ? word + letter : word))
    )
  }

  const handleRemove = () => {
    setWords(
      words.map((word, index) =>
        index === currentRow ? word.slice(0, -1) : word
      )
    )
  }

  const handleEnter = () => {
    if (currentRow > 5) {
      return
    }

    if (words[currentRow].length !== 5) {
      return
    }

    if (!dictionary.includes(words[currentRow])) {
      return
    }

    let newFullMatch = fullMatch
    words[currentRow].split('').forEach((letter, index) => {
      if (targetWord[index] === letter && !newFullMatch.includes(letter)) {
        newFullMatch += letter
      }
    })

    setFullMatch(newFullMatch)
    setCurrentRow(currentRow + 1)
  }

  const getBackgroundStyles = (letter: string) => {
    const usedLetters = words.slice(0, Math.max(0, currentRow)).join('')

    if (!usedLetters.includes(letter)) {
      return 'bg-[#818384]'
    }

    if (fullMatch.includes(letter)) {
      return 'bg-[#538d4e]'
    }

    if (usedLetters.includes(letter) && targetWord.includes(letter)) {
      return 'bg-[#b59f3b]'
    }

    return 'bg-[#3a3a3c]'
  }

  const addRowKeyboard = useCallback(
    (keyboardRow: string[]) =>
      keyboardRow.map((letter, index) => {
        return (
          <button
            className={classNames(
              buttonClasses,
              'flex-1 text-base',
              getBackgroundStyles(letter)
            )}
            key={index}
            onClick={handleLetterPress(letter)}
          >
            {letter}
          </button>
        )
      }),
    [fullMatch, words, targetWord, currentRow]
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#121213]">
      <div className="mb-8 grid h-[420px] w-[350px] grid-rows-6 gap-1.5 p-2.5">
        {words.map((word, rowIndex) => {
          let remainingLetters: string

          if (currentRow > rowIndex) {
            remainingLetters = targetWord
            word.split('').forEach((wordLetter, wordIndex) => {
              if (targetWord[wordIndex] === wordLetter) {
                remainingLetters = remainingLetters.replace(wordLetter, '')
              }
            })
          }
          return (
            <div className="grid grid-cols-5 gap-1.5" key={rowIndex}>
              {word
                .padEnd(5, ' ')
                .split('')
                .map((letter, letterIndex) => {
                  let bgStyles = 'border-2 border-solid border-[#3a3a3c]'

                  if (currentRow > rowIndex) {
                    bgStyles = 'bg-[#3a3a3c]'

                    if (targetWord[letterIndex] === letter) {
                      bgStyles = 'bg-[#538d4e]'
                    } else if (remainingLetters.includes(letter)) {
                      remainingLetters = remainingLetters.replace(letter, '')
                      bgStyles = 'bg-[#b59f3b]'
                    }
                  }

                  return (
                    <div
                      className={classNames(
                        'flex items-center justify-center',
                        'text-2xl font-bold uppercase text-white',
                        bgStyles
                      )}
                      key={letterIndex}
                    >
                      {letter}
                    </div>
                  )
                })}
            </div>
          )
        })}
      </div>

      <div className="mx-2 flex w-[500px] flex-col">
        <div className="mb-2 flex flex-1">{addRowKeyboard(firstRow)}</div>
        <div className="mb-2 flex flex-1">
          <div className="flex-[0.5]"></div>
          {addRowKeyboard(secondRow)}
          <div className="flex-[0.5]"></div>
        </div>
        <div className="mb-2 flex flex-1">
          <button
            onClick={handleEnter}
            className={classNames(
              buttonClasses,
              'flex-[1.5] text-xs',
              'bg-[#818384]'
            )}
          >
            enter
          </button>
          {addRowKeyboard(thirdRow)}
          <button
            className={classNames(
              buttonClasses,
              'flex flex-[1.5] items-center justify-center',
              'bg-[#818384]'
            )}
            onClick={handleRemove}
          >
            <BackspaceIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </main>
  )
}
