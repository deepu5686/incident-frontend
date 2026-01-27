import CircularProgress, {
  type CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CustomCard } from '../../../components/ui/CustomCard';
import { useIncidents } from '../../../hooks/useIncidents';

const CircularProgressWithLabel = (
  props: CircularProgressProps & {
    value: number;
    progressColor: string;
    trackColor: string;
  }
) => {
  const { value, progressColor, trackColor, ...rest } = props;

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      {/* Track */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={120}
        thickness={8}
        sx={{ color: trackColor }}
      />

      {/* Progress */}
      <CircularProgress
        variant="determinate"
        value={value}
        size={120}
        thickness={8}
        sx={{
          color: progressColor,
          position: 'absolute',
          left: 0,
        }}
        {...rest}
      />

      {/* Center label */}
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          component="div"
          fontSize={24}
          sx={{ color: 'text.secondary' }}
        >
          {`${value}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export const ServiceLevelCard = () => {

  const { data } = useIncidents();

  const totalIssues = data?.length;
  const closedIssues = data?.filter((res: any) => res.status === 'CLOSED').length;
  const progressValue = Math.round((closedIssues! / totalIssues!) * 100);

  const getProgressColor = (): string => {
    if (progressValue <= 15) return '#d32f2f';
    if (progressValue <= 40) return '#f57c00';
    if (progressValue <= 70) return '#fbc02d';
    if (progressValue < 100) return '#7cb342';
    return '#2e7d32';
  };

  const getTrackColor = (): string => {
    return progressValue === 0 ? '#d32f2f' : 'rgba(0, 0, 0, 0.12)';
  };

  return (
    <CustomCard cardHeaderText="Service Level">
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <CircularProgressWithLabel
          value={progressValue}
          progressColor={getProgressColor()}
          trackColor={getTrackColor()}
        />
      </Box>
    </CustomCard>
  );
};