import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-form',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {


}
