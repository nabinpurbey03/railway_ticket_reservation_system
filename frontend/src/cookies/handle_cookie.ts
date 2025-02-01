import Cookies from 'js-cookie';

const expirationTime = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 minutes from now

interface UserCookies {
    id: string;
    role: string;
    is_active: boolean;
    loggedIn: boolean;
    email: string;
}

export const setUserCookies = (user: UserCookies): void => {

    Cookies.set('id', user.id, { expires: expirationTime });
    Cookies.set('role', user.role, { expires: expirationTime });
    Cookies.set('is_active', user.is_active.toString(), { expires: expirationTime });
    Cookies.set('loggedIn', user.loggedIn.toString(), { expires: expirationTime });
    Cookies.set('email', user.email, { expires: expirationTime });
};

interface NameCookies {
    first_name: string;
    last_name: string;
    image_url: string;
}

export const setNameCookies = (nameCookies: NameCookies): void => {
    Cookies.set('first_name', nameCookies.first_name, { expires: expirationTime });
    Cookies.set('last_name', nameCookies.last_name, { expires: expirationTime });
    Cookies.set('image_url', nameCookies.image_url, { expires: expirationTime });
    Cookies.set('is_active', true.toString(), { expires: expirationTime });
}

export const destroyCookies = (): void => {
    Cookies.remove('id');
    Cookies.remove('firstname');
    Cookies.remove('lastname');
    Cookies.remove('role');
    Cookies.remove('is_active');
    Cookies.remove('image_url');
    Cookies.remove('loggedIn');
    Cookies.remove('email');
    window.location.href = '/';
}

