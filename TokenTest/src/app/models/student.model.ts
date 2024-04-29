export class Student {
    id: number;
    fName: string;
    lName: string;
    age: number;
    dueDate: string;
    school: string;

    constructor(id: number, fName: string, lName: string, age: number, dueDate: string, school: string) {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
        this.age = age;
        this.dueDate = dueDate;
        this.school = school;
    }
}
