import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    icon: {
      primary: string;
      secondary: string;
      muted: string;
      inverse: string;
    };
  }

  interface PaletteOptions {
    icon?: {
      primary?: string;
      secondary?: string;
      muted?: string;
      inverse?: string;
    };
  }
}