import fetchJson from './utils/fetch-json.js';
import ColumnChart1 from '../../04-oop-basic-intro-to-dom/1-column-chart/index.js'

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart extends ColumnChart1 {
    // from;
    // to
    constructor(options = {}) {
        super(options)
        this.from = options.range?.from
        this.to = options.range?.to
        this.update()
    }

    async update() {
        // console.log('from and to in update', from, to)
        // console.log('thisfrom and thisto in update', this.from, this.to)
        console.log('1')
        try{
            console.log('try')
        const data = await this.fetchData(this.from, this.to)
        
        console.log('data', data)
        super.update(data)
        }
        catch(error){console.error(error);}
        
    }

     async fetchData() {
        console.log('2')
        // console.log('from and to in fetchData', from, to)
        // console.log('thisfrom and thisto in fetchData', this.from, this.to)
        const newData = new URL(this.url, BACKEND_URL);

        newData.searchParams.set('from', this.from);
        newData.searchParams.set('to', this.to)
        // console.log('newDate', newData)
        return await fetchJson(newData)
    }

    destroy() {
        super.destroy();
    }
}
