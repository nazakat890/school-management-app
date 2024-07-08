import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../services/role.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PermissionService } from '../services/permission.service';



@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  @ViewChild('content') content!: TemplateRef<any>;
  Roles: any[] = [];
  permissions: any[] = [];
  selectedPermissions: string[] = []
  roleForm!: FormGroup;
  currentRole:any = null;


constructor(
  private fb:FormBuilder,
  private roleSVC:RoleService,
  private modalSvc: NgbModal,
  private permissionSvc:PermissionService
) { }

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      name:['', [Validators.required]],
      description:['', [Validators.required]],
      permissions:['', Validators.required]
 })
    this.loadRoles();
    this.loadPermissions();
  }

  loadRoles(){
    this.roleSVC.getRoles().subscribe((res:any)=>{
      this.Roles = res.data ?? [];
    })
  }
  
  loadPermissions(){
    this.permissionSvc.getPermissions().subscribe((resp:any) => {
     this.permissions = resp.data ?? [];
     this.updatePermissonSelectedState()
    })
    
  }


  loadRole(perId:any){
  this.roleSVC.getRoleById(perId).subscribe((data:any) => {
  this.selectedPermissions = data.permissions.map((permission:any) => permission._id)
  this.updatePermissonSelectedState()
  this.roleForm.patchValue({
  name: data.name,
  description: data.description,
  permissions: this.selectedPermissions
});
});
  }

  updatePermissonSelectedState(){
  this.permissions = this.permissions.map(permission => {
    return { ...permission, selected:this.selectedPermissions.includes(permission._id)}
   })
   }

  resetPermissoin(){
   this.permissions = this.permissions.map(permisson =>{
     return {...permisson, selected:false}
   });
    this.selectedPermissions = [];
   }

  openModal(permission:any = null){
    this.currentRole = permission;
    if(this.currentRole) {
      this.loadRole(permission._id)
    }
    else {
      this.resetPermissoin();
      this.roleForm.reset();
    }
    this.modalSvc.open(this.content, {ariaLabelledBy: 'modal-title'})
  }

 resetForm(){
  this.roleForm.reset();
  this.resetPermissoin();
  this.modalSvc.dismissAll();
 }

  onCheckboxChange(event:any, permissionId:string) {
  if(event.target.checked) {
    if(!this.selectedPermissions.includes(permissionId)) {
      this.selectedPermissions.push(permissionId)
    }
  } else {
    const index = this.selectedPermissions.indexOf(permissionId);
    if(index > -1) {
       this.selectedPermissions.splice(index, 1)
    }
  }
     this.roleForm.patchValue({ permissions: this.selectedPermissions });
  }

  onSubmit(){
    if(this.roleForm.valid){
      if(this.currentRole) {
       this.roleSVC.updateRole(this.currentRole._id, { ...this.roleForm.value}).subscribe((res:any) => {
        this.loadRoles();
         this.modalSvc.dismissAll();
       })
      }
      else {
        this.roleSVC.createRole({...this.roleForm.value}).subscribe((res:any) => {
          this.loadRoles();
          this.modalSvc.dismissAll();
        })
      }
      
    } else {
      this.roleForm.markAllAsTouched();
    }
  }

  deleteRole(roleObj:any){
    this.roleSVC.deleteRole(roleObj._id).subscribe(
      (resp:any)=>{
      this.loadRoles()
    }, (error) => {

    })
  }

}
