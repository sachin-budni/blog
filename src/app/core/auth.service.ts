import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { CurrentUser } from './auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { User } from 'firebase/app';
import { Router } from '@angular/router';
=======
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
>>>>>>> willntrix.v1

@Injectable({
  providedIn: 'root'
})
export class AuthService {
<<<<<<< HEAD
  
  private currentUserData:CurrentUser;
  constructor(private afAuth:AngularFireAuth,private storage:AngularFireStorage,private route:Router) {
  }

  currentUser(auth:User){
    let user = new CurrentUser();
    user.uid = auth.uid;
    user.verify = auth.emailVerified;
    user.profile = auth.photoURL;
    user.name = auth.displayName;
    user.email = auth.email;
    this.currentUserData = user;
  }

  user(){
    return this.afAuth.auth.currentUser;
  }

  currentUserZero(){
    this.currentUserData = undefined;
  }

  get currentUsers():CurrentUser{
    return this.currentUserData;
  }

  updateImage(event:FileList){
    console.log(event.item(0))
      let ref = this.storage.ref(event.item(0).name);
      let task = ref.put(event.item(0));
      let percentage = task.percentageChanges().toPromise().then(e=>{return e});
      percentage.then(e=>{
        if(e == 100){
         console.log(e);
         ref.getDownloadURL().toPromise().then(img=>{
           this.afAuth.auth.currentUser.updateProfile({
             photoURL:img
           })
         })
        }
      })
  }


  logout(){
    this.afAuth.auth.signOut().then(d=>{
      this.currentUserZero();
      this.route.navigate(["/blog"])
    })
  }

}
=======
  authState:Observable<User>
  constructor(private afAuth:AngularFireAuth,private http:HttpClient,private afDb:AngularFireDatabase) {
    this.authState = afAuth.authState;
  }

  get CurrentUserId(){
    return this.afAuth.auth.currentUser.uid;
  }

  get getAuthState(){
    return this.authState;
  }

  get AllCountry(){
    return Contries;
  }
  signOut(){
    this.afAuth.auth.signOut();
  }
  login(value){
    return this.afAuth.auth.signInWithEmailAndPassword(value.email,value.password);
  }
  createAccount(value){
    return this.afAuth.auth.createUserWithEmailAndPassword(value.email,value.password);
  }
  addUserToBD(values){
    return this.afDb.object(`users/${values.id}`).set(values);
  }
}

const Contries =[
  {
    "country": "Afghanistan"
  },
  {
    "country": "Albania"
  },
  {
    "country": "Algeria"
  },
  {
    "country": "American Samoa"
  },
  {
    "country": "Andorra"
  },
  {
    "country": "Angola"
  },
  {
    "country": "Anguilla"
  },
  {
    "country": "Antarctica"
  },
  {
    "country": "Antigua and Barbuda"
  },
  {
    "country": "Argentina"
  },
  {
    "country": "Armenia"
  },
  {
    "country": "Aruba"
  },
  {
    "country": "Australia"
  },
  {
    "country": "Austria"
  },
  {
    "country": "Azerbaijan"
  },
  {
    "country": "Bahamas"
  },
  {
    "country": "Bahrain"
  },
  {
    "country": "Bangladesh"
  },
  {
    "country": "Barbados"
  },
  {
    "country": "Belarus"
  },
  {
    "country": "Belgium"
  },
  {
    "country": "Belize"
  },
  {
    "country": "Benin"
  },
  {
    "country": "Bermuda"
  },
  {
    "country": "Bhutan"
  },
  {
    "country": "Bolivia"
  },
  {
    "country": "Bosnia and Herzegovina"
  },
  {
    "country": "Botswana"
  },
  {
    "country": "Bouvet Island"
  },
  {
    "country": "Brazil"
  },
  {
    "country": "British Indian Ocean Territory"
  },
  {
    "country": "Brunei"
  },
  {
    "country": "Bulgaria"
  },
  {
    "country": "Burkina Faso"
  },
  {
    "country": "Burundi"
  },
  {
    "country": "Cambodia"
  },
  {
    "country": "Cameroon"
  },
  {
    "country": "Canada"
  },
  {
    "country": "Cape Verde"
  },
  {
    "country": "Cayman Islands"
  },
  {
    "country": "Central African Republic"
  },
  {
    "country": "Chad"
  },
  {
    "country": "Chile"
  },
  {
    "country": "China"
  },
  {
    "country": "Christmas Island"
  },
  {
    "country": "Cocos (Keeling) Islands"
  },
  {
    "country": "Colombia"
  },
  {
    "country": "Comoros"
  },
  {
    "country": "Congo"
  },
  {
    "country": "The Democratic Republic of Congo"
  },
  {
    "country": "Cook Islands"
  },
  {
    "country": "Costa Rica"
  },
  {
    "country": "Ivory Coast"
  },
  {
    "country": "Croatia"
  },
  {
    "country": "Cuba"
  },
  {
    "country": "Cyprus"
  },
  {
    "country": "Czech Republic"
  },
  {
    "country": "Denmark"
  },
  {
    "country": "Djibouti"
  },
  {
    "country": "Dominica"
  },
  {
    "country": "Dominican Republic"
  },
  {
    "country": "East Timor"
  },
  {
    "country": "Ecuador"
  },
  {
    "country": "Egypt"
  },
  {
    "country": "England"
  },
  {
    "country": "El Salvador"
  },
  {
    "country": "Equatorial Guinea"
  },
  {
    "country": "Eritrea"
  },
  {
    "country": "Estonia"
  },
  {
    "country": "Ethiopia"
  },
  {
    "country": "Falkland Islands"
  },
  {
    "country": "Faroe Islands"
  },
  {
    "country": "Fiji Islands"
  },
  {
    "country": "Finland"
  },
  {
    "country": "France"
  },
  {
    "country": "French Guiana"
  },
  {
    "country": "French Polynesia"
  },
  {
    "country": "French Southern territories"
  },
  {
    "country": "Gabon"
  },
  {
    "country": "Gambia"
  },
  {
    "country": "Georgia"
  },
  {
    "country": "Germany"
  },
  {
    "country": "Ghana"
  },
  {
    "country": "Gibraltar"
  },
  {
    "country": "Greece"
  },
  {
    "country": "Greenland"
  },
  {
    "country": "Grenada"
  },
  {
    "country": "Guadeloupe"
  },
  {
    "country": "Guam"
  },
  {
    "country": "Guatemala"
  },
  {
    "country": "Guernsey"
  },
  {
    "country": "Guinea"
  },
  {
    "country": "Guinea-Bissau"
  },
  {
    "country": "Guyana"
  },
  {
    "country": "Haiti"
  },
  {
    "country": "Heard Island and McDonald Islands"
  },
  {
    "country": "Holy See (Vatican City State)"
  },
  {
    "country": "Honduras"
  },
  {
    "country": "Hong Kong"
  },
  {
    "country": "Hungary"
  },
  {
    "country": "Iceland"
  },
  {
    "country": "India"
  },
  {
    "country": "Indonesia"
  },
  {
    "country": "Iran"
  },
  {
    "country": "Iraq"
  },
  {
    "country": "Ireland"
  },
  {
    "country": "Israel"
  },
  {
    "country": "Isle of Man"
  },
  {
    "country": "Italy"
  },
  {
    "country": "Jamaica"
  },
  {
    "country": "Japan"
  },
  {
    "country": "Jersey"
  },
  {
    "country": "Jordan"
  },
  {
    "country": "Kazakhstan"
  },
  {
    "country": "Kenya"
  },
  {
    "country": "Kiribati"
  },
  {
    "country": "Kuwait"
  },
  {
    "country": "Kyrgyzstan"
  },
  {
    "country": "Laos"
  },
  {
    "country": "Latvia"
  },
  {
    "country": "Lebanon"
  },
  {
    "country": "Lesotho"
  },
  {
    "country": "Liberia"
  },
  {
    "country": "Libyan Arab Jamahiriya"
  },
  {
    "country": "Liechtenstein"
  },
  {
    "country": "Lithuania"
  },
  {
    "country": "Luxembourg"
  },
  {
    "country": "Macao"
  },
  {
    "country": "North Macedonia"
  },
  {
    "country": "Madagascar"
  },
  {
    "country": "Malawi"
  },
  {
    "country": "Malaysia"
  },
  {
    "country": "Maldives"
  },
  {
    "country": "Mali"
  },
  {
    "country": "Malta"
  },
  {
    "country": "Marshall Islands"
  },
  {
    "country": "Martinique"
  },
  {
    "country": "Mauritania"
  },
  {
    "country": "Mauritius"
  },
  {
    "country": "Mayotte"
  },
  {
    "country": "Mexico"
  },
  {
    "country": "Micronesia, Federated States of"
  },
  {
    "country": "Moldova"
  },
  {
    "country": "Monaco"
  },
  {
    "country": "Mongolia"
  },
  {
    "country": "Montserrat"
  },
  {
    "country": "Montenegro"
  },
  {
    "country": "Morocco"
  },
  {
    "country": "Mozambique"
  },
  {
    "country": "Myanmar"
  },
  {
    "country": "Namibia"
  },
  {
    "country": "Nauru"
  },
  {
    "country": "Nepal"
  },
  {
    "country": "Netherlands"
  },
  {
    "country": "Netherlands Antilles"
  },
  {
    "country": "New Caledonia"
  },
  {
    "country": "New Zealand"
  },
  {
    "country": "Nicaragua"
  },
  {
    "country": "Niger"
  },
  {
    "country": "Nigeria"
  },
  {
    "country": "Niue"
  },
  {
    "country": "Norfolk Island"
  },
  {
    "country": "North Korea"
  },
  {
    "country": "Northern Ireland"
  },
  {
    "country": "Northern Mariana Islands"
  },
  {
    "country": "Norway"
  },
  {
    "country": "Oman"
  },
  {
    "country": "Pakistan"
  },
  {
    "country": "Palau"
  },
  {
    "country": "Palestine"
  },
  {
    "country": "Panama"
  },
  {
    "country": "Papua New Guinea"
  },
  {
    "country": "Paraguay"
  },
  {
    "country": "Peru"
  },
  {
    "country": "Philippines"
  },
  {
    "country": "Pitcairn"
  },
  {
    "country": "Poland"
  },
  {
    "country": "Portugal"
  },
  {
    "country": "Puerto Rico"
  },
  {
    "country": "Qatar"
  },
  {
    "country": "Reunion"
  },
  {
    "country": "Romania"
  },
  {
    "country": "Russian Federation"
  },
  {
    "country": "Rwanda"
  },
  {
    "country": "Saint Helena"
  },
  {
    "country": "Saint Kitts and Nevis"
  },
  {
    "country": "Saint Lucia"
  },
  {
    "country": "Saint Pierre and Miquelon"
  },
  {
    "country": "Saint Vincent and the Grenadines"
  },
  {
    "country": "Samoa"
  },
  {
    "country": "San Marino"
  },
  {
    "country": "Sao Tome and Principe"
  },
  {
    "country": "Saudi Arabia"
  },
  {
    "country": "Scotland"
  },
  {
    "country": "Senegal"
  },
  {
    "country": "Serbia"
  },
  {
    "country": "Seychelles"
  },
  {
    "country": "Sierra Leone"
  },
  {
    "country": "Singapore"
  },
  {
    "country": "Slovakia"
  },
  {
    "country": "Slovenia"
  },
  {
    "country": "Solomon Islands"
  },
  {
    "country": "Somalia"
  },
  {
    "country": "South Africa"
  },
  {
    "country": "South Georgia and the South Sandwich Islands"
  },
  {
    "country": "South Korea"
  },
  {
    "country": "South Sudan"
  },
  {
    "country": "Spain"
  },
  {
    "country": "SriLanka"
  },
  {
    "country": "Sudan"
  },
  {
    "country": "Suriname"
  },
  {
    "country": "Svalbard and Jan Mayen"
  },
  {
    "country": "Swaziland"
  },
  {
    "country": "Sweden"
  },
  {
    "country": "Switzerland"
  },
  {
    "country": "Syria"
  },
  {
    "country": "Tajikistan"
  },
  {
    "country": "Tanzania"
  },
  {
    "country": "Thailand"
  },
  {
    "country": "Timor-Leste"
  },
  {
    "country": "Togo"
  },
  {
    "country": "Tokelau"
  },
  {
    "country": "Tonga"
  },
  {
    "country": "Trinidad and Tobago"
  },
  {
    "country": "Tunisia"
  },
  {
    "country": "Turkey"
  },
  {
    "country": "Turkmenistan"
  },
  {
    "country": "Turks and Caicos Islands"
  },
  {
    "country": "Tuvalu"
  },
  {
    "country": "Uganda"
  },
  {
    "country": "Ukraine"
  },
  {
    "country": "United Arab Emirates"
  },
  {
    "country": "United Kingdom"
  },
  {
    "country": "United States"
  },
  {
    "country": "United States Minor Outlying Islands"
  },
  {
    "country": "Uruguay"
  },
  {
    "country": "Uzbekistan"
  },
  {
    "country": "Vanuatu"
  },
  {
    "country": "Venezuela"
  },
  {
    "country": "Vietnam"
  },
  {
    "country": "Virgin Islands, British"
  },
  {
    "country": "Virgin Islands, U.S."
  },
  {
    "country": "Wales"
  },
  {
    "country": "Wallis and Futuna"
  },
  {
    "country": "Western Sahara"
  },
  {
    "country": "Yemen"
  },
  {
    "country": "Yugoslavia"
  },
  {
    "country": "Zambia"
  },
  {
    "country": "Zimbabwe"
  }
]
>>>>>>> willntrix.v1
