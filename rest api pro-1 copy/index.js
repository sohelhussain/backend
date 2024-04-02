const express = require('express');
const users = require('./MOCK_DATA.json');
const app = express();
const PORT = 8000;

//ROUTS

app.get("/", (req, res) => res.send("this is a homepage!"));

app.get('/users', (req, res) => {
    /*
    <ul> 
        <li>Sohel hussain</li>
    </ul>    
    */
   const hay = `
                <ul>
                ${users.map(user => `<li>${user.first_name}</li>`).join("")}
                </ul>
   `;
   res.send(hay);
});

// REST API POINTS

//GET

app.get('/api/users', (req, res) => res.json(users))


// we using this method to only call the app for the first time
app.route("/api/users/:id").get((req, res) => {
    const id =  Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
}).patch((req, res) => {
        // edit the info user with id
        res.json({ status: "panding"});
    }).delete((req, res) => {
            // Delete the user with id
            res.json({ status: "panding"});
        })

app.get("/api/users/:id", )

//POST

app.post("/api/users", (req, res) => {
    // create a user
    res.json({ status: "panding"});
})

//PATCH

// app.patch("/api/users/:id", (req, res) => {
//     // edit the info user with id
//     res.json({ status: "panding"});
// })

//DELETE
// app.post("/api/users/:id", (req, res) => {
//     // Delete a user with id
//     res.json({ status: "panding"});
// })


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));