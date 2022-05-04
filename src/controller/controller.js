const collegeModel = require(../models/collegeModel);
const internModel = require(../models/internModel);

const createClg = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "data must be given" })

        if (!data.name) return res.status(400).send({ status: false, msg: "Name is Requried" })
        if (!data.fullName) return res.status(400).send({ status: false, msg: "Full Name is Requried" })
        if (!data.logoLink) return res.status(400).send({ status: false, msg: "Logolink is Requried" })

        let checkName = await collegeModel.findOne({ name: data.name })
        if (checkName) return res.status(400).send({ status: false, msg: "college name must be unique" })

        let college = await collegeModel.create(data);
        return res.status(201).send({ status: true, data: college })
    }
    catch (e) {
        res.status(500).send({ status: false, msg: e.message })
    }

    module.exports.createClg = createClg