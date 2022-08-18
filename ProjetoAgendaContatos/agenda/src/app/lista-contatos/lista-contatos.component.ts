import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacts } from '../Models/contacts';
import { ContatosService } from '../service/contatos.service';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.scss']
})

export class ListaContatosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'email', 'telefone', 'actions'];

  contactsList: Contacts[] = [];


  constructor(public contatosService: ContatosService, private router: Router) { }

  ngOnInit(): void {
   this.getContacts();
  }
  getContacts() {
    console.log("metodo getContacts");
    this.contatosService.getContacts().subscribe(
      data => {
       this.contactsList = data;
        console.log(data);
      },
      error => {
       this.contactsList = [];
        console.log(error);
      }
    );
  }
  
    editContato(contatos:Contacts) {
    console.log("edit works")
    this.contatosService.getContactsList(contatos);
     this.router.navigate(['/cadastro-contatos']);
   }

   delContato(contatos:Contacts) {
    this.contatosService.deleteContacts(contatos.id!).subscribe (
      data => {
        String(data),
        this.getContacts();
      }
    );
       confirm("O usuário " + contatos.nome + " será deletado."); 
   }
}
