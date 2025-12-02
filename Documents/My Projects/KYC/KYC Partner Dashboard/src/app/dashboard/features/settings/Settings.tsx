import {
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  TabPanels,
  TabPanel,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import Profile from './general/Profile';
import Role from './Roles/Roles';
import Users from './users/Users';
import Password from './password/Password';
import Partner from './partner/Partner';
import { Payment } from './payment/Payment';

export function Settings() {
  const CustomTab = ({ name }) => {
    return (
      <Tab
        _selected={{ color: 'primary.500', fontWeight: 500 }}
        color={'#7C7C7C'}
        fontWeight={400}
        fontSize={'.8rem'}
        fontFamily={'heading'}
      >
        {name}
      </Tab>
    );
  };
  return (
    <Box m={'1.5rem'}>
      <Tabs position="relative" variant="unstyled">
        <TabList pl={'1rem'}>
          <CustomTab name={'Profile'} />
          <CustomTab name={'Organization'} />
          <CustomTab name={'Security'} />
          <CustomTab name="Users" />
          <CustomTab name="Payment" />
          {/* <CustomTab name="Roles" /> */}
        </TabList>
        <TabIndicator height="3px" bg="primary.500" />
        <TabPanels mt={'-.81rem'}>
          <TabPanel>
            <Profile />
          </TabPanel>
          <TabPanel>
            <Partner />
          </TabPanel>
          <TabPanel>
            <Password />
          </TabPanel>
          <TabPanel>
            <Users />
          </TabPanel>
          <TabPanel>
            <Payment />
          </TabPanel>
          <TabPanel>
            <Role />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
