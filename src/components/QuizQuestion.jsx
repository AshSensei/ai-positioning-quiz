import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ProgressBar from './ProgressBar'

export default function QuizQuestion({ question, questionIndex, total, onAnswer, onNext }) {
  const [selected, setSelected] = useState(null)

  function handleSelect(option) {
    setSelected(option)
    onAnswer(question.axis, option.score)
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6"
    >
      <ProgressBar current={questionIndex + 1} total={total} />

      <div className="flex flex-col gap-4">
        {question.quote && (
          <blockquote className="border-l-2 border-primary pl-4 py-1">
            <p className="text-sm italic text-muted-foreground">
              "{question.quote.text}"
            </p>
            <footer className="text-xs text-muted-foreground/70 mt-1">
              — {question.quote.source}
            </footer>
          </blockquote>
        )}

        <p className="text-lg font-medium text-foreground leading-snug">
          {question.text}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {question.options.map((option, i) => {
          const isSelected = selected?.text === option.text
          return (
            <motion.div
              key={i}
              whileTap={{ scale: 1.02 }}
              transition={{ duration: 0.15 }}
            >
              <Card
                onClick={() => handleSelect(option)}
                className={`p-4 cursor-pointer text-left transition-colors h-full ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/40'
                }`}
              >
                <p className="text-sm text-foreground leading-snug">
                  {option.text}
                </p>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={selected === null}>
          {questionIndex === total - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </motion.div>
  )
}
