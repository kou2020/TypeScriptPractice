console.log("hello TS");

let obj: { a: number; [propName: string]: any };
obj = { a: 123, b: "456" };

let sum: (a: number, b: number) => number;
sum = function (a, b) {
  return a + b;
};

enum Gender {
  Male = 1,
  Female = 2,
}
let i: { name: string; gender: Gender };
i = {
  name: "小王",
  gender: Gender.Male,
};

console.log(i.gender == Gender.Male);

let d: any = 4;
d = "hello";
d = true;

let e: unknown = 4;
let s: string;
//d的类型是any，它可以赋值给任意变量
s = d;
//e的类型是unknown实际上就是一个类型安全的any
//unknown类型的变量，不能直接赋值给其它变量
//s=e

//如果想赋值可以使用以下的方法，进行类型宣言
//方法一:
if (typeof e === "string") {
  s = e;
}
//方法二:
s = e as string;
s = <string>e;

function fn(): never {
  throw new Error("报错了！！！");
}
