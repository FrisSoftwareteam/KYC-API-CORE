import { Box, Flex, GridItem, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { TbDots } from 'react-icons/tb';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables, ChartData, ChartOptions } from 'chart.js';

Chart.register(...registerables);
export default function ChartCard({
  chart = 'bar',
}: {
  chart?: 'line' | 'bar';
}) {
  const monthlyData = [45, 80, 20, 160, 50, 140, 80, 70, 10, 40, 100, 50];

  const data: ChartData<'bar'> = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: '',
        data: monthlyData,
        backgroundColor: '#6FB3F9',
        borderWidth: 0,
        barThickness: 11,
        borderSkipped: 'middle',
      },
    ],
  };

  const options: ChartOptions | any = {
    scales: {
      x: {
        border: {
          display: false,
        },
        ticks: { display: false },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: { display: false },

        border: {
          display: false,
        },

        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: false,
    },
    legend: {
      display: false,
    },
  };

  const lineData: ChartData<'line'> = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: '',
        data: monthlyData,
        fill: false,
        borderColor: '#213F6B',
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
      },
    ],
  };
  const lineChartOptions: ChartOptions | any = {
    scales: {
      x: {
        border: {
          display: false,
        },
        ticks: { display: false },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: { display: false },

        border: {
          display: false,
        },

        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: false,
    },
    legend: {
      display: false,
    },
  };

  return (
    <Box
      pt={'2rem'}
      px={'1.8rem'}
      pb={'1.5rem'}
      bg={'white'}
      rounded={'.5rem'}
      boxShadow="0px 3.1px 29.41px 0px #0A00820A"
    >
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Text fontSize={'.8rem'} color={'#828282'} fontWeight={500}>
          CANDIDATES
        </Text>
        <TbDots fontSize={'2rem'} />
      </Flex>

      <SimpleGrid mt={'1rem'} h={'7rem'} bg={'yfllow'} columns={3}>
        <GridItem>
          <Stack h={'100%'} justifyContent={'space-between'}>
            <Text color={'#4F4F4F'} fontWeight={700} fontSize={'1.5rem'}>
              5,803
            </Text>
            <Text fontSize={'1.3rem'} color={'#FF3366'}>
              +3.3%
            </Text>
          </Stack>
        </GridItem>
        <GridItem
          maxH={'100%'}
          position={'relative'}
          display={'flex'}
          justifyContent={'flex-end'}
          colSpan={2}
          bg={'yellovw'}
        >
          {chart === 'line' ? (
            <Line data={lineData} options={lineChartOptions as any} />
          ) : (
            <Bar data={data} options={options as any} />
          )}
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
