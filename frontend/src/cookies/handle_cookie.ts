import Cookies from 'js-cookie';

interface UserCookies {
    id: string;
    firstname: string;
    lastname: string;
    role: string;
    is_active: boolean;
}

export const setUserCookies = (user: UserCookies): void => {
    const expirationTime = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 minutes from now

    Cookies.set('id', user.id, { expires: expirationTime });
    Cookies.set('firstname', user.firstname, { expires: expirationTime });
    Cookies.set('lastname', user.lastname, { expires: expirationTime });
    Cookies.set('role', user.role, { expires: expirationTime });
    Cookies.set('is_active', user.is_active.toString(), { expires: expirationTime });
};

export const destroyCookies = (): void => {
    Cookies.remove('id');
    Cookies.remove('firstname');
    Cookies.remove('lastname');
    Cookies.remove('role');
    Cookies.remove('is_active');
    window.location.reload();
}

