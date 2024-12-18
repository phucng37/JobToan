const formatDayAndMonth = (baseForm) => baseForm > 9  ? baseForm : ('0' + baseForm);

const formatDateToVN = (originalDate) => {
    const newDate = new Date(originalDate);
    const day = formatDayAndMonth(newDate.getDate());
    const month = formatDayAndMonth(newDate.getMonth() + 1);
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
}

export {
    formatDateToVN
}