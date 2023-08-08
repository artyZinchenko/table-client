export const getStorage = () => {
    const storageTokenString = window.localStorage.getItem('task4-aToken');
    const storageToken = storageTokenString
        ? JSON.parse(storageTokenString)
        : null;
    const storageUserString = window.localStorage.getItem('task4-aUser');
    const storageUser = storageUserString
        ? JSON.parse(storageUserString)
        : null;

    return { storageToken, storageUser };
};
