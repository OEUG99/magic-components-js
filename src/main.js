import MagicDOM from "./lib/MagicDOM";
import magicDOM from "./lib/MagicDOM";
import Home from "./components/Home";


// Creating elements independently
// basic element test
// let tree = await magicDOM.createElement('h1', [], ['Hello, World!', "test"])

// emebeded test
let tree = await magicDOM.createElement('h1', {style: "color:red",},
    [
        'Hello, World!',
        'test',
        await magicDOM.createElement('h2', {style: "color:blue" },
            [
                'This is an h2 inside h1!']
        )
    ]
);


await magicDOM.render(tree)