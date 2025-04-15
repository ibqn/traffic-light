import { createMachine } from 'xstate'

export const trafficLight = createMachine({
  id: 'traffic-light',
  initial: 'red',
  states: {
    red: {
      on: {
        SWITCH: 'yellowToGreen',
      },
    },

    yellowToGreen: {
      on: {
        SWITCH: 'green',
      },
    },

    yellowToRed: {
      on: {
        SWITCH: 'red',
      },
    },

    green: {
      on: {
        SWITCH: 'yellowToRed',
      },
    },
  },
})
