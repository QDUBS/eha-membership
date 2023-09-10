function generateRandomDateOfBirth() {
    const start = new Date(1940, 0, 1);
    const end = new Date(2020, 11, 31);
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate;
}

function generateDummyPerson() {
    const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'William', 'Olivia'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller'];
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com'];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
    const mobileNumber = `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const dateOfBirth = generateRandomDateOfBirth();

    return {
        firstName,
        lastName,
        email,
        mobileNumber,
        dateOfBirth,
    };
}

export const dummyPeople = Array.from({ length: 200 }, generateDummyPerson);
