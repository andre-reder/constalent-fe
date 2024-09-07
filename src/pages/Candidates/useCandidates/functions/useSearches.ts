import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import splitArray from '../../../../utils/splitArray';
import { CandidateType, GenderType, OptionType } from '../../types';

interface IUseSearches {
  candidates: CandidateType[];
  setCandidatesSplitted: Dispatch<SetStateAction<Array<CandidateType[]>>>;
  setFilteredCandidates: Dispatch<SetStateAction<CandidateType[]>>;
}

export default function useSearches({
  candidates,
  setCandidatesSplitted,
  setFilteredCandidates,
}: IUseSearches) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<OptionType>({ value: '', label: 'Filtrar por status' });
  const [selectedEducationLevel, setSelectedEducationLevel] = useState<OptionType>({ value: '', label: 'Filtrar por nível de escolaridade' });
  const [selectedGraduationCourse, setSelectedGraduationCourse] = useState<OptionType>({ value: '', label: 'Filtrar por curso de graduação' });
  const [gender, setGender] = useState<GenderType>('');

  const filterCandidates = useCallback(() => {
    const candidatesFiltered = candidates.filter((candidate) => {
      const searchTermFilter = (
        candidate.name.toLowerCase().includes(String(searchTerm).toLowerCase())
      );

      const statusFilter = candidate.status === selectedStatus.value || selectedStatus.value === '';
      const educationLevelFilter = selectedEducationLevel.value === candidate.educationLevel || selectedEducationLevel.value === '';
      const graduationCourseFilter = selectedGraduationCourse.value === candidate.graduationCourse || selectedGraduationCourse.value === '';
      const genderFilter = gender === candidate.gender || !gender;

      return searchTermFilter && statusFilter && educationLevelFilter && graduationCourseFilter && genderFilter;
    });

    const candidatesSplittedByFilters = splitArray(candidatesFiltered);
    setCandidatesSplitted(candidatesSplittedByFilters);
    setFilteredCandidates(candidatesSplittedByFilters[0]);
  }, [candidates, setCandidatesSplitted, setFilteredCandidates, searchTerm, selectedStatus.value, selectedEducationLevel.value, selectedGraduationCourse.value, gender]);

  useEffect(() => {
    filterCandidates();
  }, [filterCandidates]);

  const handleChangeSearchTerm = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleSelectedEducationLevelChange = useCallback((event: OptionType) => {
    setSelectedEducationLevel(event);
  }, []);

  const handleSelectedStatusChange = useCallback((event: OptionType) => {
    setSelectedStatus(event);
  }, []);

  const handleSelectedGraduationCourseChange = useCallback((event: OptionType) => {
    setSelectedGraduationCourse(event);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    handleChangeSearchTerm,
    gender,
    setGender,
    selectedEducationLevel,
    handleSelectedEducationLevelChange,
    selectedGraduationCourse,
    handleSelectedGraduationCourseChange,
    selectedStatus,
    handleSelectedStatusChange,
  };
}
