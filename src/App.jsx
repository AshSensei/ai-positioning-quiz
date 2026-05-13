import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { questions } from './data/questions'
import { computeResult } from './lib/scoring'
import QuizIntro from './components/QuizIntro'
import QuizQuestion from './components/QuizQuestion'
import QuizResult from './components/QuizResult'

export default function App() {
  const [screen, setScreen] = useState('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)

  function handleStart() {
    setScreen('question')
  }

  function handleAnswer(axis, score) {
    setAnswers(prev => {
      const updated = [...prev]
      updated[currentQuestion] = { axis, score }
      return updated
    })
  }

  function handleNext() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(i => i + 1)
    } else {
      setScreen('calculating')
    }
  }

  function handleRetake() {
    setScreen('intro')
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
  }

  useEffect(() => {
    if (screen !== 'calculating') return
    const timer = setTimeout(() => {
      setResult(computeResult(answers))
      setScreen('result')
    }, 1500)
    return () => clearTimeout(timer)
  }, [screen])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {screen === 'intro' && (
          <QuizIntro onStart={handleStart} />
        )}
        {screen === 'question' && (
          <QuizQuestion
            key={currentQuestion}
            question={questions[currentQuestion]}
            questionIndex={currentQuestion}
            total={questions.length}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        )}
        {screen === 'calculating' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center gap-6 py-24"
          >
            <p className="text-lg text-muted-foreground">Plotting your position...</p>
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}
        {screen === 'result' && result && (
          <QuizResult positionId={result.positionId} onRetake={handleRetake} />
        )}
      </div>
    </div>
  )
}
