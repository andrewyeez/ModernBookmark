import { Component } from '@angular/core';
import { IndexDB } from '../assets/javascript/indexdb'
import {NgForm, AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  types = ['music', 'pdf', 'video', 'web'];
  master_bookmark = [];
  onSubmit(f: NgForm) {
    this.master_bookmark.push(f.value);
    console.log(this.master_bookmark);
  };
}
