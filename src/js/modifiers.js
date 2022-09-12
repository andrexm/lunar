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
    }
];

export default modifiers;
