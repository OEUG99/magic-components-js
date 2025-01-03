import AbstractComponent from "./AbstractComponent";

export default class ComponentHandler {
    constructor() {



        // We'll load in our dynamic content on load.
        document.addEventListener("DOMContentLoaded", async () => {
            console.log("Loading Components...");

            await this.init()
            await this.refresh()
        })

    }

    async init() {
        // creating a virtual dom that we will model
        // we will need to model everything as a tree.
    }


     async refresh() {
        // Refreshing the dynamic components.
        const renderElement = document.getElementById("app")

        // example component
        const testComponent = new AbstractComponent("<div>test</div>").render();

        renderElement.innerHTML += testComponent;
    }


}