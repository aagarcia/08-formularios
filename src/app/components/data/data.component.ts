import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html'
})
export class DataComponent implements OnInit {

  forma: FormGroup;
  usuario:Object = {
    nombrecompleto: {
      nombre: 'Alex',
      apellido: 'Garcia'
    },
    correo:  'a@a.com',
    pasatiempos: ['Correr', 'Dormir', 'Comer']
  };

  constructor(private formBuilder: FormBuilder) {
    this.forma = this.formBuilder.group({
      nombrecompleto: this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        apellido: ['', [Validators.required, this.noHerrera]]
      }),
      correo: ['', [Validators.required,
                    Validators.email]],
      pasatiempos: this.formBuilder.array([['Correr', Validators.required]]),
      username: ['', Validators.required, this.existeUsuario],
      password1: ['', Validators.required],
      password2: ['']
    });

    this.forma.controls['password2'].setValidators([
      Validators.required, this.noIgual.bind( this.forma )
    ]);

    /*this.forma.valueChanges.subscribe( data => {
      console.log(data)
    });*/

    /*this.forma.controls['username'].valueChanges.subscribe( data => {
      console.log(data)
    });*/

    this.forma.controls['username'].statusChanges.subscribe( data => {
      console.log(data)
    });
  }

  ngOnInit() {
    //this.forma.setValue( this.usuario );
  }

  guardarCambios() {
    console.log( this.forma.value );
    console.log( this.forma );

    /*this.forma.reset({
      nombrecompleto: {
        nombre: '',
        apellido: ''
      },
      correo: ''
    });*/
  }

  agregarPasatiempo() {
    /*(<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('Dormir', Validators.required)
    );*/
    (this.forma.controls['pasatiempos'] as FormArray).push(new FormControl('Dormir', Validators.required));
    /*const control = this.forma.get('pasatiempos') as FormArray;
    control.push(new FormControl('Dormir', Validators.required));*/
  }

  noHerrera( control: FormControl ): { [s:string]:boolean } {

    if( control.value === "herrera") {
      return {
        noherrera:true
      }
    }

    return null;
  }

  noIgual( control: FormControl ): { [s:string]:boolean } {

    let forma:any = this;
    if( control.value !== forma.controls['password1'].value ) {
      return {
        noiguales:true
      }
    }

    return null;
  }

  existeUsuario( control: FormControl ): Promise<any>|Observable<any>{
    let promesa = new Promise(
      ( resolve, reject ) => {
        setTimeout( ()=>{
          if(control.value === 'strider') {
            resolve( {existe:true} )
          } else {
            resolve( null )
          }
        }, 3000)
      }
    );

    return promesa;
  }

}
