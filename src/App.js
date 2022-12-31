import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import { Provider } from 'react-redux'
import store from './store'

import Home from './routes/home'
import Search from './routes/search'
import NotFound from './routes/404'

import Layout from './components/layout'


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="search/:search_arg" element={<Search />}
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
