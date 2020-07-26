// import Professor from '../models/professorModel.js';
var Professor = require('../models/professorModel')
var signToken = require('../authHelperFunctions').signToken;

const create = async (req, res) =>
{

    var professor = new Professor(req.body);
    professor.fullName = professor.firstName + " " + professor.lastName;

    console.log(professor);
    // try
    // {
    const token = await signToken(professor); //not sure if i need await
    // }
    // catch(err)
    // {
    //     res.json({success: false, code: err.code})
    // }
    console.log('get token')
    console.log(token);

    professor.save(function (err, result)
    {
        console.log('in save function')
        if(err)
        {
            console.log('error')
            // res.send(err);
            res.json({success: false, code: err.code});
        }
        else
        {
            console.log('save else')
            // res.send({'success': true, 'message': 'Student retrieved for save', result});
            res.json({success: true, message: "User created with token", token});
        }
    });
};

const checkLogin = (req, res) =>  //fake
{

    const blank = {};
    var query = Professor.find(blank);

    query.exec(function (err, all)
    {
        if(err)
        {
            res.status(404).send(err);
        }
        else
        {
            res.json(all);
        }
    });

};

const addStudentToProfessor = (req, res) =>
{

    var query = Professor.findOneAndUpdate(
        {"_id": req.params.id},
        {
            $push: {
                students: {
                    studentFirstName: req.firstName,
                    studentLastName: req.lastName
                }
            }
        });

    query.exec(function (err, result)
    {
        if(err)
        {
            res.status(404).send(err);
        }
        else
        {
            console.log(result)
        }
    });
};

// 

const getAllProfessors = async (req, res) =>
{
    try
    {
        const users = await Professor.find({});
        res.json(users);
    }
    catch(err)
    {
        res.status(400).send(err);
    }

};


const getOneProfessor = async (req, res) =>
{
    try
    {
        const users = await Professor.findbyId(req.params.id);
        res.json(users);
    }
    catch(err)
    {
        res.status(400).send(err);
    }

};


// update a professor user

const updateOneProfessor = async (req, res) =>
{
    try
    {
        const user = await Professor.findById(req.params.id);
        Object.assign(user, req.body);
        await user.save();

        res.json({success: true, message: "User updated", user});
    } catch(err)
    {
        res.json({success: false, code: err.code});
    }

}

// delete a professor
const deleteOneProfessor = async (req, res) =>
{
    try
    {
        const user = await Professor.findByIdAndRemove(req.params.id);
        res.json({success: true, message: "User deleted", user});
    } catch(err)
    {
        res.json({success: false, code: err.code});
    }

}

// Authenticate

const authenticateProfessor = async (req, res) =>
{
    console.log('reached authenticate professor function')
    const user = await Professor.findOne({username: req.body.username}); //changed from email to username

    if(!user || !user.validPassword(req.body.password))
    {
        return res.json({success: false, message: "Invalid Login"});
    }

    const token = await signToken(user);
    res.json({success: true, message: "Token attached", token});

}

module.exports.create = create;
module.exports.checkLogin = checkLogin;
module.exports.addStudentToProfessor = addStudentToProfessor;

module.exports.getOneProfessor = getOneProfessor;
module.exports.updateOneProfessor = updateOneProfessor;
module.exports.deleteOneProfessor = deleteOneProfessor;
module.exports.authenticateProfessor = authenticateProfessor;
