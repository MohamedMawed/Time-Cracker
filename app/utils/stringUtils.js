export const getInitials = name => {
    let initials = Array.prototype.map
        .call(name.split(' '), function (x) {
            return x.substring(0, 1).toUpperCase();
        })
        .join('');
    return initials.substring(0, 2);
};


export function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        return true
    return false
}