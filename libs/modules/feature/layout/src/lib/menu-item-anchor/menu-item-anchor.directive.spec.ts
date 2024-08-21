import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LayoutModule } from '../layout.module';

@Component({
  standalone: true,
  template: '<a ecommerceMentoria2MenuItemAnchor>Test directive</a>',
  imports: [LayoutModule],
})
class TestComponent {}

describe('MenuItemAnchorDirective', () => {
  it('should apply menu item anchor styles', async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestComponent);

    const anchorEl = fixture.nativeElement.querySelector(
      'a'
    ) as HTMLAnchorElement;

    expect(anchorEl.style.display).toBe('flex');
    expect(anchorEl.style.alignItems).toBe('center');
    expect(anchorEl.style.color).toBe('currentColor');
    expect(anchorEl.style.textDecoration).toBe('none');
  });
});
