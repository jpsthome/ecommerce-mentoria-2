import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: 'a[ecommerceMentoria2MenuItemAnchor]',
})
export class MenuItemAnchorDirective {
  constructor() {
    const elementRef = inject(ElementRef<HTMLAnchorElement>);
    elementRef.nativeElement.style.textDecoration = 'none';
    elementRef.nativeElement.style.display = 'flex';
    elementRef.nativeElement.style.alignItems = 'center';
    elementRef.nativeElement.style.color = 'currentColor';
  }
}
