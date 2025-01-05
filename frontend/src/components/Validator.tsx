const signInValidator = (username: string, password: string) => {
    const valid = {email: false, password: false};
    const userRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/;
    if (username.match(userRegex)) {
        valid.email = true;
    }
    if (password.match(pwdRegex)) {
        valid.password = true;
    }
    return valid;
}

export default signInValidator;