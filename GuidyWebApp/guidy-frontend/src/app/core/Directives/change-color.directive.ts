import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeColor]',
  standalone: true
})
export class ChangeColorDirective {

  constructor(private _el:ElementRef) { }


  @HostListener('mouseenter',['$event'])  MOUSEeNTER(e:PointerEvent){
    console.log("hereeeeeeeeeeeeeeee");
    console.log(e);

    this._el.nativeElement.classList.add('bg-danger')
  }


  @HostListener('mouseleave',['$event'])  mouseLeave(e:PointerEvent){
    this._el.nativeElement.classList.add('bg-sucess')
  }


}
