import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { AddPinComponent } from './components/add-pin/add-pin.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { DndDirective } from './directives/dnd.directive';

@NgModule({
  declarations: [
    AddCustomerComponent,
    AddPinComponent,
    ClickOutsideDirective,
    DndDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxSelectModule
  ],
  exports : [
    AddCustomerComponent,
    AddPinComponent,
    ClickOutsideDirective,
    DndDirective
  ]
})
export class SharedModule { }
