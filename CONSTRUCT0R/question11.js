function createEmployee(name, role, salary) {
  return {
    name,
    role,
    salary,
    introduce() {
      console.log(`Hello, I am ${this.name}, working as a ${this.role}.`);
    },
  };
}

const employee1 = createEmployee("Jalaluddin", "Developer", 6000);
employee1.introduce();
