import { MappedEnum, RequireOnlyOne } from "@/lib/helpers/generic-types"
import { bitwiseOr } from "@/lib/helpers/numbers"
import { PropsWithChildren } from "react"

const enum SpinnerSize {
  small = 1,
  medium = 2,
  large = 4,
}

type SpinnerSizes<T> = MappedEnum<typeof SpinnerSize, T>

function toSpinner(n: number): SpinnerSize {
  switch (n) {
    case SpinnerSize.small:
      return SpinnerSize.small
    case SpinnerSize.medium:
      return SpinnerSize.medium
    case SpinnerSize.large:
      return SpinnerSize.large
    default:
      return SpinnerSize.medium
  }
}

const SpinnerValues = {
  [SpinnerSize.small]: '12',
  [SpinnerSize.medium]: '16',
  [SpinnerSize.large]: '24',
}

export type SpinnerProps = Partial<RequireOnlyOne<SpinnerSizes<boolean>>> & PropsWithChildren

export function getValuesBySize(props: SpinnerProps): string {
  return SpinnerValues[
    toSpinner(
      bitwiseOr([props.small, props.medium, props.large])
    )
  ]
}