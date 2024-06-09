export function isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

export function shouldDisplayUser(chat, message, prevMessage, current_user_id) {
    if (chat.isDm) return false;
    if (message.user.id === current_user_id) return false;
    if (prevMessage && prevMessage.user.id === message.user.id) return false;
    return true;
}