/**
 * Styled-components theme matching the SCSS design tokens
 */

export const darkTheme = {
  colors: {
    bgPrimary:   '#0b0f19',
    bgSecondary: '#111827',
    bgCard:      '#1f2937',
    bgCardHover: '#374151',
    bgInput:     '#111827',
    bgElevated:  '#1f2937',

    textPrimary:   '#f9fafb',
    textSecondary: '#9ca3af',
    textMuted:     '#6b7280',
    textAccent:    '#818cf8',

    accentPrimary:      '#6366f1',
    accentPrimaryHover: '#818cf8',
    accentSubtle:       'rgba(99, 102, 241, 0.15)',
    accentSubtleHover:  'rgba(99, 102, 241, 0.25)',

    danger:       '#ef4444',
    dangerHover:  '#f87171',
    dangerSubtle: 'rgba(239, 68, 68, 0.15)',
    success:      '#10b981',
    successHover: '#34d399',
    warning:      '#f59e0b',
    info:         '#3b82f6',

    borderColor:      'rgba(255, 255, 255, 0.1)',
    borderColorHover: 'rgba(255, 255, 255, 0.2)',
    borderColorFocus: 'rgba(99, 102, 241, 0.5)',
  },
  fonts: {
    family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    sizeXs:   '0.75rem',
    sizeSm:   '0.875rem',
    sizeBase: '1rem',
    sizeLg:   '1.125rem',
    sizeXl:   '1.25rem',
    size2xl:  '1.5rem',
    size3xl:  '1.875rem',
    weightLight:    300,
    weightRegular:  400,
    weightMedium:   500,
    weightSemibold: 600,
    weightBold:     700,
  },
  spacing: {
    xs:  '0.25rem',
    sm:  '0.5rem',
    md:  '1rem',
    lg:  '1.5rem',
    xl:  '2rem',
    xxl: '3rem',
  },
  radii: {
    sm:   '0.3rem',
    md:   '0.5rem',
    lg:   '0.625rem',
    xl:   '0.75rem',
    xxl:  '1rem',
    full: '9999px',
  },
  shadows: {
    sm:    '0 1px 3px rgba(0, 0, 0, 0.4)',
    md:    '0 4px 12px rgba(0, 0, 0, 0.45)',
    lg:    '0 8px 32px rgba(0, 0, 0, 0.55)',
    focus: '0 0 0 3px rgba(79, 142, 247, 0.25)',
  },
  transitions: {
    fast: '120ms ease',
    base: '200ms ease',
    slow: '350ms ease',
  },
};

export const lightTheme: typeof darkTheme = {
  ...darkTheme,
  colors: {
    bgPrimary:   '#f9fafb',
    bgSecondary: '#ffffff',
    bgCard:      '#ffffff',
    bgCardHover: '#f3f4f6',
    bgInput:     '#ffffff',
    bgElevated:  '#ffffff',

    textPrimary:   '#111827',
    textSecondary: '#4b5563',
    textMuted:     '#9ca3af',
    textAccent:    '#4f46e5',

    accentPrimary:      '#6366f1',
    accentPrimaryHover: '#4f46e5',
    accentSubtle:       'rgba(99, 102, 241, 0.1)',
    accentSubtleHover:  'rgba(99, 102, 241, 0.2)',

    danger:       '#ef4444',
    dangerHover:  '#dc2626',
    dangerSubtle: 'rgba(239, 68, 68, 0.1)',
    success:      '#10b981',
    successHover: '#059669',
    warning:      '#f59e0b',
    info:         '#3b82f6',

    borderColor:      'rgba(0, 0, 0, 0.1)',
    borderColorHover: 'rgba(0, 0, 0, 0.2)',
    borderColorFocus: 'rgba(99, 102, 241, 0.4)',
  },
  shadows: {
    sm:    '0 1px 2px rgba(0, 0, 0, 0.05)',
    md:    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg:    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    focus: '0 0 0 3px rgba(99, 102, 241, 0.25)',
  },
};

export type Theme = typeof darkTheme;
