import { Center, Flex } from '@chakra-ui/react';
import React, { memo } from 'react';

export interface TabProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

const Tab: React.FC<TabProps> = memo(({ label, onClick, isActive }) => (
  <Center
    onClick={onClick}
    cursor="pointer"
    pb={isActive ? '1.09rem' : '1.2rem'}
    userSelect="none"
    color={isActive ? '#213F6B' : '#606060'}
    fontWeight={isActive ? '500' : '400'}
    borderBottom={isActive ? '3px solid #213F6B' : 'none'}
    fontSize=".8rem"
  >
    {label}
  </Center>
));

interface TabContainerProps {
  tabs: TabProps[];
}

export const TabContainer: React.FC<TabContainerProps> = memo(({ tabs }) => (
  <Flex gap={'1rem'} alignItems="center" justifyContent="space-between">
    {tabs.map((tab) => (
      <Tab key={tab.label} {...tab} />
    ))}
  </Flex>
));
