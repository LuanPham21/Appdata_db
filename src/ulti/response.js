// 200
const successCode = (res, data) => {

    let dSend = {
        message: "Thành công",
        
        data: data
    }

    res.status(200).send(dSend);
}

//400
const errorCode = (res, data) => {

    let dSend = {
        message: "Thất bại",
        data: data
    }
    res.status(400).send(dSend);

}

//500
const failCode = (res) => {
    let dSend = {
        message: "Lỗi hệ thống !"
    }
    res.status(500).send(dSend);

}

module.exports = {
    successCode,
    errorCode,
    failCode
}