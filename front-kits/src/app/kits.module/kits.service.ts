import { Injectable } from '@angular/core';
import { KitsModel } from './kits.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class KitsService {
  private url = 'https://localhost:44354';

  constructor( private http: HttpClient) { }

  public obtieneKitsLista(): Observable<KitsModel[]> {
    return this.http.get<KitsModel[]>(this.url.concat('/api-kits/kits'), {withCredentials: false});
  }

  public eliminarKit(id: string): any {
    return this.http.delete(this.url.concat('/api-kits/kits/' + id), {
      withCredentials: true
    });
  }
  public creaKit(kit: KitsModel): any {
    return this.http.post<any>(this.url.concat('/api-kits/kits'), kit, {
      withCredentials: true
    });
  }
  public actualizaKit(id: string, kit: KitsModel): any {
    return this.http.patch<any>(this.url.concat('/api-kits/kits/' + id), kit, {
      withCredentials: true
    });
  }
}
