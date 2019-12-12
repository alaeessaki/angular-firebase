import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url = "http://localhost:3000/todos";

  constructor(private afs: AngularFirestore, private http:HttpClient) { }

  getAll() {
    return this.afs.collection("todos").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Todo;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    // return this.http.get(this.url);
  }

  persist(todo: Todo) {
    return this.afs.collection("todos").add(todo);
  }
  // update(todo: Todo) {
  //   return this._http.put(`${this.url}/${todo.id}`, todo);
  // }

  delete(id) {
    return this.afs.collection("todos").doc(id).delete();
  }
}
