import { AnimatePresence } from 'framer-motion';
import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import ForgotPassword from '../pages/ForgotPassword';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

// import ForgotPage from '../pages/ForgotPassword';
// import NotFound from '../pages/NotFound';

export function LoginRoute() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={location.pathname}
      >
        <Route path="/" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        {/* <Route path="/forgot" element={<ForgotPage />} /> */}

        <Route path="/" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}
