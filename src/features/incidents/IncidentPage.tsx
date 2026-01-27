import { Box, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { getIncident } from '../../api/incident.api'; // your API function
import { PageLayout } from "../../components/layout/PageLayout";

export const IncidentPage = () => {
    const { id } = useParams<{ id: string }>(); // destructure id

    const { data, isLoading, isError } = useQuery({
        queryKey: ['incident', id],
        queryFn: () => getIncident(id!),
        enabled: !!id,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: true,
    });

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography color="error">Failed to load incident.</Typography>;

    return (

        <PageLayout
        title="Incident Details"
            backTo="/incidents"
        >
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6">{data.title}</Typography>
            </Box>

        </PageLayout>


    );
};