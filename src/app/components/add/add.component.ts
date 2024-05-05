import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/pages/items/items.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  itemForm: FormGroup;
  isEdit = false;
  editID!: number;
  categories = ['Electronics', 'Clothing', 'Books', 'Other'];

  constructor(private itemService: ItemsService, private formBuilder: FormBuilder, private route: ActivatedRoute) {

    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.editID = params['id']
        let item = this.itemService.getById(this.editID);
        if (item)
          this.itemForm.patchValue(item);
      }
    })
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      if (this.isEdit) {
        this.itemService.editItem({id:this.editID,...this.itemForm.value});
        this.resetForm();
      }
      else {
        let newItem = this.itemForm.value;
        this.itemService.addItem(newItem);
        this.resetForm();
      }
    }
  }

  resetForm(): void {
    this.itemForm.reset();
    Object.keys(this.itemForm.controls).forEach((key) => {
      const control: AbstractControl = this.itemForm.controls[key];
      control.markAsPristine();
      control.markAsUntouched();
    });
  }
}
