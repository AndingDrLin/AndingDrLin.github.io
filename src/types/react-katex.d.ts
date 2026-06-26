declare module 'react-katex' {
  import type { ComponentType } from 'react';

  interface KaTeXProps {
    math: string;
    errorColor?: string;
    renderError?: (error: Error) => React.ReactNode;
  }

  export const InlineMath: ComponentType<KaTeXProps>;
  export const BlockMath: ComponentType<KaTeXProps>;
}
