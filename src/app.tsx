import { BackspaceIcon } from '@heroicons/react/24/solid'
import { classNames } from '@/utils/class-names'
import { useState } from 'preact/compat'

import targetWords from '@/data/target-words.json'
import dictionary from '@/data/dictionary.json'

const keyboardRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
]

const buttonClasses = 'ml-1.5 h-[58px] rounded font-bold uppercase text-white'

export const App = () => {
  const [firstRow, secondRow, thirdRow] = keyboardRows

  const [words, setWords] = useState(Array.from({ length: 6 }, () => ''))
  const [currentRow, setCurrentRow] = useState(0)

  const [targetWord] = useState(
    targetWords[Math.floor(Math.random() * targetWords.length)]
  )

  console.log('words', words)
  console.log('current row', currentRow)
  console.log(targetWord)

  const handleLetterPress = (letter: string) => () => {
    if (words[currentRow].length === 5) {
      return
    }

    setWords(
      words.map((word, index) =>
        index === currentRow ? word + letter.toLowerCase() : word
      )
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
    if (words[currentRow].length !== 5) {
      return
    }

    if (currentRow > 5) {
      return
    }

    if (!dictionary.includes(words[currentRow])) {
      return
    }

    setCurrentRow(currentRow + 1)
  }

  const getBackground = (letter: string) => {
    const tryWords = words.slice(0, Math.min(0, currentRow - 1))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#121213]">
      <div className="grid h-[420px] w-[350px] grid-rows-6 gap-1.5 p-2.5">
        {words.map((word, rowIndex) => {
          return (
            <div className="grid grid-cols-5 gap-1.5" key={rowIndex}>
              {word
                .padEnd(5, ' ')
                .split('')
                .map((letter, letterIndex) => {
                  let bgColor

                  if (currentRow > rowIndex) {
                    bgColor = 'bg-[#3a3a3c]'

                    if (targetWord.includes(letter)) {
                      bgColor = 'bg-[#b59f3b]'
                    }

                    if (targetWord[letterIndex] === letter) {
                      bgColor = 'bg-[#538d4e]'
                    }
                  }

                  return (
                    <div
                      className={classNames(
                        'flex items-center justify-center',
                        'text-2xl font-bold uppercase text-white',
                        bgColor
                          ? bgColor
                          : 'border-2 border-solid border-[#3a3a3c]'
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
        <div className="mb-2 flex flex-1">
          {firstRow.map((button, index) => {
            return (
              <button
                className={classNames(
                  buttonClasses,
                  'flex-1 text-base',
                  'bg-[#818384]'
                )}
                key={index}
                onClick={handleLetterPress(button)}
              >
                {button}
              </button>
            )
          })}
        </div>
        <div className="mb-2 flex flex-1">
          <div className="flex-[0.5]"></div>
          {secondRow.map((button, index) => {
            return (
              <button
                className={classNames(
                  buttonClasses,
                  'flex-1 text-base',
                  'bg-[#818384]'
                )}
                key={index}
                onClick={handleLetterPress(button)}
              >
                {button}
              </button>
            )
          })}
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
          {thirdRow.map((button, index) => {
            return (
              <button
                className={classNames(
                  buttonClasses,
                  'flex-1 text-base',
                  'bg-[#818384]'
                )}
                key={index}
                onClick={handleLetterPress(button)}
              >
                {button}
              </button>
            )
          })}
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
