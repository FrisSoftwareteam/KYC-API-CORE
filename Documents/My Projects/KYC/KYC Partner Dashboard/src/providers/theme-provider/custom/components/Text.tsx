export const Text = {
  baseStyle: {
    fontWeight: 400,
    fontSize: { base: '15px', md: '15px', lg: '16px' }, // Set your desired default font size
  },

  variants: {
    subHeading: {
      fontSize: {
        base: '20px',
        md: '24px',
        lg: '30px',
      },
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'heading',
    },
    dashBoardSubHead: {
      fontSize: {
        base: '14px',
        md: '16px',
        lg: '18px',
      },
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'heading',
    },
    profileSubHead: {
      fontSize: {
        base: '14px',
        md: '16px',
        lg: '18px',
      },
      fontWeight: 'bold',
      color: '#1D1D1D',
      fontFamily: 'DM Sans',
    },
    dashboardHeading: {
      fontSize: {
        base: '13px',
        md: '16px',
        lg: '18px',
      },
      fontWeight: '500',
      // textAlign: 'start',
      fontFamily: 'BR Firma',
    },
    onboardHeading: {
      fontSize: {
        base: '18px',
        md: '20px',
        lg: '22px',
      },
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'heading',
    },
    small: {
      fontSize: {
        base: '12px',
        md: '13px',
        lg: '14px',
      },
      fontFamily: 'body',
    },
    smallHeader: {
      fontSize: {
        base: '12px',
        md: '14px',
        lg: '16px',
      },
      fontFamily: 'body',
      fontWeight: '500',
    },
  },
};
