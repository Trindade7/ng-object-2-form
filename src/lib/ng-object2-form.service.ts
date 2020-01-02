import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NgObject2FormService {
  formControls = [];

  constructor(
    private fb: FormBuilder
  ) { }

  genFormFromClass(schematic: any) {
    const newForm = new FormGroup({});

    Object.keys(schematic).map((elem) => {
      if (typeof(schematic[elem]) !== 'object' || schematic[elem] instanceof Date) {
        newForm.controls[elem] = new FormControl();
        newForm.controls[elem].setValue(schematic[elem]);
      } else if (Array.isArray(schematic[elem])) {
        const arrayItems = [];

        schematic[elem].forEach(element => {
          const newArrayItem = this.genFormArrayElement(element);
          arrayItems.push(newArrayItem);
        });
        newForm.controls[elem] = new FormArray(arrayItems);
      } else {
        newForm.controls[elem] = this.genFormFromClass(schematic[elem]);
      }
    });
    return newForm;
  }

  genFormArrayElement(elem): FormGroup {
    return this.genFormFromClass(elem);
  }

  getFormData(form: any, ) {
    const formData = {};

    Object.keys(form.controls).map((elem) => {
      if (form.controls[elem] instanceof FormControl) {
        formData[elem] = form.controls[elem].value;
      } else if (form.controls[elem] instanceof FormGroup) {
        formData[elem] = this.getFormData(form.controls[elem]);
      } else if (form.controls[elem] instanceof FormArray) {
        const arrayData = [];
        form.controls[elem].controls.forEach(element => {
          arrayData.push(this.getFormData(element));
        });
        formData[elem] = arrayData;
      } else {
      }
    });


    return formData;
  }

  loadDocument(fileInput) {
    const reader = new FileReader();
    let imageName: string;
    let ImageFile;
    let imageUrl;

    if (fileInput.target.files.length > 0) {
      const file = fileInput.target.files[0];

      imageName = fileInput.target.files[0].name;
      reader.onload = (e) => {
        imageUrl = reader.result;
        ImageFile = reader.readAsDataURL(file);
      };
    }

    return {
      imageName,
      imageUrl,
      imageFile: ImageFile
    };
  }
}

