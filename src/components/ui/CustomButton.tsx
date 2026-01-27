// ...existing code...
import { Button, CircularProgress } from '@mui/material';

interface ButtonProps {
  isPending: boolean;
  buttonText?: string;
  startIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const CustomButton = (props: ButtonProps) => {
  const { isPending, buttonText, startIcon, fullWidth } = props;

  const isIconOnly = !buttonText && !!startIcon;
  const content = isPending
    ? <CircularProgress size={24} />
    : isIconOnly
      ? startIcon
      : buttonText;

  const startIconProp = (!isPending && !isIconOnly) ? startIcon : undefined;

  const sx: any = { mt: 3, height: 48 };
  if (isIconOnly) {
    sx.minWidth = 0;
    sx.px = 2;
    sx.justifyContent = 'center';
    if (fullWidth) sx.width = '100%';
  }

  return (
    <Button
      type="submit"
      variant="contained"
      sx={sx}
      disabled={isPending}
      startIcon={startIconProp}
      fullWidth={fullWidth} >
      {content}
    </Button>
  );
};
// ...existing code...