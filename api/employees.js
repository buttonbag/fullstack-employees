import { createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from "#db/queries/employees";
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
router.post("/", async(req,res)=>{
  if(!req.body) res.status(400).send('Body is not provided');

  const {name, birthday, salary} = req.body;
  if (!name || !birthday || !salary) {
    res.status(400).send('Body is missing a required field');
  }

  const newlyCreatedEmployee = await createEmployee({
    name, 
    birthday,
    salary,
  });
  res.status(201).send(newlyCreatedEmployee);
});

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
  // if(+id < 0) res.status(400).send('provided id is not a positive integer.');
  const employee = await getEmployee(id);
  if (!employee) res.status(404).send('Employee does not exist.');
    
  // attach employee to req so middleware can access
  req.employee = employee;
  next();
});

router.get("/:id", (req,res)=>{
  res.send(req.employee);
});

router.put("/:id", async(req,res)=>{
  if(!req.body) res.status(400).send('Body is not provided');

  const {name, birthday, salary} = req.body;
  if (!name || !birthday || !salary) {
    res.status(400).send('Body is missing a required field');
  }

  // update employee
  const updatedEmployee = await updateEmployee({
    id: req.employee.id,
    name, 
    birthday,
    salary,
  });
  res.send(updatedEmployee);
});


/**
 * DELETE /employees/:id
 * Sends 404 if employee does not exist
 * Deletes the specified employee and sends status 204
 */
router.delete("/:id", async(req,res)=>{
  if(!req.body) res.status(400).send('Body is not provided');

  await deleteEmployee(req.employee.id);
  res.sendStatus(204);
});