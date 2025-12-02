import React, { useEffect, useState } from 'react';
import {
  Map,
  AdvancedMarker,
  useMapsLibrary,
  useMap,
  APIProvider,
} from '@vis.gl/react-google-maps';
// import { env } from '@/shared/constants/env';
import {
  Box,
  Flex,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { FaLocationDot } from 'react-icons/fa6';
import './style.css';
import { env } from '@/shared/constants/env';

export interface Position {
  lat: number;
  lng: number;
}

export interface MapWithDirectionsProps {
  position: Position;
  submissionLocation: Position;
}
export default function VslMap({
  position,
  submissionLocation,
}: MapWithDirectionsProps) {
  return (
    <Box minH={'80vh'} h={100} w={'100%'} overflow={'hidden'}>
      <APIProvider apiKey={env.GOOGLE_API_KEY}>
        <Map
          defaultCenter={position}
          defaultZoom={5}
          mapId={'first-registar-id'}
          fullscreenControl={false}
          gestureHandling={'greedy'}
        >
          <AdvancedMarker position={position}>
            <Marker name={'Agent'} />
          </AdvancedMarker>
          <AdvancedMarker position={submissionLocation}>
            <Marker name={'Candidate'} />
          </AdvancedMarker>
          <Directions
            position={position}
            submissionLocation={submissionLocation}
          />
        </Map>
      </APIProvider>
    </Box>
  );
}

function Directions({ position, submissionLocation }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);

  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selectedRoute = routes[routeIndex];
  const leg = selectedRoute?.legs[0];

  useEffect(() => {
    if (!map || !routesLibrary) {
      return;
    }
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [map, routesLibrary]);

  useEffect(() => {
    if (!directionsRenderer || !directionsService) {
      return;
    }
    directionsService
      .route({
        destination: new google.maps.LatLng(
          submissionLocation.lat,
          submissionLocation.lng
        ),
        origin: new google.maps.LatLng(position.lat, position.lng),
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, [directionsService, directionsRenderer]);

  useEffect(() => {
    if (!directionsRenderer) {
      return;
    }
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <Box
      bg={'black'}
      minH={'2.5rem'}
      rounded={'.3rem'}
      minW={'12rem'}
      maxW={'18rem'}
      position={'absolute'}
      top={4}
      right={4}
      color={'white'}
      p={'.2rem'}
      px={'.4rem'}
      pb={'.7rem'}
    >
      <Text mb={'.3rem'} fontWeight={600}>
        {selectedRoute.summary}
      </Text>
      <Stack spacing={'.1rem'}>
        <Text fontSize={'.6rem'}>
          {leg?.start_address.split(',')[0]} to {leg?.end_address.split(',')[0]}
        </Text>
        <Text fontSize={'.6rem'}>Distance : {leg.distance?.text}</Text>
        <Text fontSize={'.6rem'}>Duration : {leg.duration?.text}</Text>
      </Stack>

      <Text mt={'.3rem'} fontWeight={600}>
        Other routes avalilable
      </Text>
      <UnorderedList>
        {routes.map((item, index) => (
          <ListItem
            cursor={'pointer'}
            onClick={() => {
              setRouteIndex(index);
            }}
            fontWeight={500}
            fontSize={'.6rem'}
            key={item.summary}
            color={'blue.300'}
          >
            {item.summary}
          </ListItem>
        ))}
      </UnorderedList>
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
      bg={'white'}
      rounded={'.5rem'}
      w={'auto'}
    >
      <FaLocationDot color={'black'} />
      <Text fontSize={'.7rem'} color={'black'}>
        {name}
      </Text>
    </Flex>
  );
}
