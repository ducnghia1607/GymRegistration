import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/models/user/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.css'],
})
export class CreateRegistrationComponent implements OnInit {
  genders: string[] = ['Male', 'Female'];
  packages: string[] = ['Monthly', 'Quarterly', 'Yearly'];
  isUpdate: boolean = false;
  user!: User;
  userId!: number;
  isReadOnly: boolean = true;
  importantList: string[] = [
    'Toxic Fat reduction',
    'Energy and Endurance',
    'Building Lean Muscle',
    'Healthier Digestive System',
    'Sugar Craving Body',
    'Fitness',
  ];
  userForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toast: NgToastService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      height: [''],
      weight: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requiredTrainer: [''],
      package: [''],
      goal: [''],
      isGymmer: [''],
      enquiryDate: [''],
    });

    this.userForm.controls['weight'].valueChanges.subscribe((val) => {
      this.isReadOnly = false;
    });

    this.userForm.controls['height'].valueChanges.subscribe((val) => {
      this.calculateBMI(val);
    });

    // Fulfill form update
    this.activatedRouter.params.subscribe((param) => {
      if (param['id']) {
        this.userId = param['id'];
        this.api.getUserById(this.userId).subscribe((val) => {
          this.isUpdate = true;
          console.log(val, '#Update Form');
          this.userForm.patchValue(val);
        });
      }
    });
  }

  submit() {
    // console.log(this.userForm.value, '#userForm');
    this.api.postUser(this.userForm.value).subscribe((val) => {
      console.log(val);
    });
    this.api.postUser(this.user);
    this.showSuccess();
    this.userForm.reset();
  }

  update() {
    this.api.updateUser(this.userForm.value, this.userId).subscribe((val) => {
      console.log(val);
      this.showUpdateSuccess();
      this.userForm.reset();
    });
    this.isUpdate = false;
    this.router.navigate(['list']);
  }

  calculateBMI(height: number) {
    const weight = this.userForm.controls['weight'].value;
    const bmi = weight / (height * height);
    this.userForm.controls['bmi'].setValue(bmi);
    switch (true) {
      case bmi > 25 && bmi < 30:
        this.userForm.controls['bmiResult'].setValue('Overweight');
        break;
      case bmi > 18.5 && bmi < 25:
        this.userForm.controls['bmiResult'].setValue('Normal');
        break;
      case bmi < 18.5:
        this.userForm.controls['bmiResult'].setValue('Thinness');
        break;
      default:
        this.userForm.controls['bmiResult'].setValue('Obese');
        break;
    }
  }

  showSuccess() {
    this.toast.success({
      detail: 'Success',
      summary: 'Register Successfully',
      duration: 3000,
    });
  }

  showUpdateSuccess() {
    this.toast.success({
      detail: 'Update',
      summary: 'Update Successfully',
      duration: 3000,
    });
  }
}
