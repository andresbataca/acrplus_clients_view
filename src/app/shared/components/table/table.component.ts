import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Input } from '@angular/core';
import { TableBodyDirective, TableHeaderDirective } from './table.directive';

export const defaultOptions = {
  PAGE_SIZE: 5,
};

export interface PageData {
  start: number;
  end: number;
}

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() columns: any[] = [];
  @Input() data: any[] = [];
  @Input() pageSize = defaultOptions.PAGE_SIZE;

  @ContentChild(TableHeaderDirective) public header!: TableHeaderDirective;
  @ContentChild(TableBodyDirective) public body!: TableBodyDirective;

  page = 0;
  items: any[] = [];

  pageData: PageData = {
    start: 0,
    end: 0,
  };

  ngOnInit(): void {
    this.initialPagination();
  }

  private initialPagination(): void {
    this.paginate(this.page, this.pageSize);
  }

  public get dataSize(): number {
    return this.data.length;
  }

  public get totalPages(): number {
    return Math.ceil(this.dataSize / this.pageSize);
  }

  private paginate(page: number, pageSize: number) {
    const startIndex = page * pageSize;
    let endIndex = startIndex + pageSize;
    endIndex = endIndex > this.dataSize ? this.dataSize : endIndex;

    this.updatePaginationData(startIndex, endIndex);

    this.items = [...this.data.slice(startIndex, endIndex)];
  }

  updatePaginationData(start: number, end: number) {
    this.pageData = { ...this.pageData, start, end };
  }

  previous() {
    if (this.page > 0) {
      this.page -= 1;
      this.paginate(this.page, this.pageSize);
    }
  }

  next() {
    if (this.page < this.totalPages && this.pageData.end < this.dataSize) {
      this.page += 1;
      this.paginate(this.page, this.pageSize);
    }
  }
}
