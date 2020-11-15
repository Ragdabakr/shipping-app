import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { DialogModule} from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastrModule } from 'ngx-toastr';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ToolbarModule} from 'primeng/toolbar';


@NgModule({
  declarations: [    UsersComponent,],
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
    ToastrModule.forRoot(), // ToastrModule added
    FormsModule,
    DialogModule,
    ToastrModule.forRoot(),
    ToolbarModule
  ]
})
export class UsersModule { }
