import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pin-list',
  templateUrl: './pin-list.component.html',
  styleUrl: './pin-list.component.scss'
})
export class PinListComponent implements OnInit{

  addCustomerOpen = false;
  addPinOpen = false;
  pinListData : any = [] ;
  customerData : any = [] ; 

  constructor(private toaster: ToastrService){}

  ngOnInit(): void {
    this.getLocalStorageData()
  }

  getLocalStorageData(){
    if(localStorage.getItem('pinListData')){
      this.pinListData = JSON.parse(localStorage.getItem('pinListData') || '')
    }
    if(localStorage.getItem('customersData')){
      this.customerData = JSON.parse(localStorage.getItem('customersData') || '')
    }
  }

  deletePin(index:any){
    this.pinListData.splice(index, 1);
    localStorage.setItem('pinListData',JSON.stringify(this.pinListData));
    this.toaster.success('Pin Deleted', 'Success')
  }

  addCustomerModalToggle(value:boolean,data?:any){
    this.addCustomerOpen = value;
    if(data){
      this.saveData(data,'customersData')
    }
  }

  addPinModalToggl(value:boolean,data?:any){
    this.addPinOpen = value;
    if(data){
      this.saveData(data,'pinListData')
    }
  }

  saveData(data:any,localStorageData:any){
    let model ={
        id : new Date().getTime(),
        ...data
      }
      let localData : any
      if(localStorage.getItem(localStorageData)){
        localData = JSON.parse(localStorage.getItem(localStorageData) || '');
        localData.push(model);
      }else{
        localData = [model];
      }
      localStorage.setItem(localStorageData,JSON.stringify(localData));

      if(localStorageData==='pinListData'){
        this.toaster.success('Pin Added', 'Success')
      }else{
        this.toaster.success('Customer Added', 'Success')
      }

      const pinData = JSON.parse(localStorage.getItem('pinListData') || '');
      const customerData = JSON.parse(localStorage.getItem('customersData') || '');
      this.pinListData = pinData
      this.customerData = customerData
  }

  clickedOutside(){
    this.addCustomerModalToggle(false)
    this.addPinModalToggl(false)
  }

  getCustomerById(id:any){
    let lable = this.customerData.find((value:any) => value.id === id)?.title;
    return lable;
  }

}
