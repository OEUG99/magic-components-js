import AbstractComponent from "./AbstractComponent";

class TreeNode {
    // Nodes used for the vdom.
    constructor(tagName, props) {
        this.tagName = tagName;
        this.props = props;
        this.children = [];
    }

    // Add a child node
    addChildren(child) {
        this.children.push(child);
    }
}

export default class MagicDOM {
    /**
     * A class similar to the standard library `document` class, except extended to support components.
     * Or in other words, a virtualDOM/MagicDOM.
     * This class will also be used when converting the VDOM to the real dom. 
     */
    constructor() {

        // We'll load in our dynamic content on load.
        document.addEventListener("DOMContentLoaded", async () => {
            console.log("Loading Components...");
        })

        self.tree = new TreeNode("dumby"); // creating a dumby node to start the tree.
    }


    async addElement(elementTag, props = {}, ...children) {
        // creates a node that can be used in the vdom
        // mirrors standard `document.addElement` except element tags are not forced to be capitalized.
        // This allows for us to determine what is a component or not via components having capitalized
        // names.
        return new TreeNode(elementTag, props, children);
    }


}
