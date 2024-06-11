export class Goal{
    id: number;
    category: string;
    recentData: number;
    studentId: number;

    constructor(id: number, category: string, recentData: number, studentId: number){
        this.id = id;
        this.category = category;
        this.recentData = recentData;
        this.studentId = studentId;
    }
}