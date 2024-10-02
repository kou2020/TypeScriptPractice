"use strict";
//#region
//1.装饰器入门
// function CustomToString(target: Function) {
//   target.prototype.toString = function () {
//     return JSON.stringify(this);
//   };
//   Object.seal(target.prototype);
// }
// @CustomToString
// class Person {
//   constructor(public name: string, public age: number) {}
//   speak() {
//     console.log("你好呀！");
//   }
// }
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// const person = new Person("Tom", 18);
// console.log(person.toString());
// interface Person {
//   x: number;
// }
// Person.prototype.x = 66;
// console.log(person.x);
//#endregion
//#region
//2. 替换被装饰的类
// interface User {
//   getCreatedTime(): Date;
// }
// type Constructor = new (...args: any[]) => {};
// function LogTime<T extends Constructor>(target: T) {
//   return class extends target {
//     createdTime: Date;
//     constructor(...args: any[]) {
//       super(...args);
//       this.createdTime = new Date();
//     }
//     getCreatedTime() {
//       return `该对象创建时间为：${this.createdTime}`;
//     }
//   };
// }
// @LogTime
// class User {
//   constructor(public name: string, public age: number) {}
//   speak() {
//     console.log(`${this.name}说：你好啊！`);
//   }
// }
// const user1 = new User("张三", 13);
// console.log(user1.getCreatedTime());
//#endregion
//#region
//3.装饰器⼯⼚
// interface Person {
//   introduce(): void;
// }
// function LogInfo(n: number) {
//   return function (target: Function) {
//     target.prototype.introduce = function () {
//       for (let index = 0; index < n; index++) {
//         console.log(`我的名字：${this.name}，我的年龄：${this.age}`);
//       }
//     };
//   };
// }
// @LogInfo(5)
// class Person {
//   constructor(public name: string, public age: number) {}
//   speak() {
//     console.log("你好呀！");
//   }
// }
// const person = new Person("Tom", 18);
// person.introduce();
//#endregion
//#region
//4.属性装饰器
// function State(target: object, propertyKey: string) {
//   let key = `__${propertyKey}`;
//   Object.defineProperty(target, propertyKey, {
//     get() {
//       return this[key];
//     },
//     set(newValue) {
//       console.log(`${propertyKey}的最新值为：${newValue}`);
//       this[key] = newValue;
//     },
//     enumerable: true,
//     configurable: true,
//   });
// }
// class Person {
//   name: string;
//   //使⽤State装饰器
//   @State age: number;
//   school = "atguigu";
//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
// }
// const p1 = new Person("张三", 18);
// const p2 = new Person("李四", 30);
// console.log(p1);
// console.log(p2);
// p1.age = 40;
// p2.age = 50;
// console.log(p1.age);
// console.log(p2.age);
//#endregion
//#region
//5.方法装饰器
// function Logger(
//   target: object,
//   propertyKey: string,
//   descriptor: PropertyDescriptor
// ) {
//   // 保存原始⽅法
//   const original = descriptor.value;
//   //复写方法
//   descriptor.value = function (...args: any[]) {
//     console.log("方法被调用开始..........");
//     const result = original.call(this, ...args);
//     console.log("方法被调用结束..........");
//     return result;
//   };
// }
// class Person {
//   constructor(public name: string, public age: number) {}
//   @Logger speak(grade: string) {
//     console.log(
//       `你好，我的名字：${this.name}，我的年龄：${this.age}，我的年级：${grade}`
//     );
//   }
//   static isAdult(age: number) {
//     return age >= 18;
//   }
// }
// const p1 = new Person("张三", 18);
// p1.speak("3");
//#endregion
//#region
//6.参数装饰器
function NotNumber(target, propertyKey, parameterIndex) {
    // 初始化或获取当前⽅法的参数索引列表
    let notNumberArr = target[`__notNumber_${propertyKey}`] || [];
    // 将当前参数索引添加到列表中
    notNumberArr.push(parameterIndex);
    // 将列表存储回⽬标对象
    target[`__notNumber_${propertyKey}`] = notNumberArr;
}
// ⽅法装饰器定义
function Validate(target, propertyKey, descriptor) {
    const method = descriptor.value;
    descriptor.value = function (...args) {
        // 获取被标记为不能为空的参数索引列表
        const notNumberArr = target[`__notNumber_${propertyKey}`] || [];
        // 检查参数是否为 null 或 undefined
        for (const index of notNumberArr) {
            if (typeof args[index] === "number") {
                throw new Error(`⽅法 ${propertyKey} 中索引为 ${index} 的参数不能是数字！`);
            }
        }
        // 调⽤原始⽅法
        return method.apply(this, args);
    };
    return descriptor;
}
// 类定义
class Student {
    constructor(name) {
        this.name = name;
    }
    speak(message1, mesage2) {
        console.log(`${this.name}想对说：${message1}，${mesage2}`);
    }
}
__decorate([
    Validate,
    __param(0, NotNumber)
], Student.prototype, "speak", null);
// 使⽤
const s1 = new Student("张三");
s1.speak(100, 200);
//#endregion
