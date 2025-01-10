import AbstractComponent from '../lib/AbstractComponent.js';
import MAGICDOM from "../lib/MagicDOM.js"
import magicDOM from "../lib/MagicDOM.js";

export default class Home extends AbstractComponent {

    constructor() {
        super();
    }

    async render() {

        await magicDOM.createElement('h1', null, ['Hello, World!']

        );
    }

}