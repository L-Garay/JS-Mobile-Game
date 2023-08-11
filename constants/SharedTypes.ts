import { SVGProps } from 'react';

export type CustomSVGProps = SVGProps<SVGSVGElement> & {
  fill?: string;
  id?: string;
  svgStyle?: {
    styles: any;
  };
};
