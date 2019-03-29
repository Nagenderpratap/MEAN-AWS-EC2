import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { bModel } from './bookModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @ViewChild('fileInputLogo') fileInputLogo: ElementRef;

  private id: any;
  public totalContacts: number;
  constructor(private http: HttpClient, private toastr: ToastrService, ) { }
  // bookSchema = new bModel();
  // contactWork: bModel;
  // contact: Contact = new Contact();

  bookSchema = new bModel();
  _bookSchema: bModel = new bModel();

  updateSchema = new bModel();
  book = {
     title:String,
     author:String,
     profile:String
  };
  books : any = [];
  
  authorName: string;
  bookName: string;
  showEdit = false;


  ngOnInit() {
    this.http.get('/api/book').subscribe(res => {
      let response:any =[];
      this.books = [];
       response =  res['data'];
       this.totalContacts = response.length;
      for(let i=0;i< response.length;i++){
        let boo : any = {};
        boo.author = response[i].author;
        boo.title = response[i].title;
        if(response[i].profile){
        boo.profile = 'data:image/jpg;base64,' + response[i].profile;
      }else{ 
        boo.profile = "";
      }
       boo._id = response[i]._id;
        this.books.push(boo);
      }
      // this.books = res['data'];

    });

    //  this.http.get("/api/:id").subscribe(res => {
    //   // let response:any = data.json();
    //   this.books = res['data'];
    //   alert(JSON.stringify(this.books));
    //
    // });
  }

  @Output() eventClicked = new EventEmitter<Event>();


  public submitBook() {
    if (this._bookSchema.authorName != '') {

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      console.log('book schema' + JSON.stringify(this._bookSchema));

      this.http.post('/api/save', this._bookSchema).subscribe(res => {
        this.toastr.success('ADD Book successfully..!', 'Done!',
          {
            progressBar: true, timeOut: 3000, progressAnimation: 'decreasing',
            positionClass: 'toast-bottom-right'
          });
      });
    } else {
      this.toastr.error('Something went wrong', 'Error!',
        {
          progressBar: true, timeOut: 3000, progressAnimation: 'decreasing',
          positionClass: 'toast-bottom-right'
        });
    }
      this.ngOnInit();
  }

  public EditData(event: number, book: any) {
    console.log(JSON.stringify(event));
    console.log('book==' + JSON.stringify(book));

    this.bookSchema.authorName = book.author;
    this.bookSchema.bookName = book.title;
    this.id = book._id;
    this.updateSchema = book;
    // this.showEdit = true;
    // this.bookSchema.authorName[position] ="";
    // this.bookSchema[event].bookName= "";
  }

  public updateBook() {
    const bookId = this.id;
    var putUrl = '/api/updateBook/' + bookId;
    this.http.put(putUrl, this.bookSchema).subscribe(res => {
      window.location.reload(true);
    });
  }

  public DeleteData(event: number, book: any) {
    const bookId = book._id;
    var putUrl = '/api/deleteBook/' + bookId;
    this.http.delete(putUrl).subscribe(res => {
      this.toastr.success('User deleted successfully..!', 'Done!',
        {
          progressBar: true, timeOut: 3000, progressAnimation: 'decreasing',
          positionClass: 'toast-bottom-right'
        });
    }, err=>{
      this.toastr.error('something went wrong...')
    });
    this.ngOnInit()
    // window.location.reload(true);
  }

  public fileChange(input) {
    this.readFiles(input.files);
  }

  public readFile(file, reader, callback) {
    reader.onload = () => {
      callback(reader.result);
      this._bookSchema.profile = reader.result;
      console.log('renderr----' + reader.result);
    }
    reader.readAsDataURL(file);
  }

  public readFiles(files, index = 0) {
    // Create the file reader
    let reader = new FileReader();
    // If there is a file
    if (index in files) {
      // Start reading this file
      this.readFile(files[index], reader, (result) => {
        // Create an img element and add the image file data to it
        var img = document.createElement("img");
        img.src = result;
      });
    }
  }
}
