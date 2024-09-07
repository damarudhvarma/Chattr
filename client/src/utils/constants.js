export const HOST= import.meta.env.VITE_SERVER_URL;
export const Auth_Route=`${HOST}/api/auth`;
export const Sign_up=`${Auth_Route}/signup`;
export const Login=`${Auth_Route}/login `;
export const GET_USER_INFO=`${Auth_Route}/user-info`