
export class Note{
    id: number;
    content: string;
    date: Date;
    studentId: number;


    constructor(id: number, content: string, date: Date, studentId: number) {
        this.id = id;
        this.content = content;
        this.date = date;
        this.studentId = studentId;
    }

}