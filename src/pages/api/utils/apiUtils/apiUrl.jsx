const {NEXT_PUBLIC_SUSS_URL } = process.env;

export default {
    LOGIN_URL: `https://suss-ads.zohari.tech/public/user/token`,
    // LOGIN_URL: `${NEXT_PUBLIC_SUSS_URL}/public/user/token`,
    LIST_CONTACTS: `${NEXT_PUBLIC_SUSS_URL}/api/v1/contact`,
    CREATE_CONTACT: `${NEXT_PUBLIC_SUSS_URL}/api/v1/contact`,
    CREATE_USER: `${NEXT_PUBLIC_SUSS_URL}/api/v1/user/:app_id/registration`,
    BROADCAST_MESSAGE: `${NEXT_PUBLIC_SUSS_URL}api/v1/message`,
    UPLOAD_CONTACTS: `${NEXT_PUBLIC_SUSS_URL}api/v1/contact`,
    LIST_MESSAGES: `${NEXT_PUBLIC_SUSS_URL}/api/v1/message`,
    LIST_APP_SERVICES: `${NEXT_PUBLIC_SUSS_URL}/api/v1/application`,
    USER_ATTACH: `${NEXT_PUBLIC_SUSS_URL}api/v1/application`,
    SERVICE_ATTACH: `${NEXT_PUBLIC_SUSS_URL}api/v1/application`,
    CREATE_SERVICE: `${NEXT_PUBLIC_SUSS_URL}/api/v1/service/create`,
    CREATE_APP: `${NEXT_PUBLIC_SUSS_URL}/api/v1/application/create`,
    SEND_SMS: `${NEXT_PUBLIC_SUSS_URL}api/v1/message`,
    LIST_APPLICATIONS: `${NEXT_PUBLIC_SUSS_URL}api/v1/application/3/list`,
    LIST_SERVICES: `${NEXT_PUBLIC_SUSS_URL}/api/v1/service/3/list`,
    USER_APPS: `https://suss-ads.zohari.tech/api/v1/users/application/list`,
    USER_SEARCH: `${NEXT_PUBLIC_SUSS_URL}api/v1/application`,
    SERVICE_SEARCH: `${NEXT_PUBLIC_SUSS_URL}api/v1/service`
};