import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !:FormGroup;
  employeeModelObj:EmployeeModel = new EmployeeModel();
  employeeData : any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      salary : [''],
    })
    this.getAllEmployees();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj).subscribe((res:any) => {
      console.log(res);
      alert("Employee Added Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployees();
    },
    err => {
      alert("Something Went Wrong")
    }
    )
  };

  getAllEmployees(){
    this.api.getEmployee().subscribe(res => {
      this.employeeData = res;
    })
  }

  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id).subscribe(res => {
      alert("Employee Deleted");
      this.getAllEmployees();
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls["firstName"].setValue(row.firstName);
    this.formValue.controls["lastName"].setValue(row.lastName);
    this.formValue.controls["email"].setValue(row.email);
    this.formValue.controls["mobile"].setValue(row.mobile);
    this.formValue.controls["salary"].setValue(row.salary);
  }

  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id).
    subscribe(res => {
      alert("Updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployees();
    })
  }

}
