import { createMachine } from 'xstate'

export const trafficLight = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcBOBDAZpglgYwFoAbHKAC2QDpVIBiAZQHUBJAFQGEAJAbQAYBdRKAAOAe1g5kOUQDshIAB6IAjAA5KvAKy8ALL14A2AOwBmEwZ3LNAGhABPFTp2VlJzQE4LWgEyblv7wBfQNs0LFxCEnIqOzAiIlEAd1ZRAHEaMBkGFg4eAXkxCSlZeSUEEyMDSk0jd29PZR0DE14K2wcEb31KI0qDVVreX10h4NCMbHxiUgpKWPiklIAlOiY2Lj5BJBBCyWk5bbLvZSqT3jUjY9ardx12xFVNSgNed3cBo00-Ax+TMZAwpNIjMqFAMlk1rlNgVxHsSodEJoDE8dJpUa93uZPvcEMo1D0vu5NKpmjpanUDMEQiAZKIIHB5ICItNojCivtSogCPVKLciW8TN5fsSbPYucpKKp3PpXLxeoLfDV-kyplFZjQIGy4QdQGU3M8vo86pZ6vUnDjHs9lDL9F8KgZPMqJsy1TE4glkmlwVrijrFCpKhpHud-NazEZlEYcV1eD0+siXt56uY-tSVcDonN3YtRCtNdtdr7OeVLryTo9y6plNKDBangZredbZp7Y6087VSDKGCwJkfRyEQhtEYrbdUd5HqpUbWxZ1ur0fgmhsnmlTAkA */
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
