const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

const createClg = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "data must be given" })

        if (!data.name) return res.status(400).send({ status: false, msg: "Name is Requried" })
        if (!data.fullName) return res.status(400).send({ status: false, msg: "Full Name is Required" })
        if (!data.logoLink) return res.status(400).send({ status: false, msg: "Logolink is Requried" })

        const isValidLink = function (value) {
            if (!(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(value.trim()))) {
                return false
            }
            return true
        }
        if (!isValidLink(data.logoLink)) return res.status(400).send({ status: false, msg: "Logo link is not valid" })

        if (data.isDeleted == true) return res.status(400).send({ status: false, msg: "You can not set deleted to true" })

        let name = (data.name).toLowerCase()
        // data.name = name
        let checkName = await collegeModel.findOne({ name: name })
        if (checkName) return res.status(400).send({ status: false, msg: "college name must be unique" })


        if (data.name.split(" ").length > 1) {
            return res.status(400).send({ status: false, msg: "please provide the Valid Abbreviation" });
        }


        let college = await collegeModel.create(data);
        return res.status(201).send({ status: true, data: college })
    }
    catch (e) {
        res.status(500).send({ status: false, msg: e.message })
    }
}


let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

const createIntern = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "data must be given" })

        if (!data.name) return res.status(400).send({ status: false, msg: "Name is Requried" })
        if (!data.email) return res.status(400).send({ status: false, msg: "Email is Requried" })
        if (!data.mobile) return res.status(400).send({ status: false, msg: "Mobile Number is Requried" })
          // if ((data.mobile).toString().length != 10) return res.status(400).send({ status: false, msg: "Mobile number should be of 10 digit" })
          let val = data.mobile
          if (/^\d{10}$/.test(val)) {
              // value is ok, use it
          } else {
              // Invalid number; must be ten digits
              // number.focus()
              return res.status(400).send({ status: false, msg: "Mobile number should be of 10 digit and should contain Numbers Only" })
          }
          let checkMobile = await internModel.findOne({ mobile: data.mobile })
          if (checkMobile) return res.status(400).send({ status: false, msg: "Mobile number must be unique" })
        if (!data.collegeName) return res.status(400).send({ status: false, msg: "College name is Requried" })


        let mailFormat = regex.test(data.email)
        if (mailFormat == false) return res.status(400).send({ status: false, msg: "email not valid" })

        let checkEmail = await internModel.findOne({ email: data.email })
        if (checkEmail) return res.status(400).send({ status: false, msg: "Email must be unique" })

      

      

        if (data.isDeleted == true) return res.status(400).send({ status: false, msg: "You can not set deleted to true" })

        let collegeid = await collegeModel.findOne({ name: data.collegeName }).select({ _id: 1 })
        if (!collegeid) return res.status(400).send({ status: false, msg: "Enter a valid college name" })
        data.collegeId = collegeid._id
        delete data.collegeName

        let intern = await internModel.create(data);
        return res.status(201).send({ status: true, data: intern })
    }
    catch (e) {
        res.status(500).send({ status: false, msg: e.message })
    }
}

const getClg = async function (req, res) {
    try {
        let data = req.query

        let key = Object.keys(data)
        if (key.length == 0) return res.status(400).send({ status: false, msg: "Query should not be empty" })
        if (key.length > 1) return res.status(400).send({ status: false, msg: "You have to give only one query" })

        if (key[0] != "collegeName") return res.status(400).send({ status: false, msg: "Only collegeName Should be required in query" })

        let clg = await collegeModel.findOne({ name: data.collegeName })
        if (!clg) return res.status(400).send({ status: false, msg: "College name is not correct" })
        let interns = await internModel.find({ collegeId: clg._id }).select({ _id: 1, email: 1, name: 1, mobile: 1 })
        if (interns.length == 0) return res.status(400).send({ status: false, msg: "No interns available of this college" })

        let output = {
            "name": clg.name,
            "fullName": clg.fullName,
            "logoLink": clg.logoLink,
            "interests": interns
        }
        return res.status(200).send({ status: true, data: output })

    } catch (e) {
        res.status(500).send({ status: false, msg: e.message })
    }
}

module.exports.createClg = createClg
module.exports.createIntern = createIntern
module.exports.getClg = getClg
