import SortableTable1 from '../../05-dom-document-loading/2-sortable-table-v1/index.js';

export default class SortableTable extends SortableTable1 {
  constructor(headersConfig, {
    data = [],
    sorted = {}, 
  } = {}) {
    super(headersConfig, data);
    this.sorted = sorted;
    this.createEventListner();
  }

  createEventListner() {
    this.subElements.header.addEventListener('pointerdown', this.handelHeaderPointerDown);
  }

  handelHeaderPointerDown = (event) => {
    const elemColumnHeader = event.target.closest('[data-sortable="true"]');
    if (!elemColumnHeader) {
      return;
    }

    const fieldValue = elemColumnHeader.dataset.id;
    const orderValue = elemColumnHeader.dataset?.order === 'desc' ? 'asc' : 'desc';
    super.sort(fieldValue, orderValue);
  }

  removeEventListner() {
    this.subElements.header.removeEventListener('pointerdown', this.handelHeaderPointerDown);
  }

  destroy() {
    super.destroy();
    this.removeEventListner();
  }
}
