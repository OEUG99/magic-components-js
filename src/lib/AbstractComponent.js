
export default class AbstractComponent {
     constructor() {
        if (new.target === AbstractComponent) {
            throw new Error("Cannot instantiate an abstract class directly.");
        }

         this.render()
    }

     render() {
        throw new Error("Render method not implemented");
    }

}

