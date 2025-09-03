export function parseDateWithOrdinal(str) {
    // Remove suffix (st, nd, rd, th)
    const cleanStr = str.replace(/(\d+)(st|nd|rd|th)/gi, "$1");

    const date = new Date(cleanStr);
    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date string: ${str}`);
    }
    return date;
}

// Formatters
export function formatDDMMYYYY(date) {
    return date.toLocaleDateString("en-US"); // 18/06/2022
}

export function formatLong(date) {
    return date.toLocaleDateString("en-US", {
        weekday: "long", // Saturday
        day: "numeric",  // 18
        month: "long",   // June
        year: "numeric"  // 2022
    });
}