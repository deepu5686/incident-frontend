import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

import { IncidentCard } from './dashbaordcards/IncidentCard';
import { ReportCard } from './dashbaordcards/StatsCard';
import { ServiceLevelCard } from './dashbaordcards/ServiceLevelCard';
import { UsersCard } from './dashbaordcards/UsersCard';
import { SettingsCard } from './dashbaordcards/SettingsCard';

export const Dashboard = () => {


  return (
    <Box>
      <Typography variant="h4" sx={{ p: 2, textAlign: 'left' }}>
        Dashboard
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 3,
          // justifyItems: 'center',
        }}
      >
        <Box
          component={RouterLink}
          to="/incidents"
          sx={{ textDecoration: 'none', width: '100%' }}
        >
          <IncidentCard />
        </Box>

        <Box
          component={RouterLink}
          to="/reports"
          sx={{ textDecoration: 'none', width: '100%' }}
        >
          <ReportCard />
        </Box>

        <Box
          component={RouterLink}
          to="/service-level"
          sx={{ textDecoration: 'none', width: '100%' }}
        >
          <ServiceLevelCard />
        </Box>

        <Box
          component={RouterLink}
          to="/users"
          sx={{ textDecoration: 'none', width: '100%' }}
        >
          <UsersCard />
        </Box>

        <Box
          component={RouterLink}
          to="/settings"
          sx={{ textDecoration: 'none', width: '100%' }}
        >
          <SettingsCard />
        </Box>
      </Box>
    </Box>
  );
};