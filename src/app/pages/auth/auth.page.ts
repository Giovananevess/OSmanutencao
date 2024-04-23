import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  loading = false


  constructor(
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

}
