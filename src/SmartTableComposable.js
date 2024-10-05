export function useSmartTableFunctions() {
    const sortTableRows = (rows, column, type = 'asc') => {
        if (type !== 'asc' && type !== 'desc') {
            throw new Error('Unknown sort type: ' + type);
        }

        const direction = type === 'asc' ? 1 : -1;

        return rows.sort((a, b) => {
            if (a[column] < b[column]) {
                return -1 * direction;
            } else if (a[column] > b[column]) {
                return 1 * direction;
            } else {
                return 0;
            }
        });
    };

    return {
        sortTableRows,
    }
}