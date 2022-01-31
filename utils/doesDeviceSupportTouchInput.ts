const doesDeviceSupportTouchInput = (): boolean =>
  'ontouchstart' in window || window.navigator?.maxTouchPoints > 0

export default doesDeviceSupportTouchInput
