import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { startWith, map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TermComponent } from '../term/term.component';
import { Router } from '@angular/router';
import { auth } from 'firebase';

export interface State {
  flag: string;
  name: string;
  population: string;
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup:FormGroup;
  countries = [];
  filteredStates: Observable<State[]>;

  constructor(private fb:FormBuilder,private authService:AuthService,public dialog: MatDialog,
    private router:Router,private snackBar:MatSnackBar) {
    this.registerFormGroup = this.fb.group({
      firstName:[null,[Validators.required,Validators.minLength(2)]],
      lastName:[null,[Validators.required,Validators.minLength(2)]],
      email:[null,[Validators.required,Validators.email]],
      // UserName:[null,[Validators.required,Validators.minLength(2)]],
      password:[null,[Validators.required,Validators.minLength(6)]],
      conformPassword:[null,[Validators.required,Validators.minLength(6)]],
      mobileNumber:[null,[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      country:[null,Validators.required],
      state:[null,Validators.required],
      dob:[null,Validators.required],
    },this.pwdMatchValidator)
    this.countries = this.authService.AllCountry;

    this.filteredStates = this.registerFormGroup.controls['country'].valueChanges.pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.countries.slice())
      );
  }

  pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('conformPassword').value
       ? null : {'mismatch': true};
 }


  ngOnInit(){
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter(state => state.country.toLowerCase().indexOf(filterValue) === 0);
  }
  openDialog() {
    const dialogRef = this.dialog.open(TermComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSubmit(value){
    value.dob = value.dob.toString();
    this.authService.createAccount(value).then(user=>{
      this.updateUser(user,value);
    }).catch(err=>{
      this.snackBar.open(err.message,'',{
        duration:5000,
        horizontalPosition:'end',
        verticalPosition:'top'
      })
    })
  }

  updateUser(user:auth.UserCredential,value){
    user.user.updateProfile({
      displayName:value.firstName+value.lastName,
      photoURL:"assets/profile.svg"
    });
    value.id = user.user.uid;
    this.updateIntoDB(value)
  }

  updateIntoDB(value){
    this.authService.addUserToBD(value).then(d=>{
      this.router.navigate([''])
    }).catch(err=>alert(err))
  }

}
