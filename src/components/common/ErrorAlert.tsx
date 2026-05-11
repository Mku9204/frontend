import { Alert, AlertTitle } from '@mui/material';

interface ErrorAlertProps {
  message?: string;
  title?: string;
}

const ErrorAlert = ({ message, title = 'Error' }: ErrorAlertProps) => (
  <Alert severity="error" variant="standard" sx={{ my: 2 }}>
    <AlertTitle>{title}</AlertTitle>
    {message || 'Something went wrong. Please try again.'}
  </Alert>
);

export default ErrorAlert;
