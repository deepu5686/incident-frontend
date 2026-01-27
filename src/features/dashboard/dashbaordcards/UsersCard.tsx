import { Box } from '@mui/material';
import { CustomCard } from '../../../components/ui/CustomCard';
import GroupsIcon from '@mui/icons-material/Groups';

export const UsersCard = () => {
    return (
        <CustomCard cardHeaderText={'Manage Users'}>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <GroupsIcon sx={{ fontSize: '100px', color: 'icon.primary' }} />
            </Box>
        </CustomCard>
    )
};