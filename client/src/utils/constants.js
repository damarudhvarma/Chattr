export const HOST= import.meta.env.VITE_SERVER_URL;
export const Auth_Route=`${HOST}/api/auth`;
export const Sign_up=`${Auth_Route}/signup`;
export const Login=`${Auth_Route}/login `;
export const GET_USER_INFO=`${Auth_Route}/user-info`;
export const UPDATE_PROFILE_ROUTE=`${Auth_Route}/update-profile`;
export const ADD_PROFILE_IMAGE_ROUTE =`${Auth_Route}/add-profile-image`
export const REMOVE_PROFILE_IMAGE_ROUTE=`${Auth_Route}/remove-profile-image`;
export const LOGOUT_ROUTE=`${Auth_Route}/logout`;



export const CONTACTS_ROUTES  =`${HOST}/api/contacts`;
export const SEARCH_CONTACTS_ROUTE=`${CONTACTS_ROUTES}/search`;
export const GET_CONTACTS_FOR_DM_ROUTE=`${CONTACTS_ROUTES}/get-contacts-for-dm`;


export const MESSAGES_ROUTES =`api/messages`;
export const GET_MESSAGES_ROUTE=`${MESSAGES_ROUTES}/get-messages`;
export const UPLOAD_FILE_ROUTE=`${MESSAGES_ROUTES}/upload-file`;