import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermissionService } from '../services/permission.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
  @ViewChild('content') content!: TemplateRef<any>;
  permissions: any[] = [];
  permissionForm!: FormGroup;
  isEditMode:boolean = false;
  currentPermission: any;

  constructor(
    private fb:FormBuilder,
    private permissionSVC:PermissionService,
    private modalSvc: NgbModal
  ) { 
    
  }

  ngOnInit(): void {
    this.permissionForm = this.fb.group({
      name:['', [Validators.required]],
      description:['', [Validators.required]]
 })
    this.loadPermissions();
  }

  loadPermissions(){
    this.permissionSVC.getPermissions().subscribe((res:any)=>{
      this.permissions = res.data ?? [];
  })
  }

  resetForm(){
    this.isEditMode = false;
    this.permissionForm.reset();
  }
  
  openModal(permission:any = null) {
    this.currentPermission = permission;
    if(permission){
      this.permissionForm.patchValue(permission)
    }
    else {
      this.permissionForm.reset();
    }
    this.modalSvc.open(this.content, {ariaLabelledBy :'modal-basic-title'})
  }



  onSubmit() {
    if(this.permissionForm.valid) {
      if(this.currentPermission) {
          this.permissionSVC.updatePermission(this.currentPermission._id,this.permissionForm.value).subscribe((resp:any) => {
          this.loadPermissions()
         this.modalSvc.dismissAll();
         });
      }
      else {
        this.permissionSVC.createPermission(this.permissionForm.value).subscribe((resp:any) =>{
          this.loadPermissions();
          this.modalSvc.dismissAll();
        })
      }
    }

    else {
      this.permissionForm.markAllAsTouched();
    }

  }


  deletePermission(permissionObj:any) {
    this.permissionSVC.deletePermission(permissionObj._id).subscribe(() => {
      this.loadPermissions();
    });
  }



}
