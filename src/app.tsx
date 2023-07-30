import { useMachine } from '@xstate/react'
import { trafficLight } from '@/machine'
import { cn } from '@/util'
import { useEffect, useMemo, useState } from 'react'

export const App = () => {
  const [state, send] = useMachine(trafficLight)
  const [stopped, setStopped] = useState(false)

  const timeoutValue = useMemo(() => {
    if (state.matches('yellowToRed') || state.matches('yellowToGreen')) {
      return 2000
    }

    return 5000
  }, [state])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    function handleSwitch() {
      send('SWITCH')
      console.log('switch')
    }

    if (!stopped) {
      timeoutId = setTimeout(handleSwitch, timeoutValue)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  })

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h2> Traffic light</h2>
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

        <button
          className="rounded border border-slate-500 px-4 py-1"
          onClick={() => send('SWITCH')}
        >
          switch
        </button>
        <button
          className="rounded border border-slate-500 px-4 py-1"
          onClick={() => setStopped(!stopped)}
        >
          {stopped ? 'start' : 'stop'}
        </button>
      </div>
    </div>
  )
}
