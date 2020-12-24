import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  idCotizacion: string;

  constructor(private db: AngularFirestore) { }

  cargarSolicitudes(idProveedor: string){
    return this.db.collection('solicitudes', ref => ref
                  .where('proveedor', '==', idProveedor)
                  .where('estado', '==', 'Enviado'))
                  .snapshotChanges()
                  .pipe(
                    map(actions =>
                     actions.map(resp => {
                       const data = resp.payload.doc.data() as any;
                       const id = resp.payload.doc.id;
                       return {id, ...data};
                     }))
                  );
  }

  cargarTodasSolicitudes(idProveedor: string){
    return this.db.collection('solicitudes', ref => ref
                  .where('proveedor', '==', idProveedor))
                  .snapshotChanges()
                  .pipe(
                    map(actions =>
                     actions.map(resp => {
                       const data = resp.payload.doc.data() as any;
                       const id = resp.payload.doc.id;
                       return {id, ...data};
                     }))
                  );
  }

  cargarCotizaciones(idProveedor: string){
    return this.db.collection('cotizaciones', ref => ref
                  .where('proveedor', '==', idProveedor)
                  .where('estado', '==', 'Cotizado'))
                  .snapshotChanges()
                  .pipe(
                    map(actions =>
                     actions.map(resp => {
                       const data = resp.payload.doc.data() as any;
                       const id = resp.payload.doc.id;
                       return {id, ...data};
                     }))
                  );
  }

  cargarProveedoresPorCategoria(categoria: string){
    return this.db.collection('proveedores', ref => ref
                  .where('categoria', '==', categoria))
                  .snapshotChanges()
                  .pipe(
                    map(actions =>
                     actions.map(resp => {
                       const data = resp.payload.doc.data() as any;
                       const id = resp.payload.doc.id;
                       return {id, ...data};
                     }))
                  );
  }

  cargarDatosProveedor(idProveedor: string){
    return this.db.collection('proveedores').doc(idProveedor).valueChanges();
  }

  enviarCotizacion(quote: any){
    return this.db.collection('cotizaciones').add(quote);
  }

  cargarCategorias(){
    return this.db.collection('categorias')
                  .snapshotChanges()
                  .pipe(
                    map(actions =>
                     actions.map(resp => {
                       const data = resp.payload.doc.data() as any;
                       const id = resp.payload.doc.id;
                       return {id, ...data};
                     }))
                  );
  }

  actualizarEstadoSolicitud(idSolicitud: string){
    return this.db.collection('solicitudes').doc(idSolicitud).update({estado: 'Cotizado'});
  }
}
