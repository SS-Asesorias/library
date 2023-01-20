export class Author {
  constructor(id: number | undefined, name: string, lname: string | undefined) {
    this.id = id;
    this.name = name;
    this.lname = lname;
  }

  name = '';
  lname: string | undefined;
  id: number | undefined;
}
