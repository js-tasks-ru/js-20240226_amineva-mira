class Tooltip {
  static instance;

  constructor() {
      if (Tooltip.instance) {
          return Tooltip.instance;
      }      
      Tooltip.instance = this;
  }

  createElement(template = "") {
    const element = document.createElement('div');
    element.classList.add('tooltip');
    element.innerHTML = template;
    return element
  }

  render(template) {
    this.element = this.createElement(template);
    document.body.append(this.element);
  }

  initialize () {
    this.tooltipListners();
  }

  tooltipListners() {
    document.addEventListener('pointerover', (event) => this.handelDocumentPointerOver(event));
    document.addEventListener('pointerout', (event) => this.handelDocumentPointerOut(event));
  }

  handelDocumentPointerOver(event) {
    if(event.target.dataset.tooltip) {
      this.render(event.target.dataset.tooltip)
      this.element.style.top = event.pageY + 'px'
      this.element.style.left = event.pageX + 'px' 
    }
  }

  handelDocumentPointerOut(event) {
    this.destroy()
  }

  destroy() {
    this.remove()
  }

  remove() {
    this.element.remove();
    document.removeEventListener('pointerover', (event) => this.handelDocumentPointerOver(event));
    document.removeEventListener('pointerout', (event) => this.handelDocumentPointerOut(event));
  }
}

export default Tooltip;
