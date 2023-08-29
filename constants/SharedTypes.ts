import { SVGProps } from 'react';

export type CustomSVGProps = SVGProps<SVGSVGElement> & {
  fill?: string;
  id?: string;
  svgStyle?: {
    styles: any;
  };
};

export type BasicModalButtonProps = {
  text: string;
  action: () => void | any;
};

export type BasicModalProps = {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  title?: string;
  message?: string;
  buttons: BasicModalButtonProps[];
};
