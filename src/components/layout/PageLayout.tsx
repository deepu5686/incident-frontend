import { Box, Breadcrumbs, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, Link as RouterLink } from 'react-router-dom';
import type { ReactNode } from 'react';

interface PageLayoutProps {
  title: string;
  backTo?: string;
  actions?: ReactNode;
  children: ReactNode;
}

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export function PageLayout({
  title,
  backTo,
  actions,
  children,
}: PageLayoutProps) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
      }}
    >
      {/* 🔝 Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {backTo && (
            <Box
              component={RouterLink}
              to={backTo}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <ArrowBackIcon sx={{ fontSize: 28 }} />
            </Box>
          )}

          <Typography variant='h4'>
            {title}
          </Typography>

        </Box>

        {actions && <Box>{actions}</Box>}
      </Box>

      {/* 📦 Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}