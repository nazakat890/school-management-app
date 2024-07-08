import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild('content') content!: TemplateRef<any>;
  Users: any[] = [];
  Roles: any[] = [];
  selectedRoles: string[] = [];
  userForm!: FormGroup;
  currentUser:any = null;

  constructor(
    private fb:FormBuilder,
    private modalSvc: NgbModal,
    private userSvc: UserService,
    private roleSvc:RoleService
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      roles:[[], Validators.required]
      // dateOfBirth:['', [Validators.required]],
      // mobileNumber:['', [Validators.required]],
      // gender:['', [Validators.required]],
      // occupation:['', [Validators.required]],
    })
    this.loadRoles();
    this.loadUsers();

  }


  loadRoles(){
    this.roleSvc.getRoles().subscribe((res:any)=>{
      this.Roles = res.data ?? [];
      this.updateSelectedRoleState()
    })
  }
  loadUsers(){
    this.userSvc.getUsers().subscribe((res:any)=>{
      this.Users = res.data ?? [];
    });
  }



  loadUser(userId:any) {
    this.userSvc.getUserById(userId).subscribe((res:any)=>{
      this.selectedRoles = res.roles.map((role:any) => role._id);
      this.updateSelectedRoleState();
      this.userForm.patchValue({
        username: res.username,
        email: res.email,
        roles: res.roles.map((role:any) => role._id)
      })
    })
  }

  updateSelectedRoleState() {
    this.Roles = this.Roles.map((role:any) => {
      return {...role, selected: this.selectedRoles.includes(role._id)}
    })
  }

  resetRoles(){
    this.Roles = this.Roles.map(role => {
      return {...role, selected: false}
    })

  }

  resetForm() {
    this.resetRoles();
    this.userForm.reset();
    this.modalSvc.dismissAll();

  }

  openModal(userobj:any = null) {
    this.currentUser = userobj;
    if(this.currentUser) {
      this.loadUser(userobj._id);
    }
    else {
      this.userForm.reset();
      this.resetRoles();
    }
    this.modalSvc.open(this.content, { ariaLabelledBy :''})
  }

  onCheckboxChange(event:any, roleId:string){
    if(event.target.checked) {
      if(!this.selectedRoles.includes(roleId)){
        this.selectedRoles.push(roleId)
      }
    } else {
      let index = this.selectedRoles.indexOf(roleId);
      if(index > -1) {
        this.selectedRoles.splice(index,1)
      }
    }
    this.userForm.patchValue({roles: this.selectedRoles})
   }

   onSubmit(){
    if(this.userForm.valid) {
      if(this.currentUser) {
        this.loadUsers();
        this.modalSvc.dismissAll();
        this.userSvc.updateUser(this.currentUser._id, {...this.userForm.value}).subscribe((resp:any) => {
          this.loadUsers();
          this.modalSvc.dismissAll();
        })
      }
      else {
        this.userSvc.createUser({...this.userForm.value}).subscribe(
          (resp:any) => {
            this.loadUsers();
            this.modalSvc.dismissAll();

          }, (error) => {

          })
        
      }

    } else {
      this.userForm.markAllAsTouched();
    }
  }

verifyUser(userobj:any) {
this.userSvc.verifyUser(userobj._id).subscribe((resp:any) => {
    this.loadUsers();
}, (error) => {

})
}

  deleteUser(userObj:any){
    this.userSvc.deleteUser(userObj._id).subscribe((res)=>{
     this.loadUsers();
    })
  }
}
