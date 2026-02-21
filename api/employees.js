import { getEmployee, getEmployees } from "#db/queries/employees";
import express from "express";
const router = express.Router();
export default router;

// TODO: this file!
router.get("/", async(req,res)=>{
  const employees = await getEmployees();
  res.send(employees);
})

/**
 * Sends 400 if request body is not provided
 * Sends 400 if request body is missing a required field
 * Sends the newly created employee with status 201
 */
// router.post("/", async(req,res)=>{
//   if(!req.body) res.status(400).send('Body is not provided');

//   const {name, birthday, salary} = req.body;
//   if (!name || !birthday || !salary) {
//     res.status(400).send('Body is missing a required field');
//   }


// });

/**
 * PUT /employees/:id updates employee with specified ID with provided data
 * Sends 400 if request body is not provided
 * Sends 400 if request body is missing a required field
 * Sends 400 if provided id is not a positive integer
 * Sends 404 if employee does not exist
 * Updates and sends the employee with status 200
 */

// router.param allows us to reuse the logic for parsing the ID parameter!
router.param("id", async(req, res, next, id)=>{
  // find the specified id
  const employee = await getEmployee(id);
  if (!employee) res.status(404).send('Employee does not exist.');
    
  // attach employee to req so middleware can access
  req.employee = employee;
  next();
});

router.get("/:id", (req,res)=>{
  res.send(req.employee);
});

// router.put("/:id", (req,res)=>{

// });