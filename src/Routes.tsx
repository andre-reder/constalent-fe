import { ThemeProvider } from 'styled-components';
import moon from './assets/images/icons/moon.svg';
import sun from './assets/images/icons/sun.svg';
import darkTheme from './assets/styles/themes/dark';
import defaultTheme from './assets/styles/themes/default';
import { AppRoute } from './routes/AppRoute';
import { LoginRoute } from './routes/LoginRoute';

import { GlobalStyles } from './assets/styles/GlobalStyles';
import { AppContainer, RoutesContainer, ThemeRadioButtonsContainer } from './components/AppContainer';
import { Sidebar } from './components/Sidebar';
import ThemeRadioButton from './components/ThemeRadioButton';
import { useAppContext } from './contexts/auth';
import useLocalState from './hooks/useLocalState';
import { useQuery } from './hooks/useQuery';

export function Routes() {
  const [theme, setTheme] = useLocalState('theme', defaultTheme);
  const { signed } = useAppContext();
  const query = useQuery();
  const activeNavItem = query.get('active');

  return signed
    ? (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppContainer>
          <Sidebar active={activeNavItem} />
            <ThemeRadioButtonsContainer>
              <ThemeRadioButton
                  onClick={() => setTheme(defaultTheme)}
                  selected={theme.colors.background != '#121212'}
                >
                  <img src={sun} alt="lightTheme" />
              </ThemeRadioButton>
              <ThemeRadioButton
                  onClick={() => setTheme(darkTheme)}
                  selected={theme.colors.background == '#121212'}
                >
                  <img src={moon} alt="darkTheme" />
              </ThemeRadioButton>
            </ThemeRadioButtonsContainer>
          <RoutesContainer>
            <AppRoute />
          </RoutesContainer>
        </AppContainer>
      </ThemeProvider>
    )
    : (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
          <ThemeRadioButtonsContainer>
            <ThemeRadioButton
              onClick={() => setTheme(defaultTheme)}
              selected={theme.colors.background != '#121212'}
            >
              <img src={sun} alt="lightTheme" />
            </ThemeRadioButton>
            <ThemeRadioButton
              onClick={() => setTheme(darkTheme)}
              selected={theme.colors.background == '#121212'}
            >
              <img src={moon} alt="darkTheme" />
            </ThemeRadioButton>
          </ThemeRadioButtonsContainer>
        <LoginRoute />
      </ThemeProvider>
    );
}
