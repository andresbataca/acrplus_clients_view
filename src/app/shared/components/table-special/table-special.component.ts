import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';

export const defaultOptions = {
  PAGE_SIZE: 5,
};

export interface PageData {
  start: number;
  end: number;
}

@Component({
  selector: 'table-special',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './table-special.component.html',
  styleUrl: './table-special.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSpecialComponent {
  tableData = input<any>();
  columnsArray = input<any>();
  @Input() pageSize = 5;

  page = 0;
  itemsTable: any[] = [];

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
    return this.tableData().length;
  }

  public get totalPages(): number {
    return Math.ceil(this.dataSize / this.pageSize);
  }

  private paginate(page: number, pageSize: number) {
    const startIndex = page * pageSize;
    let endIndex = startIndex + pageSize;
    endIndex = endIndex > this.dataSize ? this.dataSize : endIndex;

    this.updatePaginationData(startIndex, endIndex);

    this.itemsTable = [...this.tableData().slice(startIndex, endIndex)];
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
