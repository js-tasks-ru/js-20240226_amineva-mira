export default class NotificationMessage {
    static lastInstance;
    constructor(prop, {duration = 0, type = ''} = {}){
        this.prop = prop;
        this.duration = duration;
        this.type = type;
        this.element = this.createElement(this.createTemplate())
    }

    createTemplate() {
        return (`
        <div class = "notification ${this.type}" style="--value:20s">
            <div class = "timer"></div>
            <div class = "inner-wrapper">
                <div class = "notification-header">${this.type}</div>
                <div class = "notification-body">${this.prop}</div>
            </div>
      </div>
      `)
    }

    createElement(template) {
        const element = document.createElement('div')
        element.innerHTML = template;
        return element.firstElementChild
    }

    show(container=document.body) {
        if (NotificationMessage.lastInstance) {
            NotificationMessage.lastInstance.destroy();
        }
        NotificationMessage.lastInstance = this;
        
        this.timerId = setTimeout(() => {
            this.destroy();
        }, this.duration);
        container.appendChild(this.element);
    }


    destroy() {
        clearTimeout(this.timerId);
        this.remove()
    }

    remove() {
        this.element.remove()
    }
}
