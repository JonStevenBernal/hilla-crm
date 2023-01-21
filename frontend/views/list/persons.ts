interface Person {
    firstName: string;
    lastName: string;
    email: string;
}

const persons: Person[] = [
    {firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com'},
    {firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com'},
    {firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com'},
    //... more person objects
];
export default persons;