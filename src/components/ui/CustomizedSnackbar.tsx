import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface CustomizedSnackBarProps {
  openSnackbar: boolean;
  alertMessage: string;
  closeSnackbar: () => void;
}

export const CustomizedSnackbar = ({
  openSnackbar,
  alertMessage,
  closeSnackbar,
}: CustomizedSnackBarProps) => {

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
  };

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};