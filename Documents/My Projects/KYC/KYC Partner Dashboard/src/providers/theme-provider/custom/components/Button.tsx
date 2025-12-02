import { ComponentDefaultProps } from '@chakra-ui/react';
export const Button: ComponentDefaultProps = {
  defaultProps: {
    size: 'md',
    colorScheme: 'primary',
  },
  baseStyle: {
    variant: 'solid',
    borderRadius: '6px',
    fontFamily: 'body',
    minHeight: '10px',
    fontSize: { base: '14px', md: '16px' },
    fontWeight: 400,
  },
  variants: {
    primary: {
      color: 'white',
      bgColor: 'primary.500',
      width: { md: '130px' },
      _focus: {
        boxShadow: 'none',
        bgColor: 'brand.primary.500',
        borderRadius: '10px',
        outline: 'none !important',
        border: 'none',
      },
      _hover: {
        border: '8px solid',
        borderColor: 'primary.100',
        borderRadius: '10px',
      },
    },
    outline: {
      color: 'primary.500',
      bgColor: 'white',
      border: '1px solid',
      borderColor: 'primary.500',
      width: { md: '130px' },
      _focus: {
        bgColor: 'white',
      },
      _hover: {
        borderColor: 'primary.500',
        bgColor: 'white',
      },
    },
    profileHeader: {
      color: 'white',
      fontSize: { base: '12px', md: '16px' },
      _focus: {
        bg: 'secondary.500',
      },
      bg: '#2F313F',
      borderRadius: '3rem',
      px: '2rem',
      minH: '0.2rem',
      h: '2.4rem',
    },
    solid: {
      color: 'white',
      bgColor: 'primary.500',
      width: { md: '130px' },
      height: '30px',
      _focus: {
        bgColor: 'brand.primary.500',
        outline: 'none !important',
        border: 'none',
      },
      _hover: {
        color: 'white',
        bgColor: 'primary.500',
      },
    },
  },
  sizes: {
    sm: {
      minHeight: '40px',
      borderRadius: '4px',
      fontSize: 'sm',
    },
    md: {
      minHeight: '30px',
      fontSize: 'md',
      h: '30px',
    },
  },
};
