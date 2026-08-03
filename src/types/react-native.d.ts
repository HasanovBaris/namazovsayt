/**
 * Minimal TypeScript surface for react-native-web.
 *
 * react-native-web ships Flow types, not TypeScript, and the full
 * `react-native` type package pulls in a large native-only API surface we do
 * not use. This declares only the components and helpers this site actually
 * imports.
 */
declare module 'react-native' {
  import type { ComponentType, ReactNode, CSSProperties } from 'react'

  export type Style = CSSProperties & Record<string, unknown>
  export type ViewStyle = Style
  export type TextStyle = Style
  export type StyleProp<T = Style> =
    | T
    | false
    | null
    | undefined
    | readonly StyleProp<T>[]

  interface AccessibilityProps {
    nativeID?: string
    testID?: string
    role?: string
    'aria-label'?: string
    'aria-hidden'?: boolean
    'aria-level'?: number
    dataSet?: Record<string, string | number | undefined>
  }

  export interface ViewProps extends AccessibilityProps {
    children?: ReactNode
    style?: StyleProp<ViewStyle>
    pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only'
  }
  export const View: ComponentType<ViewProps>

  export interface TextProps extends AccessibilityProps {
    children?: ReactNode
    style?: StyleProp<TextStyle>
    numberOfLines?: number
    selectable?: boolean
  }
  export const Text: ComponentType<TextProps>

  export interface PressableStateCallbackType {
    hovered?: boolean
    pressed?: boolean
    focused?: boolean
  }
  export interface PressableProps extends AccessibilityProps {
    children?: ReactNode | ((state: PressableStateCallbackType) => ReactNode)
    style?:
      | StyleProp<ViewStyle>
      | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
    onPress?: () => void
    disabled?: boolean
  }
  export const Pressable: ComponentType<PressableProps>

  export interface ScrollViewProps extends ViewProps {
    horizontal?: boolean
    showsHorizontalScrollIndicator?: boolean
    showsVerticalScrollIndicator?: boolean
    contentContainerStyle?: StyleProp<ViewStyle>
  }
  export const ScrollView: ComponentType<ScrollViewProps>

  export const StyleSheet: {
    create<T extends Record<string, Style>>(styles: T): T
    flatten(style?: StyleProp): Style
    absoluteFillObject: Style
    hairlineWidth: number
  }

  export function useWindowDimensions(): {
    width: number
    height: number
    scale: number
    fontScale: number
  }

  export const Linking: {
    openURL(url: string): Promise<void>
    canOpenURL(url: string): Promise<boolean>
  }

  export const Platform: {
    OS: 'web'
    select<T>(specifics: { web?: T; default?: T }): T
  }

  /** Used only by the render smoke test, to extract the generated stylesheet. */
  export const AppRegistry: {
    registerComponent(name: string, getComponent: () => ComponentType): void
    getApplication(
      name: string,
      options?: { initialProps?: object },
    ): {
      element: import('react').ReactElement
      getStyleElement(): import('react').ReactElement
    }
  }
}
