
// import thư viện
const express = require('express');

// khởi tạo biến server api
const app = express();

//get định dạng json từ FE
app.use(express.json());

//khởi tạo server với port
app.listen(8080, () => {
    console.log("Thành công");
})


//khởi tạo api
// tham số 1: chứa sub domain
// tham số 2: goi một function xử lý
//     nhận vào 2 tham số:
//     - tham số 1: Request => lấy dữ liệu từ frond end
//     - tham số 2: Response => trả dữ liệu về front end
app.get("/get-test/:name", (req, res) => {

    try {
        //get data from headers
        //let data = req.headers.Content-Type;

        //get query
        // let data = req.query.name;

        //get params
        let data = req.params;

        //get body
        // let data = req.body;

        //response
        res.status(200).send(2323);
    } catch {
        res.status(500).send("err");

    }

})

//
let lstData = [{
    id: 1,
    movieName: "Phim 1",
    desc: "phim abc"
}, {
    id: 2,
    movieName: "Phim 2",
    desc: "phim số 2"
}
]

//api lấy danh sách phim
//GET
app.get("/get-movie", (req, res) => {
    res.send(lstData);
})

//api lấy phim theo id
//GET id
app.get("/get-movie-id/:id", (req, res) => {

    let { id } = req.params;

    let movie = lstData.find(item => item.id == id);

    if (movie) {
        res.send(movie);
    } else {
        res.send("Không tìm thấy");
    }

})

//api thêm một phim
//POST
app.post("/create-movie", (req, res) => {
    let { id, movieName, desc } = req.body;

    let model = { id, movieName, desc };
    lstData.push(model);

    res.send(lstData);
})


//api xoa` một phim
//DELETE
app.delete("/remove-phim/:id", (req, res) => {
    let { id } = req.params;
    lstData = lstData.filter(item => item.id != id);
    res.send(lstData);
})
