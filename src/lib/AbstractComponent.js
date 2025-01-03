
export default class AbstractComponent {
    constructor(html){
        this.html = html;
        if (new.target === AbstractComponent) {
            throw new Error("Cannot instantiate an abstract class directly.");
        }
    }

    render(){
        return this.html;
    }

}

