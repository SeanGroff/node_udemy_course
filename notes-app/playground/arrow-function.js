const square = x => x * x;

const user = {
  name: 'Bob',
  // sayHi: () => {
  //   console.log(arguments);
  //   console.log(`Hi. I'm ${this.name}`);
  // },
  sayHiAlt() {
    console.log(arguments);
    console.log(`Hi. I'm ${this.name}`);
  }
};

user.sayHiAlt(1, 2, 3);
