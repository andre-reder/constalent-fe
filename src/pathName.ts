export const isLocal = false;
export const isHomolog = false;

export const pathName = isLocal ? 'http://localhost:3001' : (isHomolog ? 'https://admin-nest-api-d665c1535195.herokuapp.com' : 'https://kiddlepass-admin-api-2e9e4fcd7448.herokuapp.com');
export default pathName;
