export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement(this.createTemplate());
    this.subElements = {
      header: this.element.querySelector['[data-element="header"]'],
      body: this.element.querySelector['[data-element="body"]']
    }
    console.log(this.subElements)
  }

  createTemplate() {
    return (
      `<div class='sortable-table'>
        <div data-element="header" class='sortable-table__header sortable-table__row'>
        ${this.createHeaderTemplate()}
        </div>
        <div data-element="body" class="sortable-table__body">
        ${this.createBodyTemplate()}
        </div>
        <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
        <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
          <div>
            <p>No products satisfies your filter criteria</p>
            <button type="button" class="button-primary-outline">Reset all filters</button>
          </div>
        </div>
      </div>`)
  }

  createElement(template) {
    const element = document.createElement('div')
    element.innerHTML = template;
    return element.firstElementChild
  }

  createHeaderTemplate() {
    return (
      this.headerConfig.map(item => {
        if(item.id === 'title') {
          return (
          `<div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
            <span>${item.title}</span>
            <span data-element="arrow" class="sortable-table__sort-arrow">
              <span class="sort-arrow"></span>
            </span>
          </div>`)
        }
        return (
        `<div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
          <span>${item.title}</span>
        </div>`)
      }).join('')
    )
  }

  createBodyTemplate() {
    return (
      this.data.map(rowData => {
        return (`
        <a href="!#" class="sortable-table__row">
          ${this.headerConfig.map(config => this.createBodyColumn(config, rowData)).join('')}
        </a>
        `)})
    ).join('')
  }

  createBodyColumn(config, rowData) {
    if(config.template) {
      return config.template(rowData)
    }
    return (`
    <div class="sortable-table__cell">${rowData[config.id]}</div>
    `)
  }

  sort(fieldValue, orderValue) {
    let sortIndex = this.headerConfig.findIndex(item => item.id === fieldValue)
    if(this.headerConfig[sortIndex].sortType === 'string') {
      this.sortString(fieldValue, orderValue, this.headerConfig[sortIndex])
    }

    if(this.headerConfig[sortIndex].sortType === 'number') {
      this.sortNumber(fieldValue, orderValue, this.headerConfig[sortIndex])
    }
    this.update()
  }

  sortString(fieldValue, orderValue, sortElement) {
    this.data.sort((a, b) => {
      if(sortElement.sortable && orderValue === 'asc') {
       return a[fieldValue].localeCompare(b[fieldValue], ['ru', 'en'], {caseFirst: 'upper'})
      }
      if(sortElement.sortable && orderValue === 'desc') {
        return b[fieldValue].localeCompare(a[fieldValue], ['ru', 'en'])
      }
    })
  }

  sortNumber(fieldValue, orderValue, sortElement) {
    this.data.sort((a, b) => {
      if(sortElement.sortable && orderValue === 'asc') {
        return a[fieldValue] - b[fieldValue];
      }
      if(sortElement.sortable && orderValue === 'desc') {
        return b[fieldValue] - a[fieldValue];
      }
    })
  }


  update() {
    this.element.innerHTML = this.createTemplate()
  }


  remove() {
    this.element.remove()
  }

  destroy() {
    this.remove()
  }
}

