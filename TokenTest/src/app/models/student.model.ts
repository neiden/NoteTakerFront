export class Student {
    id: number;
    fname: string;
    lName: string;
    age: number;
    dueDate: Date;
    school: string;
    email: string;

    constructor(id: number, fname: string, lName: string, age: number, dueDate: Date, school: string, email: string) {
        this.id = id;
        this.fname = fname;
        this.lName = lName;
        this.age = age;
        this.dueDate = dueDate;
        this.school = school;
        this.email = email;
    }
}
