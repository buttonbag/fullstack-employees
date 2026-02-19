import {faker} from '@faker-js/faker';
import db from "#db/client";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // TODO
  for (let employeeCount = 0; employeeCount < 10; employeeCount++) {

    await createEmployee({
      name: faker.person.fullName(),
      birthday: faker.date.birthdate({mode: 'age', min: 18, max: 65}),
      salary: faker.number.int({max: 100000})
    })
    
  }
  console.log(`💪 EMPLOYEE CREATED`);
  
}
