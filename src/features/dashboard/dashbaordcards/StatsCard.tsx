import { Box } from '@mui/material';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { CustomCard } from '../../../components/ui/CustomCard';

export const ReportCard = () => {
    return (
        <CustomCard cardHeaderText={'Stats'}>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <QueryStatsIcon sx={{ fontSize: '100px', color: 'icon.primary'}} />
            </Box>
        </CustomCard>

    )
};