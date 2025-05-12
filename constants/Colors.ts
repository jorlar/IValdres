/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#2E7D32'; // Forest green
const tintColorDark = '#81C784'; // Light green

export const Colors = {
  light: {
    text: '#1A1A1A',
    background: '#F5F5F5',
    tint: tintColorLight,
    tabIconDefault: '#757575',
    tabIconSelected: tintColorLight,
    card: '#FFFFFF',
    cardBorder: '#E0E0E0',
    primary: '#2E7D32', // Forest green
    secondary: '#8D6E63', // Brown
    accent: '#FFA000', // Amber
    success: '#43A047', // Green
    error: '#D32F2F', // Red
    warning: '#FFA000', // Amber
    info: '#1976D2', // Blue
    // Valdres-specific colors
    mountain: '#546E7A', // Blue-grey for mountains
    forest: '#2E7D32', // Forest green
    lake: '#1976D2', // Lake blue
    snow: '#ECEFF1', // Snow white
    wood: '#8D6E63', // Wood brown
  },
  dark: {
    text: '#FFFFFF',
    background: '#121212',
    tint: tintColorDark,
    tabIconDefault: '#9E9E9E',
    tabIconSelected: tintColorDark,
    card: '#1E1E1E',
    cardBorder: '#333333',
    primary: '#81C784', // Light green
    secondary: '#A1887F', // Light brown
    accent: '#FFB74D', // Light amber
    success: '#66BB6A', // Light green
    error: '#EF5350', // Light red
    warning: '#FFB74D', // Light amber
    info: '#42A5F5', // Light blue
    // Valdres-specific colors
    mountain: '#78909C', // Light blue-grey
    forest: '#81C784', // Light forest green
    lake: '#42A5F5', // Light lake blue
    snow: '#FFFFFF', // Pure white
    wood: '#A1887F', // Light wood brown
  },
};
