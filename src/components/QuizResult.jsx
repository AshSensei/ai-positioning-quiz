import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { positions } from '@/data/positions'
import MatrixDisplay from './MatrixDisplay'

export default function QuizResult({ positionId, onRetake }) {
  const position = positions[positionId]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-8 py-8"
    >
      <div className="flex flex-col gap-3">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl font-semibold tracking-tight text-foreground"
        >
          {position.name}
        </motion.h1>

        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary">{position.xLabel}</Badge>
          <Badge variant="secondary">{position.yLabel}</Badge>
        </div>
      </div>

      <MatrixDisplay highlightedId={positionId} />

      <p className="text-base text-foreground/80 leading-relaxed">
        {position.description}
      </p>

      <div className="rounded-lg border bg-muted/40 p-4 flex flex-col gap-3 text-sm text-muted-foreground leading-relaxed">
        <p>
          No position is better or worse than another — the best fit depends on
          your workflow, experience level, and the specific problem you're solving.
        </p>
        <p>
          Mixed positioning is normal. You might sit in one position for some
          work while landing somewhere else entirely for other aspects. You
          shouldn't expect to fit neatly inside a single box.
        </p>
      </div>

      <div className="flex justify-center">
        <Button variant="outline" onClick={onRetake}>
          Retake quiz
        </Button>
      </div>
    </motion.div>
  )
}
