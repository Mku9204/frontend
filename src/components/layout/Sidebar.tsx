'use client';

import { useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';
import MenuIcon from '@mui/icons-material/Menu';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { usePathname, useRouter } from 'next/navigation';

const DRAWER_WIDTH = 260;

const NAV_ITEMS = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { label: 'Products', icon: <TableRowsIcon />, path: '/products' },
];

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ my: 2, display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Box sx={{ 
          background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)', 
          borderRadius: 2, p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
          <AutoGraphIcon sx={{ color: '#fff' }} />
        </Box>
        <Typography variant="h6" sx={{ fontFamily: 'Outfit', fontWeight: 800, background: 'linear-gradient(to right, #F8FAFC, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Analytics Pro
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
      <List sx={{ px: 2, mt: 2 }}>
        {NAV_ITEMS.map(({ label, icon, path }) => {
          const selected = pathname === path;
          return (
            <ListItem key={path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={selected}
                onClick={() => {
                  router.push(path);
                  setOpen(false);
                }}
                sx={{
                  borderRadius: 3,
                  py: 1.2,
                  transition: 'all 0.2s',
                  bgcolor: selected ? 'rgba(124, 58, 237, 0.15)' : 'transparent',
                  color: selected ? '#A78BFA' : '#94A3B8',
                  '&:hover': {
                    bgcolor: selected ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    color: '#F8FAFC',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>{icon}</ListItemIcon>
                <ListItemText primary={label} sx={{ '& .MuiListItemText-primary': { fontWeight: selected ? 700 : 500, fontFamily: 'Outfit' } }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {isMobile && (
        <AppBar position="fixed" elevation={0} sx={{ 
          zIndex: theme.zIndex.drawer + 1, 
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Outfit' }}>
              Analytics Pro
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? open : true}
        onClose={() => setOpen(false)}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': { 
            width: DRAWER_WIDTH, 
            boxSizing: 'border-box',
            background: 'rgba(30, 41, 59, 0.6)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'transparent',
          p: { xs: 2, md: 4 },
          mt: isMobile ? '64px' : 0,
          minHeight: '100vh',
          maxWidth: '100vw',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
