import { useMachine } from '@xstate/react'
import { trafficLight } from '@/machine'
import { cn } from '@/util'
import { useEffect, useMemo, useState } from 'react'
import { Play, Pause } from 'lucide-react'

export const App = () => {
  const [state, send] = useMachine(trafficLight)
  const [stopped, setStopped] = useState(false)

  const timeoutValue = useMemo(() => {
    if (state.matches('yellowToRed')) {
      return 2000
    }

    if (state.matches('yellowToGreen')) {
      return 1000
    }

    if (state.matches('red')) {
      return 4000
    }

    return 5000
  }, [state])

  useEffect(() => {
    let timeoutId: number

    const handleSwitch = () => send({ type: 'SWITCH' })

    if (!stopped) {
      timeoutId = window.setTimeout(handleSwitch, timeoutValue)
    }

    return () => window.clearTimeout(timeoutId)
  })

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold">Traffic light</h2>
        <div className="flex flex-col items-center gap-2 rounded bg-slate-200 p-4 shadow">
          <div
            className={cn(
              'h-10 w-10 rounded-full bg-slate-400',
              (state.matches('red') || state.matches('yellowToGreen')) &&
                'bg-red-700'
            )}
          ></div>
          <div
            className={cn(
              'h-10 w-10 rounded-full bg-slate-400',
              (state.matches('yellowToRed') ||
                state.matches('yellowToGreen')) &&
                'bg-yellow-400'
            )}
          ></div>
          <div
            className={cn(
              'h-10 w-10 rounded-full bg-slate-400',
              state.matches('green') && 'bg-green-600'
            )}
          ></div>
        </div>

        <div className="flex w-24 flex-col gap-2">
          <button
            className="rounded border border-slate-500 px-4 py-1"
            onClick={() => send({ type: 'SWITCH' })}
          >
            switch
          </button>
          <button
            className="rounded border border-slate-500 px-4 py-1"
            onClick={() => setStopped(!stopped)}
          >
            <div className="flex flex-row items-center">
              {stopped ? (
                <>
                  <Play className="-mb-0.5 h-4" />
                  <span>start</span>
                </>
              ) : (
                <>
                  <Pause className="-mb-0.5 h-4" />
                  <span>stop</span>
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
