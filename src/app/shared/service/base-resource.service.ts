import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { BaseResourceModel } from '../model/base-resource.model';
import { Injector } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Cliente } from 'src/app/pages/clientes/domain/cliente.model';

const httpOptions = {
    headers: new HttpHeaders( {'Content-Type' : 'application/json'} )
 };

const URL =  'http://localhost:8080/';

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient

    constructor (
                  protected resourcePath          : string,
                  protected injector              : Injector,
                  protected jsonDataToResourceFn  : ( jsonData: any ) => T
                ) {
            this.http = injector.get(HttpClient);        
    }

    findAll() : Observable<T[]>  {
        const URI = `${URL}${this.resourcePath}`;
        return this.http
                        .get(URI)
                        .pipe ( 
                                map ( this.jsonDataToResources.bind(this) )
                               ,catchError(this.handleError)
                              ) 
    }
    
    findById( id: number ) : Observable<T> {
        const URI = `${URL}${this.resourcePath}/${id}`;
        return this.http
                       .get(URI)
                        .pipe ( 
                                 map ( this.jsonDataToResource.bind(this) )
                                ,catchError(this.handleError)
                              ) 
    }
       
    create(resource: T): Observable<T> {
        const URI = `${URL}${this.resourcePath}`;
        return this.http
                        .post(URI, resource, httpOptions )
                        .pipe( map( this.jsonDataToResource.bind(this) )
                                ,catchError(this.handleError)
                            )
      }
    
      update(resource: T): Observable<T> {
        const URI = `${URL}${this.resourcePath}/${resource.id}`;
        return this.http
                        .put(URI, resource, httpOptions )
                        .pipe( map( () => resource )
                              ,catchError(this.handleError)
                             )
      }
    
      delete(id: number): Observable<any> {
        const URI = `${URL}${this.resourcePath}/${id}`;
        return this.http
                        .delete(URI, httpOptions )
                        .pipe( map(() => null)
                              ,catchError(this.handleError)
                             )
      }

  // PROTECTED METHODS

  protected jsonDataToResources(jsonData: any[]): T[] {

    console.log("jsonData: " , jsonData[0] as Cliente);
    console.log("Object: " , Object.assign(new Cliente(), jsonData[0] ));

    const resources: T[] = [];

            jsonData.forEach( element => resources.push( this.jsonDataToResourceFn(element) ) );

        return resources;
    }

    protected jsonDataToResource(jsonData: any): T {
        return this.jsonDataToResourceFn(jsonData);
    }

    protected handleError(error: any): Observable<any>{
            console.log("ERRO NA REQUISIÇÃO UPDATE => ", error);
        return throwError(error);
    }


}