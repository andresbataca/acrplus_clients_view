import { Directive, Input, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { SkeletonComponent } from '../components/skeleton/skeleton.component';

@Directive({
  selector: '[Ske]',
  standalone: true,
})
export class skeletonDirective {
  @Input('Ske') isLoading = false;
  @Input('SkeType') type!: string;
  @Input('SkeRepeat') size = 0;
  @Input('SkeWidth') width!: string;
  @Input('SkeHeight') height!: string;
  @Input('SkeWidthLabel') widthLabel!: string;
  @Input('SkeHeightLabel') heightLabel!: string;
  @Input('SkeWidthInput') widthInput!: string;
  @Input('SkeHeightInput') heightInput!: string;
  @Input('SkeClassName') className!: string;

  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef
  ) { }

    ngOnChanges(changes: SimpleChanges) {

      if (changes['isLoading']) {
        this.vcr.clear();
        if (this.isLoading) {
          this.renderSkeleton();
        } else {
          this.restoreOriginalContent();
        }
      }
    }

    private renderSkeleton() {

      switch (this.type) {
        case 'single':
          this.configureSingleSkeleton();
          break;
        case 'multiple':
          this.configureMultipleSkeleton();
          break;
        case 'label-input':
          this.configureLabelInputSkeleton();
          break;
        default:
          break;
      }
    }

    private configureSingleSkeleton() {
      const ref = this.vcr.createComponent(SkeletonComponent);

      ref.instance.type = this.type;
      ref.instance.width = this.width ?? '100%';
      ref.instance.height = this.height ?? '100%';
    }

    private configureMultipleSkeleton() {
      for (let i = 0; i < this.size; i++) {
        const ref = this.vcr.createComponent(SkeletonComponent);

        ref.instance.type = this.type;
        ref.instance.width = this.width === 'rand' ? `${Math.floor(Math.random() * (90 - 30 + 1)) + 30}%` : this.width;
        ref.instance.height = this.height;
        ref.instance.className = this.className;

      }
    }

    private configureLabelInputSkeleton() {
      const ref = this.vcr.createComponent(SkeletonComponent);

      ref.instance.type = this.type;
      ref.instance.widthLabel = this.widthLabel ?? '100%';
      ref.instance.heightLabel = this.heightLabel ?? '20px';
      ref.instance.widthInput = this.widthInput ?? '100%';
      ref.instance.heightInput = this.heightInput ?? '20px';
    }

    private restoreOriginalContent() {
      this.vcr.createEmbeddedView(this.tpl);
    }

}


// ngOnChanges(changes: SimpleChanges) {
//   if (changes['isLoading']) {
//     this.vcr.clear();

//     if (changes['isLoading'].currentValue) {

//       if (this.type === 'single') {
//         this.ref = this.vcr.createComponent(SkeletonComponent);

//         Object.assign(this.ref.instance, {
//           type: this.type,
//           widthRect1: this.widthRect1 ?? '100%',
//           heightRect1: this.heightRect1 ?? '100%px',
//           width: this.width ?? '100%',
//           height: this.height ?? '100%',
//         });

//       } else if (this.type === 'multiple') {

//         Array.from({ length: this.size }).forEach(() => {
//           this.ref = this.vcr.createComponent(SkeletonComponent);
//           Object.assign(this.ref.instance, {
//             width: this.width === 'rand' ? `${Math.floor(Math.random() * (90 - 30 + 1)) + 30}%` : this.width,
//             height: this.height,
//           })
//         })

//       } else if (this.type === 'label-input') {
//         this.ref = this.vcr.createComponent(SkeletonComponent);

//         Object.assign(this.ref.instance, {
//           type: this.type,
//           widthLabel: this.widthLabel ?? '100%',
//           heightLabel: this.heightLabel ?? '20px',
//           widthInput: this.widthInput ?? '100%',
//           heightInput: this.heightInput ?? '20px',
//         });

//       }


//     } else {
//       this.vcr.createEmbeddedView(this.tpl);
//     }
//   }
// }
