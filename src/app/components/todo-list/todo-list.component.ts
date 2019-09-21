import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import {  Todo } from '../../interfaces/Todo'
import { trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations:[
    trigger('fade',[
     
      transition(':enter',[
        style( { opacity:0,transform:'translateX(60px)'} ) ,
        animate(700, style({ opacity:1,transform:'translateX(0px)'}))
      ]),
      transition(':leave',[
        
        animate(700,  style({ opacity:0,transform:'translateX(-60px)'}))
      ])
    ])
  ]
})

export class TodoListComponent implements OnInit {
  
todos: Todo[];
todoTitle: string;
idForTodo: number;
beforeEditCache: string;
filter: string;

  constructor() { }

  ngOnInit() {
    this.filter='all';
    this.idForTodo = 0;
    this.todoTitle= '';
    this.todos = []
  }
  addTodo():  void{
    if (this.todoTitle.trim().length===0) {
      return;
      
    }
    this.todos.push(
      {
        id: this.idForTodo,
        title: this.todoTitle,
        completed: false,
        editing: false,
      },
    )
    this.todoTitle='';
    this.idForTodo++;
    
  }
  deleteTodo(id:number){
    this.todos = this.todos.filter(todo => todo.id!==id);
    
  }
  
  remaining(): number{
    return this.todos.filter(todo => !todo.completed).length;
  }
  completed(): number{
    return this.todos.filter(todo => todo.completed).length;
  
  }
atLeastOneCompleted():boolean{
  return this.todos.filter(todo => todo.completed).length>0;

}

clearCompleted(): void{
  this.todos=this.todos.filter(todo => !todo.completed);
}
todosFiltered(): Todo[]{
  if(this.filter==='all'){
    return this.todos;
  }
  else if(this.filter==="active"){
    return this.todos.filter(todo => !todo.completed);
  }
  else if(this.filter==="completed"){
    return this.todos.filter(todo => todo.completed);
  }
  return this.todos;
}
}