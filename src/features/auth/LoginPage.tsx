import { Box, Container, TextField, Typography, Paper } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import api from '../../api/axios';
import { loginSuccess } from './authSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { CustomButton } from '../../components/ui/CustomButton';

// ----------------------
// Validation Schema
// ----------------------
const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// ----------------------
// API Call
// ----------------------
const loginRequest = async (data: LoginFormData) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      dispatch(
        loginSuccess({
          user: data.user,
          accessToken: data.accessToken,
        })
      );
      localStorage.setItem('accessToken', data.accessToken);
      navigate('/dashboard');
    },
  });

  const onSubmit = (formData: LoginFormData) => {
    mutate(formData);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Sign in
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            {isError && (
              <Typography color="error" variant="body2" mt={1}>
                Invalid email or password
              </Typography>
            )}

            <CustomButton 
              isPending={isPending}
              buttonText="Login"
              startIcon={<LoginIcon />}
            />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
