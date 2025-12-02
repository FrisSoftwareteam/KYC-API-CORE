import { Link, type LinkProps, Image, type ImageProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import logo from '@/assets/Logo.png';
// import logo from "@/assets/logo.png";

type LogoProps = ImageProps & {
  to?: string;
  text?: ReactNode;
  linkProps?: LinkProps;
};

export const Logo = (props: LogoProps) => {
  const { linkProps, to } = props;

  function PlainLogo() {
    return <Image src={logo} aria-label={`logo`} {...props} />;
  }

  function LinkLogo() {
    return (
      <Link as={ReactLink} to={to} {...linkProps}>
        <PlainLogo />
      </Link>
    );
  }

  if (to) {
    return <LinkLogo />;
  }

  return <PlainLogo />;
};
