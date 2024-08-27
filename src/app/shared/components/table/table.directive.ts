import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[tableHeader]', standalone: true })
export class TableHeaderDirective {
  constructor(public readonly template: TemplateRef<any>) {}
}

@Directive({ selector: '[tableBody]' , standalone: true})
export class TableBodyDirective {
  constructor(public readonly template: TemplateRef<any>) {}
}
