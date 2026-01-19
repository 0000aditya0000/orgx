import { Component, ElementRef, HostListener, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { LoginService } from '../service/login.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  activeLink: any;
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  selectedIndex = 0;
  @ViewChild('myText') myText!: ElementRef;
  modalRef: BsModalRef | undefined;
  theme: string = localStorage.getItem('theme') || 'dark';
  tenantName = localStorage.getItem('tenant_name') || '';
  auth = localStorage.getItem('role');
  id: number = parseInt(localStorage.getItem('id') as string);
  links = [
    { label: 'Home', routerLink: '/home', hidden: this.auth !== 'super admin',expanded: false, icon:'home'},
    { label: 'Tenant Management', routerLink: '/home/tenant', hidden: this.auth !== 'super admin',expanded: false, icon:'apartment' },
    { label: 'Subscription Plan', routerLink: '/home/tenant/list-plans', hidden: this.auth !== 'super admin',expanded: false, icon:'loyalty' },    
    { label: 'Contact Us', routerLink: '/home/contact-us', hidden: this.auth !== 'super admin', expanded: false, icon: 'contact_page'},
    { label: 'Dashboard', routerLink: this.auth =='admin'?'/home/company': `/home/employee-dashboard/${this.id}`, hidden: this.auth == 'super admin', expanded: false,  icon: 'dashboard'},
    { label: 'Competency', routerLink: '/home/company/studio', hidden: this.auth == 'super admin',expanded: false,  icon: 'badge'},
    { label: 'Employee', routerLink: '/home/company/employee', hidden: this.auth == 'super admin',expanded: false,  icon: 'groups'},
    {
      label: 'Admin',
      icon: 'group',
      routerLink: '',
      hidden: this.auth === 'super admin' || this.auth === 'employee',
      expanded: false,
      children: [
        { label: 'Projects', routerLink: '/home/company/projects', icon:'description' },
        { label: 'Practice', routerLink: '/home/company/practices', icon:'engineering' },
        { label: 'Subscription', routerLink: '/home/company/subscription', icon:'smart_display' }
      ]
    },
    {
      label: 'User',
      icon: 'face',
      routerLink: '',
      hidden: this.auth === 'super admin',
      expanded: false,
      children: [
        // { label: 'Attendance', routerLink: '/employee/add', icon:'description' },
        { label: 'Leave', routerLink: '/home/leave', icon:'beach_access' },
      ]
    }
  ];
  userName:string ="";

  @HostListener('window:resize',['$event'])
  onResizeWindow(){
    if(window.innerWidth < 980){
      this.sidenav.mode = 'over';
      this.sidenav.close();
    }
    else{
      this.sidenav.mode = 'side'; 
      this.sidenav.open(); 
    }
  }


  constructor(private router: Router, private loginService: LoginService, 
    private modalService: BsModalService) {
    this.activeLink = this.links.find(link => this.isActiveRoute(link.routerLink));
    // this.selectedIndex = this.links.findIndex(link => this.isActiveRoute(link.routerLink));
  }

  ngOnInit(){
    if(this.auth === 'super admin'){
      this.userName = "Super Admin";
    } else if(this.auth === 'admin'){
      this.userName = this.tenantName || '';
    } else if(this.auth === 'employee'){
      this.userName = localStorage.getItem('employee_name') || '';
    }

  }



  onLogOut() {
    this.loginService.logout()
    this.closeModal()
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      initialState: {},
      class: "modal-dialog-centered",
      backdrop: "static",
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true,
    });
  }
  closeModal() {
    this.modalService?.hide();
  }
 
  toggleTheme() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove(this.theme);
    this.theme === 'dark' ?
      this.theme = 'light' : this.theme = 'dark';
    body.classList.add(this.theme);
    localStorage.setItem('theme', this.theme);
    const navInfo: HTMLElement = document.getElementById('nav-info') as HTMLElement;
    if (this.theme === 'light') {
      navInfo.style.backgroundColor = 'rgb(173 188 199)';
    } else if (this.theme === 'dark') {
      navInfo.style.backgroundColor = '#404751 ';
    }
  }
  changeBackgroundColor(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    document.querySelectorAll('.nav-info, .logout-item').forEach(item => {
      (item as HTMLElement).style.backgroundColor = '';
    });
    if (this.theme === 'light') {
      target.style.backgroundColor = 'rgb(173 188 199)';
    } else if (this.theme === 'dark') {
      target.style.backgroundColor = '#404751 ';
    }
  }

  navigateToProfile(){
    const userRole = localStorage.getItem('role');
    if(userRole === 'super admin'){
      this.router.navigate(['/home']);
    }
    else if(userRole === 'admin'){
      this.router.navigateByUrl('/home/profile');
    }
    else{
      const id = localStorage.getItem('id');
      this.router.navigateByUrl(`/home/profile/${id}`);
    }
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  openResetPassword(){
    this.router.navigate(['home/reset-password']);
  }
}