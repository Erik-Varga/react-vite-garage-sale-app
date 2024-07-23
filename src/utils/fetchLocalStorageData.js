export const fetchUser = () => {
    const userInfo = localStorage.getItem('garageSaleUser') !== "undefined" 
        ? JSON.parse(localStorage.getItem('garageSaleUser'))
        : localStorage.clear();
    return userInfo;
};
