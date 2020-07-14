import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { KitsModel } from '../kits.model';
import { KitsService } from '../kits.service';

const fileUpload = require('fuctbase64');

@Component({
    selector: 'app-kits-detalle',
    templateUrl: 'kits-detalle.component.html'
  })
  export class KitsDetalleComponent implements OnInit, OnChanges {
    @ViewChild('kitDetalle') public modal: ModalDirective;
    @ViewChild('warning') modalIncompleto;

    public kitForm: FormGroup;
    public tituloWarning = '';
    public mensajeWarning = '';
    public editar = false;
    public nuevo = true;
    public auxImg64 = '';
    public fileResult: any = {
      name: ''
    };
    @Input()
    kit: KitsModel = { };
    @Output()
    recargar: EventEmitter<any> = new EventEmitter();


    constructor(private kitsService: KitsService,
                private fb: FormBuilder,
                private sanitizador: DomSanitizer) {
    }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Cambios');
    console.log(changes);
  }

    ngOnInit() {
      this.kitForm = this.fb.group({
        idKit: ['', Validators.compose([Validators.required, Validators.pattern('^[\\s\\S]{1,100}$')])],
        nombre: ['', Validators.compose([Validators.required, Validators.pattern('^[\\s\\S]{1,100}$')])],
        descripcion: ['', Validators.compose([Validators.required,
          Validators.pattern('^[\\s\\S]{1,150}$')])],
      });

    }

    onFileChange(event) {
      console.log(event);
      fileUpload(event).then(result => {
        console.log(result);
        this.fileResult = result;
        if (this.fileResult.size >= 1048487) {
            this.tituloWarning = 'Límite exedido';
            this.mensajeWarning = 'El tamaño de la imagen debe de ser menor a 1MB';
            this.modalIncompleto.show();
            return;
        }

        this.auxImg64 = this.fileResult.base64;
        const imgPath  = this.sanitizador.bypassSecurityTrustResourceUrl('data:image/png;base64,'
        + this.auxImg64);
        console.log(this.fileResult);
      });
  }

  guardarKit(): void {
    console.log(this.kit);
    // Validar campos
    if (this.kitForm.valid === false) {
      this.tituloWarning = 'Información incompleta';
      this.mensajeWarning = 'Favor de llenar los campos obligatorios';
      Object.keys(this.kitForm.controls).forEach(field => {
        const control = this.kitForm.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({onlySelf: true});
        }
      });
      this.modalIncompleto.show();
      return;
    }

    if (!this.kit.stock) {
      console.log('Creando');
      this.kitsService.creaKit(this.kit).subscribe(res => {
        this.modal.hide();
        this.recargar.emit('nuevo');
    }, err => {
      console.log('Ocurrio un problema al crear');
      console.log(err);
    });
    } else {
      console.log('Actualizando');
      this.kitsService.actualizaKit(this.kit.iD_KITS, this.kit).subscribe(res => {
        this.modal.hide();
        this.recargar.emit('actulizado');
      }, err => {
        console.log('Ocurrio un problema al actualizar');
        console.log(err);
      });
    }
  }

  handleEvent(event: any): void {
    console.log( `${event.name} has been click on img ${event.imageIndex + 1}` );

    switch (event.name) {
      case 'print':
        console.log('run print logic');
        break;
    }
}

}
