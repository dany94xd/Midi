import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConexionService } from '../../services/conexion.service';
import { NgForm } from '@angular/forms';
import { Contacto } from 'src/app/models/contacto';
//import {RecaptchaModule , RECAPTCHA_SETTINGS ,RecaptchaSettings} from 'ng-recaptcha';
//import { RecaptchaFormsModule} from 'ng-recaptcha/forms'
  
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  public contacto:Contacto;
  optionsSelect: Array<any>;


  
  ngOnInit(){
    this.contacto = new Contacto();
  }

  constructor(private connectionService: ConexionService) {

  }

  enviarContacto(form: NgForm) {
     
    this.connectionService.sendMessage(form.value).subscribe(() => {
      alert('tu mensaje se ha enviado.');
      form.reset();
    }, error => {
      console.log('Error', error);
    });
  }

}
