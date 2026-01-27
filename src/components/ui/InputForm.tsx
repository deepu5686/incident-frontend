import { zodResolver } from '@hookform/resolvers/zod';
import {
    Autocomplete,
    Stack,
    Typography,
    TextField,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import z from 'zod';
import { forwardRef, useImperativeHandle } from 'react';
import { creteIncidentRequest } from '../../api/incident.api';
import { queryClient } from '../../app/queryClient';
import { createListKeys } from '../../queryKeys/createListKeys';

export type InputFormRef = {
    submit: () => void;
};

const createIncidentSchema = z.object({
    title: z.string().min(2, 'Title must be at least 2 characters'),
    severity: z.string().nonempty('Severity is required'),
    description: z.string().min(1).max(100, 'Max 100 characters allowed'),
});

type CreateIncidentFormData = z.infer<typeof createIncidentSchema>;

interface InputFormProps {
    onSuccess: (message: string) => void
}

export const InputForm = forwardRef<InputFormRef, InputFormProps>(({ onSuccess }, ref) => {
    const severityLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateIncidentFormData>({
        resolver: zodResolver(createIncidentSchema),
    });

    const incidentKeys =  createListKeys('incidents');

    const { mutate, isError } = useMutation({
        mutationFn: creteIncidentRequest,
        onSuccess: (data) => {
            console.log('Incident created:', data);
            onSuccess?.(data.message);
            queryClient.invalidateQueries({
                queryKey: incidentKeys.all,
            });
        },
    });

    const onSubmit = (formData: CreateIncidentFormData) => {
        mutate(formData);
    };

    useImperativeHandle(ref, () => ({

        submit: () => handleSubmit(onSubmit)(),
    }));

    return (
        <>
            <Stack spacing={2} sx={{ width: 500, maxWidth: '100%' }}>
                {/* Title */}
                <TextField
                    required
                    label="Title"
                    variant="standard"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    {...register('title')}
                />

                {/* Severity (Controller REQUIRED) */}
                <Controller
                    name="severity"
                    control={control}
                    render={({ field }) => (
                        <Autocomplete
                            options={severityLevels}
                            onChange={(_, value) => field.onChange(value)}
                            renderInput={(params) => (
                                <TextField
                                    required
                                    {...params}
                                    label="Severity"
                                    variant="standard"
                                    error={!!errors.severity}
                                    helperText={errors.severity?.message}
                                />
                            )}
                        />
                    )}
                />

                {/* Description */}
                <TextField
                    required
                    label="Description"
                    multiline
                    rows={4}
                    variant="standard"
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    {...register('description')}
                />

                {isError && (
                    <Typography color="error">
                        Error submitting form. Please try again.
                    </Typography>
                )}
            </Stack>

        </>
    );
});