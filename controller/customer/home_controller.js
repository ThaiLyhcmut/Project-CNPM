const User = require("../../model/User")
module.exports.login = async (res, req) => {
  const gmail = res.body.gmail
  const password = res.body.password
  if(gmail && password){
    const user = await User.find({
      gmail: gmail,
      password: password,
    })
    console.log(user)
    if(user){
      req.json({
        code: "success",
        uid: user.id,
        user: user
      })
    }
  }
}

module.exports.register = async (res, req) => {
  console.log(res.body)
  if(res.body.gmail && res.body.password){
    const newCustomer = new User({
      gmail: res.body.gmail,
      password: res.body.password,
      role: "customer",
      mssv: res.body.mssv?res.body.mssv:"",
      name: res.body.name?res.body.name:"",
    })
    await newCustomer.save()
    req.json({
      code: "success"
    })
  }
  req.json({
    code: "fail"
  })
}

