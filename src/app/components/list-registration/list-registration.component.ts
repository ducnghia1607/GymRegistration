import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgConfirmService } from 'ng-confirm-box';
import { User } from 'src/app/models/user/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-registration',
  templateUrl: './list-registration.component.html',
  styleUrls: ['./list-registration.component.css'],
})
export class ListRegistrationComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'First Name',
    'Last Name',
    'Email',
    'Mobile',
    'BMI Result',
    'Gender',
    'Package',
    'Enquiry Date',
    'Action',
  ];
  userList: User[] = [];
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private confirmService: NgConfirmService
  ) {}
  ngOnInit(): void {
    this.getRegistrationList();
  }

  getRegistrationList() {
    this.api.getUser().subscribe((val: any) => {
      this.userList = val;
      this.dataSource = new MatTableDataSource(val);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: number) {
    this.confirmService.showConfirm(
      'Are you sure want to Delete?',
      () => {
        this.api.deleteUser(id).subscribe((val) => {
          console.log(val, '#Delete User');
          this.getRegistrationList();
        });
      },
      () => {}
    );
  }
}
