export class Data{
    id: number;
    studentId: number;
    goalId: number;
    independent: number;
    prompted: number;
    selfCorrected: number;
    teaching: number;
    date: Date;
    notes: string; 

    constructor(id: number, independent: number, prompted: number, selfCorrected: number, teaching: number, date: Date, notes: string, studentId: number, goalId: number){
        this.id = id;
        this.independent = independent;
        this.prompted = prompted;
        this.selfCorrected = selfCorrected;
        this.teaching = teaching;
        this.date = date;
        this.notes = notes;
        this.studentId = studentId;
        this.goalId = goalId;
    }
}