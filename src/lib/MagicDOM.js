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



class MagicDOM {
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

        this.tree = new TreeNode("dumby"); // creating a dumby node to start the tree.
        this.head_tree = this.tree;

        this.dom = document.getElementById('app');
    }


    async createElement(tagName, props = {}, ...children) {
        // creates a node that can be used in the vdom
        // mirrors standard `document.addElement` except element tags are not forced to be capitalized.
        // This allows for us to determine what is a component or not via components having capitalized
        // names.
        const element = new TreeNode(tagName, props);
        children.forEach(child => {
            if (typeof child === 'string') {
                // Handle text nodes
                element.addChildren(new TreeNode('#text', { textContent: child }));
            } else if (child instanceof TreeNode) {
                // Handle child nodes
                element.addChildren(child);
            }
        });
        return element;
    }

    async render(node = this.tree) {

        // todo I need to make sure this is proper and preserving parent-child relationships.

        // Processing all nodes, but skipping the dumby node.
        if (node.tagName !== "dumby") {
            //console.log(node.tagName); // Process the node
            let parentNode =  document.createElement(node.tagName, node.props);
            this.dom.appendChild(parentNode);
        }

        for (const child of node.children) {
            await this.render(child); // Recursively visit each child
        }

    }
}



// A globally accessable singlton for the virtual dom.
let MagicDom = new MagicDOM();
export default MagicDom;

