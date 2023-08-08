export const format = (data: User[]): FormatUser[] => {
    return data.map((user) => {
        return {
            ...user,
            lastLogin: getTime(user.lastLogin),
            registrationDate: getTime(user.registrationDate),
            blocked: user.blocked === 1 ? 'blocked' : 'not blocked',
        };
    });
};

const getTime = (timestamp: string) => {
    const dateObject = new Date(timestamp);

    const formattedTime = dateObject.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const formattedDate = dateObject.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });

    return `${formattedTime} ${formattedDate}`;
};
