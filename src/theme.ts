type FontSizes = {
  input: string;
  small: string;
  medium: string;
  large: string;
};

const fontSizes: FontSizes = {
  input: '0.5em',
  small: '1em',
  medium: '2em',
  large: '3em',
};

type Theme = {
  colors: {
    main: string;
    background: string;
    appBackGround: string;
    inputBorder: string;
    text: string;
  };
  fontSizes: FontSizes;
};

export const theme: Theme = {
  colors: {
    main: '#ffffff',
    background: '#72abd8',
    appBackGround: '#ffffff',
    inputBorder: 'grey',
    text: 'black',
  },
  fontSizes,
};

export const darkTheme: Theme = {
  colors: {
    main: 'white',
    background: 'black',
    appBackGround: 'black',
    inputBorder: 'grey',
    text: 'black',
  },
  fontSizes,
};
