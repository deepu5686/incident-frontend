import { Box } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import { CustomCard } from "../../../components/ui/CustomCard";

export const SettingsCard = () => {

    return (
        <div>
            <CustomCard cardHeaderText={'Settings'}>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <SettingsIcon sx={{ fontSize: '100px', color: 'icon.primary' }} />
                </Box>
            </CustomCard>
        </div>
    );
}
