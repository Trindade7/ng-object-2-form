# NgObject2Form

This service has functions that make creating forms easier. 

The general idea is that you **pass an object and it auto generates a formGroup for the content of that object which means you also don't have to update your formGroup everytime you make changes to the object**. It also has a function to get an object of a formGroup data.


In my case, instead of interfaces I use classes with contructors which simplify my workflow even further.

# Usage:

### Generate Form
Import and inject the service to the component that uses it:

```Typescript
import { NgObject2FormService } from 'NgObject2Form';
    ...
export class AddSupplierComponent {
  supplier = {
    name: '',
    phoneList: {
        phone1: '',
        phone2: ''
    }
  };

  supplierForm: FormGroup = this.genFormService.genFormFromClass(this.supplier);

  constructor(
    private genFormService: NgObject2FormService,
  ) { }
  
  submitForm() {
    ... your submition code
  }

}
    
```

The ```supplierForm``` from the code above will be a FormGroup with ```name``` as a controller and ```phoneList``` as a child FormGroup that has ```phone1``` and ```phone2``` as controllers. Than you just use the it in your template as you would with any reactive Form:

```HTML
<form [formGroup]="supplierForm" (ngSubmit)="submitForm()">
    <input type="text" formControlName="name">

    <div formGroupName="phoneList">
        <label for="phone1">phone1:</label>
        <input type="text" formControlName="phone1" required>

        <label for="phone1">phone 2:</label>
        <input type="text" formControlName="phone1">
    </div>
    
    <button type="submit">Submit</button>
</form>
```

### Get Form data:

To simplify retrieving the form data there is also a function ```getFormData(FormGroup)``` that takes a FormGroup and returns the submited data as an object:

```Typescript
submitForm() {
    this.supplier = this.genFormService.getFormData(supplierForm);
}
```

## Simple example: 

```Typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgObject2FormService } from 'NgObject2Form';

class Supplier {
    name: string;
    mail: string;
    phoneList: number[];

    constructor() {
        this.name = '';
        this.mail = '';
        this.phoneList = []
    }
}

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {
  currentSupplier: Supplier = new Supplier();

  supplierForm: FormGroup<Supplier>;

  constructor(
    private genFormService: NgObject2FormService,
  ) { }

  ngOnInit() {
    this.supplierForm = this.initSupplier();
  }

  initSupplier() {
    const newSupForm = this.genFormService.genFormFromClass(this.currentSupplier);
    return newSupForm;
  }

  addSupplier(supplier: FormGroup) {
    this.currentSupplier = this.genFormService.getFormData(supplier) as Supplier;
  }

}
```

**OBS**: I plan on adding an object for validation control and maybe a template generator very soon.

Als This is my first aangular/npm library so I'm sorry for any mistakes and I'll gladly accept constructive criticism.


This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.0-rc.7.

## Code scaffolding

Run `ng generate component component-name --project NgObject2Form` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project NgObject2Form`.
> Note: Don't forget to add `--project NgObject2Form` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build NgObject2Form` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build NgObject2Form`, go to the dist folder `cd dist/ng-object2-form` and run `npm publish`.

## Running unit tests

Run `ng test NgObject2Form` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
