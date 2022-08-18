import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contacts } from '../Models/contacts';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ContatosService {
  api_url = environment.api_url;
  private dataEdit = new BehaviorSubject<Contacts>(null!);
  botaoEdit = this.dataEdit.asObservable();

  constructor(private http: HttpClient) { }

  getContactsList(contatos: Contacts){
    this.dataEdit.next(contatos);
  }

  getContacts() {
    const headers = new HttpHeaders();
    return this.http.get<Contacts[]>(this.api_url + 'contato/list', {headers}).pipe(
      map(
        contactData => {
          if(contactData) {
            return contactData;
          } else {
            return [];
          }
        }
      )
    );
  }
  createContacts(contact: Contacts) {
   console.log("Metodo criar contato")
   const headers = new HttpHeaders({Authorization: 'Basic'});
  return this.http.post<Contacts>(this.api_url + 'contato/', contact, {headers}).pipe(
    map(
      contactData => {
        if(contactData) {
          return contactData;
        } else {
          return [];
        }
      }
    )
  );
}

deleteContacts(id: number) {
  const headers = new HttpHeaders({Authorization: 'Basic'});
  return this.http.delete(this.api_url + 'contato/remover/' + id, {headers, responseType: 'text' as 'text'}).pipe(
    map(
      contactData => {
          return contactData;
      }
    )
  );
}

  updateContacts(contact: Contacts) {
    console.log("update");
    const id = contact.id;
    const headers = new HttpHeaders({Authorization: 'Basic'});
    return this.http.put<Contacts>(this.api_url + 'contato/update/' + id, contact, {headers}).pipe(
      map(
        contactData => {
          if(contactData) {
            return contactData;
          } else {
            return [];
          }
        }
      )
    );
  }
  
  findContactByID() {

  }
  
}
