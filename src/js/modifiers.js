const modifiers = [
    /**
     * Date - converts a timestamp to a date with the format d/m/Y
     */
    {
        name: 'date',
        action(el, timestamp) {
            let date = new Date(Number(timestamp));
            return date.getUTCDay() + "/" + date.getMonth() + "/" + date.getFullYear();
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
