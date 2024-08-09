export function LogClassName() {
  return function (constructor: Function) {
    console.log(`${constructor.name} is running`);
  };
}
