export default class DoubleSlider {
    subElements={}
    constructor({min = 0, max = 200, formatValue = value => value, selected = {}} = {}) {
        this.formatValue = formatValue;
        this.min = min ?? 0;
        this.max = max ?? 200;
        this.from = selected.from || min;
        this.to = selected.to || max;
        this.element = this.createElement(this.createTemplate());
        this.selectSubElements();
        this.createEventListner();
      }
  
    createTemplate() {
        return (`
        <div class="range-slider">
            <span data-element="from">${this.formatValue(this.from)}</span>
            <div data-element="container" class="range-slider__inner">
                <span data-element="progress" class="range-slider__progress" style="left: ${this.getLeftPercent()}%; right: ${this.getRightPercent()}%"></span>
                <span data-element="thumbLeft" class="range-slider__thumb-left" style="left: ${this.getLeftPercent()}%"></span>
                <span data-element="thumbRight" class="range-slider__thumb-right" style="right: ${this.getRightPercent()}%"></span>
            </div>
            <span data-element="to">${this.formatValue(this.to)}</span>
        </div>`); 
      }
  
    createElement(template) {
        const element = document.createElement('div');
        element.innerHTML = template;
        return element.firstElementChild;
    }

    selectSubElements() {
        this.element.querySelectorAll('[data-element]').forEach(element => {
          this.subElements[element.dataset.element] = element;
        });
    }

    getLeftPercent() {
        const total = this.max - this.min;
        const value = this.from - this.min;
        return Math.round( (value / total) * 100)
    }

    getRightPercent() {
        const total = this.max - this.min;
        const value = this.max - this.to;
        return Math.round( (value / total) * 100)
    }

    createEventListner() {
        this.subElements.thumbLeft.addEventListener('pointerdown', this.handelThumbPointerDown);
        this.subElements.thumbRight.addEventListener('pointerdown', this.handelThumbPointerDown);
    }

    handelThumbPointerDown = (event) => {
        document.addEventListener('pointermove', this.handelDocumentPointerMove);
        document.addEventListener('pointerup', this.handelDocumentPointerUp);
    }

    processPoinerMove = (event) => {
        const {left, width} = this.subElements.container.getBoundingClientRect();
        const containerLeftX = left;
        const containerRightX = left + width;
        const pointerX = event.clientX;

        const normalizePointerX = Math.min(containerRightX, Math.max(containerLeftX, pointerX));

        const percentPonterX = Math.round((normalizePointerX - containerLeftX) / (containerRightX - containerLeftX) * 100); 
        
        const value = this.min + (this.max - this.min) * percentPonterX / 100;

        return value;
    }

    handelDocumentPointerMove = (event) => {
        if(event.target.dataset.element === 'thumbLeft') {
            this.from = Math.min(this.to, this.processPoinerMove(event));

            this.subElements.from.textContent = this.formatValue(this.from);
            this.subElements.thumbLeft.style.left = this.getLeftPercent() + '%';
            this.subElements.progress.style.left = this.getLeftPercent() + '%';
        }

        if(event.target.dataset.element === 'thumbRight') {
            this.to = Math.max(this.from, this.processPoinerMove(event));
            
            this.subElements.to.textContent = this.formatValue(this.to);
            this.subElements.thumbRight.style.right = this.getRightPercent() + '%';
            this.subElements.progress.style.right = this.getRightPercent() + '%';
        }

    }

    handelDocumentPointerUp = (event) => {
        this.dispatchCustomEvent();
        document.removeEventListener('pointermove', this.handelDocumentPointerMove);
        document.removeEventListener('pointerup', this.handelDocumentPointerUp);
    }

    dispatchCustomEvent() {
        this.element.dispatchEvent(new CustomEvent('range-select', { 
            detail: {
                from: this.from,
                to: this.to
            }, 
            bubbles: true 
          }));
    }

    removeEventListner() {
        this.subElements.thumbLeft.removeEventListener('pointerdown', this.handelThumbPointerDown);
        this.subElements.thumbRight.removeEventListener('pointerdown', this.handelThumbPointerDown);
    }

    remove() {
        this.element.remove();
    }
    
    destroy() {
        this.remove();
        this.removeEventListner();
    }
}
