const fonts = {
  heading: `'Ubuntu',sans-serif`,
  body: `'Roboto',sans-serif`,
};

const fontSizes = {
  xs: '11px',
  sm: '13px',
  md: '15px',
  lg: '17px',
  xl: '22px',
  '2xl': '26px',
  '3xl': '30px',
  '4xl': '34px',
  '5xl': '38px',
  '6xl': '50px',
  '7xl': '70px',
};

const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const textStyles = {
  h1: {
    fontSize: ['4xl', '5xl'],
    fontWeight: 'bold',
    lineHeight: 'auto',
    fontFamily: 'heading',
  },
  h2: {
    fontSize: ['3xl', '4xl'],
    fontWeight: 'bold',
    fontFamily: 'heading',
    lineHeight: 'auto',
  },
  h3: {
    fontSize: ['2xl', '3xl'],
    fontWeight: 'semibold',
    lineHeight: 'auto',
    fontFamily: 'heading',
  },
  h4: {
    fontSize: ['xl', '2xl'],
    fontWeight: 'semibold',
    fontFamily: 'heading',
    lineHeight: 'auto',
  },
  h5: {
    fontSize: ['lg', 'xl'],
    fontWeight: 'semibold',
    lineHeight: 'auto',
    fontFamily: 'heading',
  },
  p: {
    fontSize: { base: '14px', md: '16px' },
    fontWeight: 'regular',
    lineHeight: '165%',
    fontFamily: 'body',
  },
  subHeading: {
    fontSize: { base: '20px', md: '26px' },
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'heading',
  },
  small: {
    fontSize: { base: '10px', md: '12px' },
    fontFamily: 'body',
  },
};

export const fontConfig = {
  fonts,
  fontSizes,
  fontWeights,
  textStyles,
};
