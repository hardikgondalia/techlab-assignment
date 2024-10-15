import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'techlab-assignment';
  addCustomerOpen = false;
  addPinOpen = false;
  pinListData : any = [] ;
  customerData : any = [] ; 

  constructor(){}

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
  }

  addCustomerModalToggle(value:boolean){
    this.addCustomerOpen = value;
    if(localStorage.getItem('customersData')){
      let localData = JSON.parse(localStorage.getItem('customersData') || '');
      this.customerData = localData;
    }
    
  }

  addPinModalToggl(value:boolean){
    this.addPinOpen = value;
    if(localStorage.getItem('pinListData')){
      let localData = JSON.parse(localStorage.getItem('pinListData') || '');
      this.pinListData = localData
    }
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
