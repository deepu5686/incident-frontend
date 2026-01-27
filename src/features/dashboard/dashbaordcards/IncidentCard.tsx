import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ReportIcon from '@mui/icons-material/Report';
import WarningIcon from '@mui/icons-material/Warning';
import { CustomCard } from '../../../components/ui/CustomCard';
import { useIncidents } from '../../../hooks/useIncidents';

export const IncidentCard = () => {

  const { data } = useIncidents();

  const criticalIssues = data?.filter((res: any) => res.severity === 'CRITICAL').length;
  const hightIssues = data?.filter((res: any) => res.severity === 'HIGH').length

  return (
    <CustomCard cardHeaderText="Incident">
      <List sx={{ width: '100%', maxWidth: 360 }}>
        <ListItem>
          <ListItemIcon sx={{ minWidth: 48 }}>
            <ReportIcon sx={{ color: '#d32f2f', fontSize: 36 }} />
          </ListItemIcon>
          <ListItemText primary="Critical Issues" secondary={criticalIssues} />
        </ListItem>

        <ListItem>
          <ListItemIcon sx={{ minWidth: 48 }}>
            <WarningIcon sx={{ color: '#f57c00', fontSize: 36 }} />
          </ListItemIcon>
          <ListItemText primary="High" secondary={hightIssues} />
        </ListItem>
      </List>
    </CustomCard>
  );
};