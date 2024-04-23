import fetchJson from './utils/fetch-json.js';
import ColumnChart1 from '../../04-oop-basic-intro-to-dom/1-column-chart/index.js'

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart extends ColumnChart1 {
    constructor(options = {}) {
        super(options)
        this.from = options.range?.from
        this.to = options.range?.to
        this.update()
    }

    async update() {
        try {
          const data = await this.fetchData(this.from, this.to);
          super.update(Object.values(data));
          return data;
        } catch (error) {
          console.error(error);
        }
      }

     async fetchData() {
        const newData = new URL(this.url, BACKEND_URL);

        newData.searchParams.set('from', this.from);
        newData.searchParams.set('to', this.to)

        return await fetchJson(newData)
    }

    destroy() {
        super.destroy();
    }
}
