import { BaseResourceModel } from '../model/base-resource.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Injector, OnInit, AfterContentChecked } from '@angular/core';
import { BaseResourceService } from '../service/base-resource.service';
import toastr from "toastr";
import { switchMap } from 'rxjs/operators';

export abstract class BaseResourceForm<T extends BaseResourceModel> implements OnInit, AfterContentChecked{
  
    currentAction         :  string;
    resourceForm          :  FormGroup;
    pageTitle             :  string;
    serverErrorMessages   :  string[] = null;
    submittingForm        :  boolean  = false;
  
    protected route       :  ActivatedRoute;
    protected router      :  Router;
    protected formBuilder :  FormBuilder;
  
    constructor(
                protected  injector             : Injector,
                public     resource             : T,  //  = new Cliente()
                protected  resourceService      : BaseResourceService<T>,   // injetando da mesma forma que uma interface
                protected  jsonDataToResourceFn : (jsonData) => T  // recebe jsonData e retorna um tipo T
              ) {  
  
          this.route       = this.injector.get(ActivatedRoute);
          this.router      = this.injector.get(Router);
          this.formBuilder = this.injector.get(FormBuilder);
    }
  
    ngOnInit() {
          this.setCurrentAction();
          this.buildResourceForm();
          this.loadResource();
    }
  
    ngAfterContentChecked(){
           this.setPageTitle();
    }
  
      protected abstract buildResourceForm(): void;
  
    submitForm(){
            this.submittingForm = true;
            if(this.currentAction == "new")
                this.createResource();
            else 
                  this.updateResource();
    }
  
  
    protected setCurrentAction() {
          if(this.route.snapshot.url[0].path == "new")
              this.currentAction = "new"
          
          else
              this.currentAction = "edit"
    }
  
    protected loadResource() {
      if (this.currentAction == "edit") {

        this.route.paramMap.pipe(switchMap ( params => this.resourceService.findById(+params.get("id")) ))
                                     .subscribe ( (resource) => {
                                                                    this.resource = resource;
                                                                    this.resourceForm.patchValue(resource) 
                                                                },
                                                                (error) => alert('Erro no Update.')
                                                )
      
      
        } 
    }
  
    protected setPageTitle() {
                            if (this.currentAction == 'new')
                                   this.pageTitle = this.creationPageTitle();
                            else{
                                    this.pageTitle = this.editionPageTitle();
                            }
    }
  
    protected creationPageTitle(): string {
      return "Novo"
    }
  
    protected editionPageTitle(): string {
      return "Edição"
    }
  
  
    protected createResource(){
              const resource: T = this.jsonDataToResourceFn(this.resourceForm.value); 
  
              this.resourceService.create(resource)
                                                  .subscribe(
                                                             resource => this.actionsForSuccess(resource),
                                                             error    => this.actionsForError(error)
                                                  )
    }
  
  
    protected updateResource(){
                const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);  
                
                this.resourceService.update(resource)
                                                    .subscribe( 
                                                                resource => this.actionsForSuccess(resource),
                                                                error    => this.actionsForError(error)
                                                    )
    }
  
    
    protected actionsForSuccess( resource: T ){
            toastr.success("Salvo com sucesso!");
  
            const baseComponentPath: string = this.route.snapshot.parent.url[0].path;
            
            this.router.navigateByUrl( baseComponentPath, {skipLocationChange: true} )
                       .then(
                                () => this.router.navigate( [ baseComponentPath, resource.id, "edit" ] )
                            )
     }
  
  
    protected actionsForError( error ) {
          toastr.error("Ocorreu um erro ao processar a sua solicitação!");
  
          this.submittingForm = false;
  
          if(error.status === 422)
                this.serverErrorMessages = JSON.parse(error._body).errors;
          else
                this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."]
    }
  
      
  
  }
  