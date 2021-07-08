import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todo?: Todo[];
  currentTodo: Todo = {};
  currentIndex = -1;
  title = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.retrieveTodo();
  }

  retrieveTodo(): void {
    this.todoService.getAll()
      .subscribe(
        data => {
          this.todo = data;
          console.log(data);
        },
        error => {
          console.log(error)
        }
      )
  }

  refreshList(): void {
    this.retrieveTodo();
    this.currentTodo = {};
    this.currentIndex = -1;
  }

  setActiveTodo(todo: Todo, index: number): void {
    this.currentTodo = todo;
    this.currentIndex = index;
  }

  removeAllTodos(): void {
    this.todoService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        }
      )
  }

  searchTitle(): void {
    this.currentTodo = {};
    this.currentIndex = -1;

    this.todoService.findByTitle(this.title)
      .subscribe(
        data => {
          this.todo = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
  }

}
