export class Picture {
  id: number;
  url: string;

  constructor(id: number) {
    this.id = id;
    this.url = 'https://picsum.photos/id/' + id + '/200/200';
  }
}
