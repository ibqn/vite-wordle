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

const buttonClasses = 'h-[58px] rounded font-bold uppercase text-white'

export const App = () => {
  const [firstRow, secondRow, thirdRow] = useMemo(() => keyboardRows, [])

  const [words, setWords] = useState(Array.from({ length: 6 }, () => ''))
  const [currentRow, setCurrentRow] = useState(0)

  const [targetWord] = useState(
    targetWords[Math.floor(Math.random() * targetWords.length)]
  )
  const [fullMatch, setFullMatch] = useState('')

  const [shake, setShake] = useState(false)

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
      setShake(true)
      return
    }

    if (!dictionary.includes(words[currentRow])) {
      setShake(true)
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
            <div
              className={classNames(
                'grid grid-cols-5 gap-1.5',
                currentRow === rowIndex && shake && 'animate-shake'
              )}
              onAnimationEnd={() => setShake(false)}
              key={rowIndex}
            >
              {word
                .padEnd(5, ' ')
                .split('')
                .map((letter, letterIndex) => {
                  let bgStyles = classNames(
                    'border-2 border-solid',
                    letter.trim() ? 'border-[#565758]' : 'border-[#3a3a3c]'
                  )

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
                        bgStyles,
                        letter.trim() && 'animate-popin'
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

      <div className="flex w-full max-w-[500px] flex-col gap-y-2 px-2">
        <div className="flex flex-1 gap-x-1.5">{addRowKeyboard(firstRow)}</div>
        <div className="flex flex-1 gap-x-1.5">
          <div className="flex-[0.35]"></div>
          {addRowKeyboard(secondRow)}
          <div className="flex-[0.35]"></div>
        </div>
        <div className="flex flex-1 gap-x-1.5">
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
