const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
const locale = 'au'
export const formatDate = (date) => new Date(date).toLocaleDateString(locale, options)