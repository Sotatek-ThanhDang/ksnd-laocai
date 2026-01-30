import {
  blue,
  brand,
  cyan,
  emerald,
  error,
  fuchsia,
  gray,
  indigo,
  lime,
  orange,
  pink,
  purple,
  rose,
  sky,
  success,
  teal,
  violet,
  warning,
  yellow,
} from '../common/tokens/colors';

function getRandomColor() {
  const colors = [
    brand,
    gray,
    error,
    warning,
    success,
    lime,
    emerald,
    teal,
    cyan,
    sky,
    blue,
    indigo,
    violet,
    purple,
    fuchsia,
    pink,
    rose,
    orange,
    yellow,
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return randomColor?.[500] || brand[500];
}

export { getRandomColor };
