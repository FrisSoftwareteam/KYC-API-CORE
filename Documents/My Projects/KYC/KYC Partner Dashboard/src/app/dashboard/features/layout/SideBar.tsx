import { Logo } from '@/components/Logo/Logo';
import { Box, Divider, Flex, FlexProps, Icon, Stack } from '@chakra-ui/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconType } from 'react-icons';
import { LuLayoutDashboard } from 'react-icons/lu';
// import { PiUsersDuotone } from 'react-icons/pi';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuUsers2 } from 'react-icons/lu';
import { useAuth } from '@/app/auth/hooks/useAuth';
import { Permissions } from '@/data/permission';
interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  path: string;
  slug: string;
}

const NavItem = ({ path, icon, slug, children, ...rest }: NavItemProps) => {
  const { pathname } = useLocation();
  const finalPathname = pathname === '/' ? '/overview' : pathname;
  const isActivePath = finalPathname.includes(slug);

  return (
    <Link to={path || '/'}>
      <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          py={'0rem'}
          role="group"
          cursor="pointer"
          bg={'transparent'}
          color={isActivePath ? 'primary.500' : '#565656'}
          fontWeight={isActivePath ? 500 : 400}
          fontSize={isActivePath ? '1rem' : '.9rem'}
          pl={isActivePath ? '1.3rem' : '1.5rem'}
          borderLeft={isActivePath ? '3px solid #213F6B' : 'none'}
          {...rest}
        >
          {icon && (
            <Icon
              mr=".8rem"
              fontSize={isActivePath ? '1.3rem' : '.9rem'}
              fontWeight={isActivePath ? 500 : 400}
              _groupHover={{
                color: 'primary.500',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>{' '}
    </Link>
  );
};
export default function SideBar() {
  const { userHasPermission } = useAuth();
  return (
    <Stack bg={'white'} minH={'100vh'}>
      <Box pl={'1.5rem'} py={'1rem'}>
        <Logo w={'7rem'} />
      </Box>
      <Divider borderColor={'#F1F1F1'} />
      <Box pt={'2.5rem'}>
        <Stack spacing={'1rem'}>
          <NavItem path="/" icon={LuLayoutDashboard} slug="overview">
            Overview
          </NavItem>
          <NavItem
            path="/verifications"
            icon={MdOutlineVerifiedUser}
            slug="verifications"
          >
            Verifications
          </NavItem>

          {userHasPermission(Permissions.CAN_MANAGE_AGENTS) && (
            <NavItem path="/agents" icon={LuUsers2} slug="agents">
              Agents
            </NavItem>
          )}
          <NavItem path="/settings" icon={IoSettingsOutline} slug="settings">
            Settings
          </NavItem>
        </Stack>
      </Box>
    </Stack>
  );
}
