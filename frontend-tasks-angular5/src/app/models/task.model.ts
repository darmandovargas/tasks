export interface Task{
    id:string;
    name:string;
    priority:string;
    dueDate:string;
}

export const priorities = ['Top Priority', 'High', 'Normal', 'Low'];