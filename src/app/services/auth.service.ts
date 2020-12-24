import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth,
              private db: AngularFirestore) { }

  register(email: string, password: string){
    try {
      return this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  login(email: string, password: string){
    try{
      return this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  dataProvider(idUser: string, data: any){
    return this.db.collection('proveedores').doc(idUser).set(data);
  }
  userDataConsult(id: any){
    return this.db.collection('proveedores').doc(id).valueChanges();
   }
}
