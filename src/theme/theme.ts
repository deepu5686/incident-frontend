import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
    text: {
      primary: '#010048',
      secondary: '#4b5563',
    },
    divider: '#e5e7eb',

    action: {
      active: '#374151',    // 👈 default icon color
      hover: '#111827',
      disabled: '#9ca3af',
    },
    icon: {
      primary: '#272757',

    }
  },
  shape: {
    borderRadius: 8,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#ce93d8',
    },
    background: {
      default: '#111827',
      paper: '#1f2937',
    },
    text: {
      primary: '#f3f4f6',
      secondary: '#9ca3af',
    },
    divider: '#374151',

    action: {
      active: '#e5e7eb',   // 👈 default icon color (light on dark)
      hover: '#ffffff',
      disabled: '#6b7280',
    },
    icon: {
      primary: '#90EE90'
    }
  },
  shape: {
    borderRadius: 8,
  },
});