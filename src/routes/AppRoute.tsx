import { AnimatePresence } from 'framer-motion';
import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Applications from '../pages/Applications';
import Candidates from '../pages/Candidates';
import Companies from '../pages/Companies';
import Home from '../pages/Home';
import Interviews from '../pages/Interviews';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Users from '../pages/Users';
import EditUser from '../pages/Users/EditUser';
import NewUser from '../pages/Users/NewUser';
import Vacancies from '../pages/Vacancies';

export function AppRoute() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={location.pathname}
      >
        <Route path="/" element={<Home />} />
        <Route path="/vacancies" element={<Vacancies />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/interviews" element={<Interviews />} />

        <Route path="/users" element={<Users />} />
        <Route path="/users/new" element={<NewUser />} />
        <Route path="/users/:id" element={<EditUser />} />

        <Route path="/companies" element={<Companies />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/forgot" element={<ForgotPage />} /> */}

        <Route path="/" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}
