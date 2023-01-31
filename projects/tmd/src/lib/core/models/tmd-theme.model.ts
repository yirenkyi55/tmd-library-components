export enum TmdThemeStyle {
  Blue,
  Green,
  Orange,
}

export enum TmdSideBarStatus {
  Opened,
  Closed
}

interface TmdStyleElement {
  blueClass: string;
  greenClass: string;
  orangeClass: string;
}

export interface TmdThemeConfig {
  tmdInputTheme: TmdStyleElement;
  tmdButtonTheme: TmdStyleElement;
}

export const TmdStyleConfig: TmdThemeConfig = {
  tmdInputTheme: {
    blueClass: 'border-blue-500 focus:ring focus:ring-blue-200',
    greenClass: 'border-green-500 focus:ring focus:ring-green-200',
    orangeClass: 'border-orange-500 focus:ring focus:ring-orange-200',
  },
  tmdButtonTheme: {
    blueClass: '',
    greenClass: '',
    orangeClass: '',
  },
};

export interface TmdStyleTheme {
  get styleTheme(): string;
}