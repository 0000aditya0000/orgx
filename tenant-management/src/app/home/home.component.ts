import { Component, DestroyRef, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TenantService } from '../service/tenant.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
export interface TenantRow {
  tenant_name: string;
  tenant_code: string;
  tenant_email: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isDarkMode: boolean = false;
  tableRow: TenantRow[] = [];
  originalTableRow: TenantRow[] = [];
  modalRef: BsModalRef | undefined;
  filterValue: string = '';
  showLoading: boolean = false;
  rowdata: any;
  displayedColumns: string[] = ['tenant_name', 'tenant_code', 'tenant_email', 'created_at', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  pageSizeOptions: number[] = [10, 20, 30];
  @ViewChild('paginator') paginator!: MatPaginator;
  searchControl = new FormControl('');
  filteredData: TenantRow[] = [];
  private readonly destroy: DestroyRef = inject(DestroyRef);


  constructor(private TenantService: TenantService, public modalService: BsModalService) {
    this.setResponsivePageSizeOptions();
  }

  setResponsivePageSizeOptions() {
    const width = window.innerWidth;
    if (width <= 600) {
      this.pageSizeOptions = [5, 10];
    } else if (width <= 960) {
      this.pageSizeOptions = [10, 20];
    } else {
      this.pageSizeOptions = [10, 20, 30];
    }
  }


  ngOnInit() {
    this.getAllTenantData();
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroy))
      .subscribe((searchTerm: string | null) => {
        if (searchTerm !== null) {
          if (searchTerm === '') {
            this.tableRow = [...this.originalTableRow];
          } else {
            const lowerSearchTerm = searchTerm.toLowerCase();
            this.tableRow = this.originalTableRow.filter((row) =>
              row.tenant_name.toLowerCase().includes(lowerSearchTerm) ||
              row.tenant_email.toLowerCase().includes(lowerSearchTerm)
            );
          }
          this.dataSource = new MatTableDataSource(this.tableRow);
        }
      });

  }

  getAllTenantData() {
    this.showLoading = true;
    this.TenantService.getTenant().pipe(takeUntilDestroyed(this.destroy)).subscribe(res => {
      if (res) {
        this.originalTableRow = res.data;
        this.tableRow = res.data;
        this.showLoading = false;
        this.dataSource = new MatTableDataSource(this.tableRow)
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
      }
    }, () => {
      this.originalTableRow = [];
      this.tableRow = [];
      this.dataSource.data = []
      this.showLoading = false;
    })
  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  openModal(template: TemplateRef<any>, row?: any) {
    this.rowdata = row;
    this.modalRef = this.modalService.show(template, {
      initialState: {},
      class: "modal-dialog-centered modal-lg",
      backdrop: "static",
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true,
    });

  }

  openDetailModal(template: TemplateRef<any>, row?: any) {
    this.rowdata = row;
    this.modalRef = this.modalService.show(template, {
      initialState: {},
      class: "modal-dialog-centered modal-lg",
      backdrop: "static",
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true,
    });
  }

  submit(event: boolean) {
    if (event) {
      this.getAllTenantData();
    }
  }

  closeModal() {
    this.modalService?.hide();
    this.getAllTenantData();
  }

  isRowVisible(row: any): boolean {
    if (!this.filterValue) {
      return true;
    }
    const nameMatch = row.tenant_name.toUpperCase().includes(this.filterValue);
    const emailMatch = row.tenant_email.toUpperCase().includes(this.filterValue);
    return nameMatch || emailMatch;
  }

  hasVisibleRows(): boolean {
    return this.tableRow.some(row => this.isRowVisible(row));
  }
  ngOnDestroy() {
    window.removeEventListener('resize', this.setResponsivePageSizeOptions.bind(this));
  }
}