import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { Sort } from '../models/sort';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  columns: Array<any> = ['Title', 'Author', 'Edition'];
  book: Book = new Book();
  books: Array<Book> = new Array<Book>();
  counter: number = 0;
  sort: Sort = new Sort();

  constructor() { }

  ngOnInit(): void {
    this.books = [
      {id: 1, title: 'Java How to Program', authorName: 'Deitel & Deitel', editionYear: 2007},
      {id: 2, title: 'Patterns of Enterprise Application Architecture', authorName: 'Martin Fowler', editionYear: 2002},
      {id: 3, title: 'Head First Design Patterns', authorName: 'Elisabeth Freeman', editionYear: 2004},
      {id: 4, title: 'Internet & World Wide Web: How to Program', authorName: 'Deitel & Deitel', editionYear: 2007},
    ]
  }

  /** Adiciona novo livro no array de livros para preencher a tabela*/
  addNewBook() {
    if(this.books.length > 0) this.counter = Math.max(...this.books.map(x => x.id));
    this.counter = ++this.counter;

    if (this.book) {
      this.book.id = this.counter;

      this.books.push(this.book);
      this.book = new Book();
    }
  }

  /** Ordenar de acordo com as colunas recebidas no parâmetro, e se é ascendente ou descendente*/
  orderItems(column: string, isAsc: boolean) {
    if(isAsc) {
      this.orderByAsc(column);
    } else {
      this.orderByDesc(column);
    }
  }

  orderByAsc(column: string) {
    console.log(column)
    if (column == 'author') {
      this.sort.authorNameDesc = false;
      this.books.sort((a, b) => (a.authorName < b.authorName ? -1 : 1));
    } else if ('title') {
      this.sort.titleDesc = false;
      this.books.sort((a, b) => (a.title < b.title ? -1 : 1));
    } else if ('edition') {
      this.sort.editionYearDesc = false;
      this.books.sort((a, b) => a.editionYear - b.editionYear);
    }
  }

  orderByDesc(column: string) {
    if (column == 'author') {
      this.sort.authorNameAsc = false; 
      this.books.sort((a, b) => (a.authorName > b.authorName ? -1 : 1));
    } else if ('title') {
      this.sort.titleAsc = false;
      this.books.sort((a, b) => (a.title > b.title ? -1 : 1));
    } else if ('edition') {
      this.sort.editionYearAsc = false;
      this.books.sort((a, b) => b.editionYear - a.editionYear);
    }
  }
}
