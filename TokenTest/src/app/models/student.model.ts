export class Student {
    id: number;
    fName: string;
    lName: string;
    dueDate: Date;
    school: string;
    teacherId: number;
    eligDate: Date;
    birthDate: Date;
    age: number;

    constructor(id: number, fName: string, lName: string, dueDate: Date, school: string, teacherId: number, eligDate: Date, birthDate: Date) {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
        this.dueDate = dueDate;
        this.school = school;
        this.teacherId = teacherId;
        this.eligDate = eligDate;
        this.birthDate = birthDate;
        this.age = this.calculateAge(birthDate);
    }

    calculateAge(birthDate: Date){
        var ageDifMs = Date.now() - birthDate.getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}
