import AbstractComponent from "./AbstractComponent";

class TreeNode {
    // Nodes used for the vdom.
    constructor(tagName, props, textContent) {
        this.tagName = tagName;
        this.props = props;
        this.textContent = textContent;
        this.children = [];
    }

    // Add a child node
    addChildren(child) {
        this.children.push(child);
    }

    // set text
    setText(text) {
        this.textContent = text;
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
        const element = new TreeNode(tagName, props);
        let textAccumulator = ""; // Accumulator for strings

        for (const child of children.flat()) {
            if (typeof child === "string") {
                textAccumulator += child; // Accumulate text
            } else if (child instanceof TreeNode) {
                element.addChildren(child); // Directly add TreeNode instances
            } else if (Array.isArray(child)) {
                // Recursively handle arrays
                for (const nestedChild of child) {
                    const processedChild = await this.createElement(
                        nestedChild.tagName || "div",
                        nestedChild.props || {},
                        ...(nestedChild.children || [])
                    );
                    element.addChildren(processedChild);
                }
            } else if (child && typeof child === "object") {
                // Recursively handle raw object as virtual element definition
                const processedChild = await this.createElement(
                    child.tagName,
                    child.props || {},
                    ...(child.children || [])
                );
                element.addChildren(processedChild);
            } else {
                console.warn("Unexpected child type:", child);
            }
        }

        // Set accumulated text content
        if (textAccumulator) {
            element.setText(textAccumulator);
        }

        return element;
    }



    async render(node = this.tree, containerElement = this.dom) {
        // Handle `dumby` node as the root
        if (node.tagName === "dumby") {
            if (node.children.length === 0) {
                console.error("The root node (dumby) has no children.");
                return;
            }
            node = node.children[0]; // Assume single child for the `dumby` node
        }

        // Create the current DOM element
        let parentElement;
        try {
            parentElement = document.createElement(node.tagName);

            // Set properties (attributes)
            if (node.props) {
                for (const [key, value] of Object.entries(node.props)) {
                    parentElement.setAttribute(key, value);
                }
            }

            // Set text content
            if (node.textContent) {
                parentElement.textContent = node.textContent;
            }

            // Append the current element to the container
            containerElement.appendChild(parentElement);
        } catch (e) {
            console.error("Error creating element:", e);
            return;
        }

        // Recursively render children
        for (const child of node.children) {
            await this.render(child, parentElement);
        }

        // Only clear and append once for the root call
        if (containerElement === this.dom) {
            this.dom.innerHTML = ""; // Clear the existing DOM content
            this.dom.appendChild(parentElement);
        }
    }
}



// A globally accessable singlton for the virtual dom.
let MagicDom = new MagicDOM();
export default MagicDom;

