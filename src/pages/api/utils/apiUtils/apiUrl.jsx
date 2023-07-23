export const { NEXT_PUBLIC_SUSS_URL } = process.env;

// export default {
//     LOGIN_URL: `https://suss-ads.zohari.tech/public/user/token`,
//     // LOGIN_URL: `${NEXT_PUBLIC_SUSS_URL}/public/user/token`,
//     LIST_CONTACTS: `${NEXT_PUBLIC_SUSS_URL}/api/v1/contact`,
//     CREATE_CONTACT: `${NEXT_PUBLIC_SUSS_URL}/api/v1/contact`,
//     CREATE_USER: `${NEXT_PUBLIC_SUSS_URL}/api/v1/user/:app_id/registration`,
//     BROADCAST_MESSAGE: `${NEXT_PUBLIC_SUSS_URL}api/v1/message`,
//     UPLOAD_CONTACTS: `${NEXT_PUBLIC_SUSS_URL}api/v1/contact`,
//     LIST_MESSAGES: `${NEXT_PUBLIC_SUSS_URL}/api/v1/message`,
//     LIST_APP_SERVICES: `${NEXT_PUBLIC_SUSS_URL}/api/v1/application`,
//     USER_ATTACH: `${NEXT_PUBLIC_SUSS_URL}api/v1/application`,
//     SERVICE_ATTACH: `${NEXT_PUBLIC_SUSS_URL}api/v1/application`,
//     CREATE_SERVICE: `${NEXT_PUBLIC_SUSS_URL}/api/v1/service/create`,
//     CREATE_APP: `${NEXT_PUBLIC_SUSS_URL}/api/v1/application/create`,
//     SEND_SMS: `${NEXT_PUBLIC_SUSS_URL}api/v1/message`,
//     LIST_APPLICATIONS: `${NEXT_PUBLIC_SUSS_URL}api/v1/application/3/list`,
//     LIST_SERVICES: `${NEXT_PUBLIC_SUSS_URL}/api/v1/service/3/list`,
//     USER_APPS: `https://suss-ads.zohari.tech/api/v1/users/application/list`,
//     USER_SEARCH: `${NEXT_PUBLIC_SUSS_URL}api/v1/application`,
//     SERVICE_SEARCH: `${NEXT_PUBLIC_SUSS_URL}api/v1/service`
// };

export default {
    LOGIN_URL: `https://suss-ads.zohari.tech/public/user/token`,
    // LOGIN_URL: `${NEXT_PUBLIC_SUSS_URL}/public/user/token`,
    LIST_CONTACTS: `https://suss-ads.zohari.tech/api/v1/contact`,
    CREATE_CONTACT: `https://suss-ads.zohari.tech/api/v1/contact`,
    UPLOAD_CONTACTS: `https://suss-ads.zohari.tech/api/v1/group`,
    LIST_GROUPS: `https://suss-ads.zohari.tech/api/v1/group`,
    CREATE_GROUP: `https://suss-ads.zohari.tech/api/v1/group`,
    CREATE_USER: `https://suss-ads.zohari.tech/api/v1/user`,
    BROADCAST_MESSAGE: `https://suss-ads.zohari.techapi/v1/message`,
    LIST_MESSAGES: `https://suss-ads.zohari.tech/api/v1/message`,
    LIST_APP_SERVICES: `https://suss-ads.zohari.tech/api/v1/application`,
    USER_ATTACH: `https://suss-ads.zohari.tech/api/v1/application`,
    SERVICE_ATTACH: `https://suss-ads.zohari.tech/api/v1/application`,
    CREATE_SERVICE: `https://suss-ads.zohari.tech/api/v1/service/create`,
    CREATE_APP: `https://suss-ads.zohari.tech/api/v1/application/create`,
    SEND_SMS: `https://suss-ads.zohari.tech/api/v1/message`,
    LIST_APPLICATIONS: `https://suss-ads.zohari.tech/api/v1/application`,
    LIST_SERVICES: `https://suss-ads.zohari.tech/api/v1/service`,
    USER_APPS: `https://suss-ads.zohari.tech/api/v1/users/application/list`,
    USER_SEARCH: `https://suss-ads.zohari.tech/api/v1/application`,
    LIST_USERS: `https://suss-ads.zohari.tech/api/v1/application`,
    SERVICE_SEARCH: `https://suss-ads.zohari.tech/api/v1/service`,
    UNITS_EXPENDITURE: `https://suss-ads.zohari.tech/api/v1/analytics/annualsms`
};