import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLogoProduct]',
  standalone: true,
})
export class LogoProductDirective implements OnInit {
  @Input() appLogoProduct = '';

  constructor(private element: ElementRef<HTMLDivElement>) {}

  ngOnInit(): void {
    this.element.nativeElement.style.backgroundColor = 'green';
    this.element.nativeElement.style.width = '35px';
    this.element.nativeElement.style.height = '35px';
    this.element.nativeElement.style.borderRadius = '50%';
    this.element.nativeElement.style.backgroundImage = `url(${this.appLogoProduct})`;
  }
}
