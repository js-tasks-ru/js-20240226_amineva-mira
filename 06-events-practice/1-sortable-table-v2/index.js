import SortableTable1 from '../../05-dom-document-loading/2-sortable-table-v1/index.js'

export default class SortableTable extends SortableTable1 {
  constructor(headersConfig, {
    data = [],
    sorted = {}, 
    // isSortLocally
  } = {}) {
    super(headersConfig, data);
    this.sorted = sorted;
    this.createEventListner()
  }

  // sort () {
  //   if (this.isSortLocally) {
  //     this.sortOnClient();
  //   } else {
  //     this.sortOnServer();
  //   }
  // }

  createEventListner() {
    this.subElements.header.addEventListener('pointerdown', this.handelHeaderPointerDown)
  }

  handelHeaderPointerDown = (event) => {
    const elemColumnHeader = event.target.closest('[data-sortable="true"]')
    if(!elemColumnHeader) return;

    let fieldValue = elemColumnHeader.dataset.id;
    let orderValue = elemColumnHeader.dataset?.order === 'asc' ? 'desc' : 'asc'
    super.sort(fieldValue, orderValue)

  }

  removeEventListner() {
    this.subElements.header.removeEventListener('pointerdown', this.handelHeaderPointerDown)
  }

  destroy() {
    super.destroy()
    this.removeEventListner()
  }
}
