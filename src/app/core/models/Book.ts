export class Book {
  constructor(
    id: number | undefined,
    title: string,
    editorial: string,
    edition: string,
    condition: number,
    position: string,
    notes: string
  ) {
    this.id = id;
    this.title = title;
    this.editorial = editorial;
    this.edition = edition;
    this.condition = condition;
    this.position = position;
    this.notes = notes;
  }

  id: number | undefined = undefined;
  title: string = '';
  editorial: string = '';
  edition: string = '';
  condition: number = -1;
  position: string = '';
  notes: string = '';
}
