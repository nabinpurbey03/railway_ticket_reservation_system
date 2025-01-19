const validate = (cred: string, element: Element | null, errorMessage: string, userRegex: RegExp) : boolean => {
    // Helper function to update error messages
    const updateError = (element: Element | null , message: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        element.innerHTML = message || ""; // Clear message if none provided
    };
    if (cred.match(userRegex)) {
        updateError(element, "");
        return true;
    }else {
        updateError(element, errorMessage);
        return false;
    }
}

export {validate};