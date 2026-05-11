'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
  Chip,
  Divider,
  AppBar,
  Toolbar,
  Badge,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';
import MenuIcon from '@mui/icons-material/Menu';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CloseIcon from '@mui/icons-material/Close';
import { usePathname, useRouter } from 'next/navigation';

const DRAWER_WIDTH = 268;

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon fontSize="small" />,
    path: '/',
    badge: null,
  },
  {
    label: 'Products',
    icon: <TableRowsIcon fontSize="small" />,
    path: '/products',
    badge: null,
  },
];

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const theme = useTheme();
  const isMobileQuery = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = mounted ? isMobileQuery : false;

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          px: 3,
          py: 3.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #3B82F6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(124, 58, 237, 0.5)',
            flexShrink: 0,
          }}
        >
          <ShowChartIcon sx={{ color: '#fff', fontSize: 20 }} />
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 800,
              fontSize: '1rem',
              background: 'linear-gradient(135deg, #F1F5F9, #94A3B8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.2,
            }}
          >
            Analytics Pro
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: '#475569', fontSize: '0.7rem', fontWeight: 500 }}
          >
            Product Intelligence
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mx: 2 }} />

      {/* Nav Label */}
      <Typography
        variant="overline"
        sx={{
          color: '#334155',
          px: 3,
          pt: 3,
          pb: 1,
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          fontWeight: 700,
        }}
      >
        Navigation
      </Typography>

      {/* Nav Items */}
      <List sx={{ px: 1.5, flex: 1 }}>
        {NAV_ITEMS.map(({ label, icon, path, badge }) => {
          const selected = pathname === path;
          return (
            <ListItem key={path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={selected}
                id={`nav-${label.toLowerCase()}`}
                onClick={() => {
                  router.push(path);
                  setOpen(false);
                }}
                sx={{
                  borderRadius: '10px',
                  py: 1.25,
                  px: 1.5,
                  gap: 0.5,
                  position: 'relative',
                  overflow: 'hidden',
                  ...(selected
                    ? {
                      background:
                        'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(79, 70, 229, 0.15) 100%)',
                      color: '#C4B5FD',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '20%',
                        bottom: '20%',
                        width: 3,
                        borderRadius: '0 3px 3px 0',
                        background: 'linear-gradient(180deg, #7C3AED, #4F46E5)',
                        boxShadow: '0 0 8px rgba(124, 58, 237, 0.6)',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), transparent)',
                        borderRadius: '10px',
                        border: '1px solid rgba(124, 58, 237, 0.2)',
                      },
                    }
                    : {
                      color: '#64748B',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: '#CBD5E1',
                        transform: 'translateX(2px)',
                      },
                    }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: 'inherit',
                    opacity: selected ? 1 : 0.7,
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: selected ? 600 : 500,
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontSize: '0.875rem',
                      color: 'inherit',
                    },
                  }}
                />
                {badge && (
                  <Chip
                    label={badge}
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: '0.65rem',
                      background: 'rgba(124, 58, 237, 0.2)',
                      color: '#A78BFA',
                      border: '1px solid rgba(124, 58, 237, 0.3)',
                      '& .MuiChip-label': { px: 0.75 },
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Bottom user info */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 2 }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: 1.5,
            borderRadius: '12px',
            background: 'rgba(15, 25, 50, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
              fontSize: '0.8rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
              boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)',
            }}
          >
            A
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '0.8125rem',
                color: '#CBD5E1',
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Admin User
            </Typography>
            <Typography
              sx={{ fontSize: '0.7rem', color: '#475569', whiteSpace: 'nowrap' }}
            >
              admin@analytics.pro
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile AppBar */}
      {isMobile && (
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            background: 'rgba(8, 12, 20, 0.85)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <Toolbar sx={{ gap: 2 }}>
            <IconButton
              id="mobile-menu-toggle"
              color="inherit"
              edge="start"
              onClick={() => setOpen(true)}
              sx={{ color: '#94A3B8' }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShowChartIcon sx={{ color: '#fff', fontSize: 16 }} />
              </Box>
              <Typography
                sx={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontWeight: 800,
                  fontSize: '0.9375rem',
                  background: 'linear-gradient(135deg, #F1F5F9, #94A3B8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Analytics Pro
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }} />
            <IconButton id="notifications-btn" sx={{ color: '#64748B' }}>
              <Badge badgeContent={3} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? open : true}
        onClose={() => setOpen(false)}
        sx={{
          width: isMobile ? 0 : DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            background: 'rgba(8, 14, 26, 0.95)',
            backdropFilter: 'blur(30px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.05)',
            overflowX: 'hidden',
          },
        }}
      >
        {isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={() => setOpen(false)} sx={{ color: '#64748B' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        id="main-content"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          mt: isMobile ? '64px' : 0,
          minHeight: '100vh',
          maxWidth: '100%',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {!isMobile && (
          /* Top Header Bar */
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              mb: 4,
              gap: 1,
            }}
          >

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                ml: 1,
                pl: 2,
                borderLeft: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
                  boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)',
                }}
              >
                A
              </Avatar>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#CBD5E1', fontFamily: '"Plus Jakarta Sans", sans-serif', lineHeight: 1.2 }}>
                  Admin User
                </Typography>
                <Typography sx={{ fontSize: '0.7rem', color: '#475569', lineHeight: 1.2 }}>Super Admin</Typography>
              </Box>
            </Box>
          </Box>
        )}
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
