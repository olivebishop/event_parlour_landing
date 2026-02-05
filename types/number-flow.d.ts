declare module "@number-flow/react" {
  interface NumberFlowProps {
    value: number
    format?: Intl.NumberFormatOptions
    locales?: Intl.LocalesArgument
    prefix?: string
    suffix?: string
    className?: string
    animated?: boolean
  }

  const NumberFlow: React.ComponentType<NumberFlowProps>
  export default NumberFlow
}

