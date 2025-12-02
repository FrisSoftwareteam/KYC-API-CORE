import React from 'react';
import { Map, AdvancedMarker, APIProvider } from '@vis.gl/react-google-maps';
// import { env } from '@/shared/constants/env';
import { Box, Flex, Text } from '@chakra-ui/react';
import './style.css';
import { Position } from './VslMap';
import { FaLocationDot } from 'react-icons/fa6';
import { env } from '@/shared/constants/env';

export default function SingleLocationMap({
  position,
  label,
}: {
  position: Position;
  label?: string;
}) {
  return (
    <Box minH={'80vh'} h={100} w={'100%'} overflow={'hidden'}>
      <APIProvider apiKey={env.GOOGLE_API_KEY}>
        <Map
          defaultCenter={position}
          defaultZoom={15}
          mapId={'first-registar-id'}
          fullscreenControl={false}
          gestureHandling={'greedy'}
        >
          <AdvancedMarker position={position}>
            {label && <Marker name={label} />}
          </AdvancedMarker>

          {/* <Directions
            position={position}
            submissionLocation={submissionLocation}
          /> */}
        </Map>
      </APIProvider>
    </Box>
  );
}

export function Marker({ name }) {
  return (
    <Flex
      gap={'.5rem'}
      px={'1rem'}
      alignItems={'center'}
      h={'1.5rem'}
      bg={'red'}
      rounded={'.5rem'}
      w={'auto'}
    >
      <FaLocationDot color={'white'} />
      <Text fontSize={'.7rem'} color={'white'}>
        {name}
      </Text>
    </Flex>
  );
}
