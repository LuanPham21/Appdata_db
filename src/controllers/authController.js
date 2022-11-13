const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

//mã hóa dữ liệu
const hashPass = (passWord) => {
  return bcrypt.hashSync(passWord, 10);
};

// hàm so sánh dữ liệu chưa mã hóa và dữ liệu đã mã hóa
// nếu đúng => true
// nếu sai => false
const comparePass = (passWord, hashPassWord) => {
  return bcrypt.compareSync(passWord, hashPassWord);
};

// tạo chuỗi jwt
const generateToken = (data) => {
  let token = sign(data, "key", { algorithm: "HS256", expiresIn: "3d" });

  return token;
};

const verifyToken = (token) => {
  try {
    return verify(token, "key");
  } catch (err) {
    return false;
  }
};

const checkToken = (req, res, next) => {
  let { authentication } = req.headers;

  if (authentication) {
    if (verifyToken(authentication)) {
      // res.send(jwt.decode(authentication))
      next();
    } else {
      res.status(403).send("Token không hợp lệ");
    }
  } else {
    res.status(403).send("Token không hợp lệ");
  }
};

module.exports = {
  hashPass,
  comparePass,
  generateToken,
  verifyToken,
  checkToken,
};
