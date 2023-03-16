// const http = require('http');
// const PORT = 2000;

// const server = http.createServer(async(req, res) => {
//     console.log(req)

//     if (req.url === '/api' && req.method === "GET") {
//         res.writeHead(200, {"Content-Type": "application/json"})

//         res.write("Hi there, this is vanilla Node.js API");

//         res.end();
//     } else {
//         res.writeHead(404, {"Content-Type": "application/json"});
//         res.end(JSON.stringify({
//             message: "Route not found"
//         }));
//     }
// })

// server.listen(PORT, () => {
//     console.log(`server running on port ${PORT}...`)
// })



const express = require("express");
const PORT = 2000;
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


const products = [
    {
        id: 1,
        name: "nasi goreng",
        price: 15000
    },
    {
        id: 2,
        name: "soto ayam",
        price: 20000
    }
]

app.get("/api", (req, res) => {
    res.json({
        status: 'ok',
        data: products
    })
})

app.post("/api", (req, res) => {
    // console.log(req.body)
    const productsID = products.map((product) => product.id)
    // let maxID = 0;
    // for (let key of productsID) {
    //     if (key > maxID) maxID = key;
    // }
    // let newID = maxID + 1
    const newID = Math.max(...productsID) + 1;
    
    products.push({id: newID, ...req.body})

    res.json({
        status: 'ok',
       message: "data succesfully created"
    })
})

app.put("/api", (req, res) => {
    const replacedProduct = req.body;
    const productsID = products.map((product) => product.id) 
    const index = productsID.indexOf(replacedProduct.id);

    if (index === -1) {
        const newID = Math.max(...productsID) + 1;
        products.push({id: newID, ...replacedProduct})

        res.json({
            status: 'ok',
            message: "data succesfully created"
        })
    } else {
        products[index] = replacedProduct;

        res.json({
            status: 'ok',
        message: "data succesfully replaced",
        })
    }

})

app.patch("/api", (req, res) => {
    const updatedProduct = req.body;
    const productsID = products.map((product) => product.id);
    const index = productsID.indexOf(updatedProduct.id);

    if (index === -1) {
        res.json({
            status: 'error',
           message: "Product's ID is not exist",
        })
    } else {
        for (let key in products[index]) {
            if (updatedProduct[key]) {
                products[index][key] = updatedProduct[key]
            }
        }

        res.json({
            status: 'ok',
           message: "data succesfully updated"
        })
    }    
})

app.delete("/api", (req, res) => {
    const deleteID = req.body;
    const productsID = products.map((product) => product.id);
    const index = productsID.indexOf(deleteID.id);

    if (index === -1) {
        res.json({
            status: 'error',
           message: "Product's ID is not exist",
        })
    } else {
        products.splice(index, 1)

        res.json({
            status: 'ok',
        message: "data succesfully deleted"
        })
    }
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`)
})