import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContatosService } from '../service/contatos.service';
import { Contacts } from '../Models/contacts';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {

  formContatos = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('',[Validators.required]),
  });
  contact!: Contacts;

  constructor(private router: Router, public contatosService: ContatosService) { }

  ngOnInit() {
    this.contatosService.botaoEdit.subscribe(result => {
      if(result != null) {
        this.contact = result;
        this.formContatos.get('id')!.setValue(result.id! as unknown as string );
        this.formContatos.get('nome')!.setValue(result.nome);
        this.formContatos.get('email')!.setValue(result.email);
        this.formContatos.get('telefone')!.setValue(result.telefone);
      } 
    });
  }

   save() {
    if(this.formContatos.valid) {
      if(this.contact) {
        this.edit(this.contact);
      } else {
        this.create();
       
        alert("Contato cadastrado!")
      }
    } else {
   
      console.log("erro");
      alert("Preencha todos os campos!")
    }
  }

  edit(contact: Contacts){
    console.log("edit in contComp")
    this.contact
    contact.nome = this.formContatos.get('nome')!.value as any;
    contact.telefone = this.formContatos.get('telefone')!.value as any;
    contact.email =  this.formContatos.get('email')!.value as any;
    this.contatosService.updateContacts(contact).subscribe(
      data => {
        
        this.router.navigate(['/lista-contatos']);
        },
        error => {
        
        }
    );
  }

  create() {
   this.contatosService.createContacts(this.formContatos.value as any).subscribe  (
      data => {
    this.router.navigate(['/lista-contatos']);
      },
        error => {
        console.log("erro create")
        }
    )
  };
}
