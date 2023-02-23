import { Component, OnInit } from '@angular/core';
import { Task } from '../../task';
import { TaskService } from '../../services/task.service';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  showAddTask: boolean = false;
  showAddTask_: boolean = false;
  subscription: Subscription;
  @Input() color:string;
  @Input() text:string;
  @Output() btnClick = new EventEmitter();

  constructor(private taskService:TaskService,private uiService: UiService){
    // this.subscription = this.uiService.onToggle().subscribe( value => this.showAddTask = value );
  }

  ngOnInit(): any {
    this.subscription = this.uiService.onToggle().subscribe( value => this.showAddTask_ = value );
    console.log('abccc');

    return this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }


  deleteTask(task: Task): any{

    this.taskService
    .deleteTask(task)
    .subscribe(

      () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))

      );
  }

  toggleReminder(task: Task): any{
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task): any{
    this.taskService.addTask(task).subscribe(
      (task) => (this.tasks.push(task))
    )
  }

  toggleAddTask(){
    // this.uiService.toggleAddTask();
    this.showAddTask = !this.showAddTask;
  }

}
