/* eslint-disable @typescript-eslint/no-explicit-any */
export const CustomStyle = {
  //   container: (provided: any) => ({
  //     ...provided,
  //     background: 'none',
  //   }),
  //   input: (provided: any) => ({
  //     ...provided,
  //     background: 'none',
  //   }),
  //
  singleValue: (provided: any) => ({
    ...provided,
    background: 'none',
    color: 'inherit',
  }),
  //   groupHeading: (provided: any) => ({
  //     ...provided,
  //     background: 'none',
  //   }),
  //   group: (provided: any) => ({
  //     ...provided,
  //     background: 'none',
  //   }),
  //   clearIndicator: (provided: any) => ({
  //     ...provided,
  //     background: 'none',
  //   }),
  //   indicatorsContainer: (provided: any) => ({
  //     ...provided,
  //     background: 'none',
  //   }),
  menu: (provided: any) => ({
    ...provided,
  }),
  menuList: (provided: any) => ({
    ...provided,
    background: 'rgba(300, 300, 300, 0.8)',
    maxHeight: '180px',
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    background: 'none',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    background: 'none',
    color: state.isSelected && '#000',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    background: 'transparent',
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    background: 'transparent',
    opacity: `${state.isDisabled ? '0.5' : '1'}`,
    cursor: `${state.isDisabled ? 'not-allowed' : 'default'}`,
  }),
  multiValue: (provided: any) => ({
    ...provided,
    background: 'unset',
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: 'inherit',
  }),
};
