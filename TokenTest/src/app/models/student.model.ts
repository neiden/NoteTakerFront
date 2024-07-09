export class Student {
    id: number;
    fName: string;
    lName: string;
    age: number;
    dueDate: Date;
    school: string;
    teacherId: number;

    constructor(id: number, fName: string, lName: string, age: number, dueDate: Date, school: string, teacherId: number) {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
        this.age = age;
        this.dueDate = dueDate;
        this.school = school;
        this.teacherId = teacherId;
    }
}
