import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl ,FormGroup, ReactiveFormsModule ,Validators } from '@angular/forms';
import { Router } from 'express';
import { Subscription } from 'rxjs';
import { AuthService } from '../../app/core/services/auth.service';
@Component({
  selector: 'app-regiser',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './regiser.component.html',
  styleUrl: './regiser.component.css'
})
export class RegiserComponent {
  constructor(){}
  
}
