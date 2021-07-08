import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {

  currentTodo: Todo = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getTodo(this.route.snapshot.params.id);
  }

  getTodo(id: string): void {
    this.todoService.getById(id)
      .subscribe(
        data => {
          this.currentTodo = data
          console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTodo.title,
      description: this.currentTodo.description,
      published: status
    };

    this.message = '';

    this.todoService.update(this.currentTodo.id, data)
      .subscribe(response => {
        this.currentTodo.published = status;
        console.log(response);
        this.message = response.message ? response.message : 'O status foi atualizado com sucesso!';
      }, error => {
        console.log(error)
      })
  }

  updateTodo(): void {
    this.message = '';

    this.todoService.update(this.currentTodo.id, this.currentTodo)
      .subscribe(response => {
        console.log(response);
        this.message = response.message ? response.message : 'A tarefa foi atualizada com sucesso!';
      }, error => {
        console.log(error);
      });
  }

  deleteTodo(): void {
    this.todoService.delete(this.currentTodo.id)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/todo']);
      }, error => {
        console.log(error)
      });
  }

}
