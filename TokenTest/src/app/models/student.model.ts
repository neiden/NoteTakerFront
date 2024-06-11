export class Student {
    id: number;
    fName: string;
    lName: string;
    age: number;
    dueDate: Date;
    school: string;
    email: string;

    constructor(id: number, fName: string, lName: string, age: number, dueDate: Date, school: string, email: string) {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
        this.age = age;
        this.dueDate = dueDate;
        this.school = school;
        this.email = email;
    }
}
