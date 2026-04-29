import 'styled-components';
import type { ITheme } from '@vision-ui/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
