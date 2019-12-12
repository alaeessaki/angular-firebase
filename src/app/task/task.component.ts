import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {

  editable = false;

  myTodo = {
    title: ""
  };
  todos = [];

  constructor(private todoService:TodoService) { }

  ngOnInit() {
    this.getAllTodos();
  }

  getAllTodos(){
    this.todoService.getAll().subscribe((todos:any)=>{
      this.todos = todos;
      console.log(todos)
    })
  }

  initTodo(){
    this.myTodo = {
      title: ""
    };
  }
  

  addTodo() {
    this.todoService.persist(this.myTodo).then((todo:any)=>{
      this.initTodo();
    }).catch(
      ()=>{console.log("error")}
    )
  }

  deleteTodo(todo) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.todoService.delete(todo.id).then().catch(()=>{console.log("error")});
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Todo deleted Successfully',
            icon: 'success',
            timer: 1000
          }
        )
      }
    })
  }

  // editTodo(todo){
  //   this.editable = true;
  //   this.myTodo = todo;
  // }

  // update(){
  //   this.todoService.update(this.myTodo).subscribe((todo)=>{
  //     this.initTodo()
  //     this.editable = false;
  //   })
  // }

}
