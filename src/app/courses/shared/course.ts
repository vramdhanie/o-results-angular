import { Control } from '../../controls/shared/control';

export class Course {
    _id: string;
    location: string;
    name: string;
    mapdate: string;
    type: string;
    inorder: boolean;
    controls: Control[];
}