const modifiers = [
    /**
     * Date - converts a timestamp to a date with the format d/m/Y
     */
    {
        name: 'date',
        action(el, timestamp) {
            let date = new Date(Number(timestamp) * 1000);
            let day = date.getUTCDate();
            let month = Number(date.getMonth()) + 1;

            if (Number(day) < 10) day = '0' + day;
            if (String(month) < 10) month = '0' + month;

            return day + "/" +  month + "/" + date.getUTCFullYear();
        }
    },

    /**
     * Converts a timestamp to hours and minutes
     */
    {
        name: 'hour',
        action(el, timestamp) {
            let date = new Date(Number(timestamp));
            return date.getUTCHours() + ":" + date.getUTCMinutes();
        }
    },

    /**
     * Percent - converts a number to a percent number
     */
    {
        name: 'percent',
        action(el, value, params) {
            value = String(100 * Number(value));
            if (params.length > 0) {
                value = value.replace('.', params[0]);
            }
            return value + '%';
        }
    }
];

export default modifiers;
