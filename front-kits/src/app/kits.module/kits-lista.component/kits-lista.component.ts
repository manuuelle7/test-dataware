import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { ModalDirective as md,  MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { DomSanitizer } from '@angular/platform-browser';
import { KitsModel } from '../kits.model';
import { KitsService } from '../kits.service';
import { KitsDetalleComponent } from '../kits-detalle.component/kits-detalle.component';

@Component({
    selector: 'app-kits-lista',
    templateUrl: 'kits-lista.component.html'
  })
  export class KitsListaComponent implements OnInit, AfterViewInit {
    public elements: any = [];
    previous: any = [];

    @ViewChild('completado') modalCompletado;

    @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
    @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

    @ViewChild(KitsDetalleComponent) modalDetalle;
    @ViewChild('basicDeleteConfirmModal') basicDeleteConfirmModal?: md;
    mensajeEliminar = '';
    tituloSuccess = '';
    mensajeSuccess = '';

    public listaKits: KitsModel[] = [];
    public kit: KitsModel = {};

    constructor(private kitsService: KitsService,
                private cdRef: ChangeDetectorRef,
                private sanitizador: DomSanitizer) { }

    ngOnInit() {
        this.limpiarVaribles();
        this.cargarKits();
    }

    limpiarVaribles(): void {
        this.listaKits = [];
        this.kit = {};
    }
    cargarKits(): void {
        this.kitsService.obtieneKitsLista().subscribe(res => {
            console.log('Por fin');
            this.listaKits = res;
            console.log(this.listaKits);
            this.mdbTable.setDataSource(this.listaKits);
            this.listaKits = this.mdbTable.getDataSource();
            this.previous = this.mdbTable.getDataSource();
            console.log(this.listaKits);
        });

    }

    ngAfterViewInit() {
        this.cdRef.detectChanges();
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
        this.mdbTablePagination.calculateFirstItemIndex();
        this.mdbTablePagination.calculateLastItemIndex();
      }

    kitCreado(event: any): void {
        this.limpiarVaribles();
        this.cargarKits();
        if ( event === 'nuevo') {
            this.tituloSuccess = 'Correcto';
            this.mensajeSuccess = 'El KIT se creó correctamente';
        } else {
            this.tituloSuccess = 'Correcto';
            this.mensajeSuccess = 'El KIT se actualizó correctamente';
        }

        this.modalCompletado.show();
    }

    nuevo(): void {
        this.kit = {};
        this.modalDetalle.fileResult = {};
        this.modalDetalle.kitForm.reset();
        this.modalDetalle.nuevo = true;
        this.modalDetalle.aux_img64 = '';
        this.modalDetalle.fileResult.name = '';
        this.modalDetalle.editar = true;
        this.modalDetalle.modal.show();
    }

    detalle(kit: any): void {
        this.kit = kit;
        this.modalDetalle.nuevo = false;
        this.modalDetalle.aux_img64 = '';
        this.modalDetalle.fileResult.name = '';
        this.modalDetalle.editar = false;
        this.modalDetalle.modal.show();
    }

    eliminar(kit: any): void {
        this.kit = kit;
        this.mensajeEliminar = '¿Está seguro de eliminar el KIT: ' + this.kit.nombre + '?';
        this.basicDeleteConfirmModal.show();
    }

    confirmEliminar(): void {
        console.log(this.kit);
        this.kitsService.eliminarKit(this.kit.iD_KITS).subscribe(res => {
            this.mensajeSuccess = 'El KIT se eliminó correctamente';
            this.limpiarVaribles();
            this.cargarKits();
            this.modalCompletado.show();
            this.basicDeleteConfirmModal.hide();
        }, err => {
            console.log('Algo salió muy mal' + err);
        });
    }
}
