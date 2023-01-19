export class Element {
    constructor(id: number | undefined, name: string, lname: string | undefined, checked: boolean) {
        this.id = id;
        this.name = name;
        this.lname = lname;
        this.checked = checked;
    }

    id: number | undefined;
    name = '';
    lname: string | undefined;
    checked = false;
}
