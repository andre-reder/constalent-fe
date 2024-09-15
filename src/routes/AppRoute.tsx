import { AnimatePresence } from 'framer-motion';
import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Applications from '../pages/Applications';
import Candidates from '../pages/Candidates';
import EditCandidate from '../pages/Candidates/EditCandidate';
import NewCandidate from '../pages/Candidates/NewCandidate';
import Companies from '../pages/Companies';
import EditCompany from '../pages/Companies/EditCompany';
import NewCompany from '../pages/Companies/NewCompany';
import Home from '../pages/Home';
import Interviews from '../pages/Interviews';
import EditInterview from '../pages/Interviews/EditInterview';
import NewInterview from '../pages/Interviews/NewInterview';
import NotFound from '../pages/NotFound';
import Users from '../pages/Users';
import EditUser from '../pages/Users/EditUser';
import NewUser from '../pages/Users/NewUser';
import Vacancies from '../pages/Vacancies';
import EditVacancy from '../pages/Vacancies/EditVacancy';
import NewVacancy from '../pages/Vacancies/NewVacancy';

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
        <Route path="/vacancies/new" element={<NewVacancy />} />
        <Route path="/vacancies/:id" element={<EditVacancy />} />

        <Route path="/candidates" element={<Candidates />} />
        <Route path="/candidates/new" element={<NewCandidate />} />
        <Route path="/candidates/:id" element={<EditCandidate />} />

        <Route path="/applications" element={<Applications />} />

        <Route path="/interviews" element={<Interviews />} />
        <Route path="/interviews/new" element={<NewInterview />} />
        <Route path="/interviews/:id" element={<EditInterview />} />

        <Route path="/users" element={<Users />} />
        <Route path="/users/new" element={<NewUser />} />
        <Route path="/users/:id" element={<EditUser />} />

        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/new" element={<NewCompany />} />
        <Route path="/companies/:id" element={<EditCompany />} />
        {/* <Route path="/forgot" element={<ForgotPage />} /> */}

        <Route path="/" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}
