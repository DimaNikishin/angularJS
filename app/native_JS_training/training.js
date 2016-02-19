/**
 * Created by dimanikishin on 21.12.15.
 */
//первый пример замыкания
//function name(name){
//  return function(second){ console.log(second + name)}
//}
//
//var firstName = name("Dima");
//var secondNmae = firstName("My name is ");

//рекурсия (лушче .callee не использовать
//function recursion(number){
//  console.log(number)
//  number--
//  if (number<1){
//    console.log(number)
//  }
//  else{
//    return arguments.callee(number)
//  }
//}
//recursion(3);

//var array = new Array();
//array.push(1);
//array.push(2);
//var name =array.join('name');
//console.log(array.pop());
//console.log(array.unshift(3));
//console.log(array.shift());
//console.log(array.toString());
//console.log(name);

//var array = [1,2,3,4,5,6];
//console.log(array.indexOf(2));
//console.log(array.slice(2,4).toString());
//console.log(array.concat(array.slice(2,4)).toString());


//function name(arg1,arg2,arg3){
//  console.log(arg1 + arg2 + arg3)
//}
//name.apply(null,[0,1,2]);
//var real = name.bind(null,1);
//real(2,3);

//apply/bind and this

//function speack(){
//  console.log(this.name)
//}
//
//var rabbit = {name:'white'};
//var rebbitSpeack = speack.bind(rabbit);
//rebbitSpeack();
//speack.apply(rabbit);

//function main(name){
//  this.name = name;
//}
//main.prototype.sayName = function(){
//  console.log(this.name)
//}
//var Dima = new main('Dima');
//Dima.sayName();
//Object.defineProperty(main.prototype, 'sayTwo',{enumerable:false, configurable: false, writable: false, value: function(){console.log(2)}});
//Dima.sayTwo();
//console.log(Dima.hasOwnProperty('sayTwo'));
//console.log(Dima.hasOwnProperty('name'));
// for in loop находит свойсва из прототипа, не находит только свойсва с enumerable:false
//for(prop in Dima){
//  console.log(prop)
//}
//сеттер и геттер в обьект литерале
//var object = {
//  name: "Dima",
//  get Myname(){
//    return this.name + "АдинАдинАдин";
//  },
//  set Myname(name) {
//    console.log("cannot change the name")
//  }
//};
//console.log(object.Myname);
//object.Myname = "Not Dima";
//console.log(object.Myname);
//сеттер и геттер через дефайнп проперти
//function main(name){
//  this.name = name;
//}
//Object.defineProperty(main.prototype, 'myName',{get:function(){return this.name;},set:function(name){this.name = name;}});
//main.prototype.convertName = function(){this.name = this.name + "!!!"}
//
//var dima = new main();
//dima.myName = "DimaAgain";
//console.log(dima.myName);
//наследование и переопределние методов из прототипа родителя
//function inhereted(job, name){
//  main.call(this,name);
//  this.job = job;
//}
//inhereted.prototype = Object.create(main.prototype);
//inhereted.prototype.constructor = inhereted;
//inhereted.prototype.convertName = function(){
//  main.prototype.convertName.call(this)
//  this.name = this.name + "!!!"
//}
//
//var newOne = new inhereted('Js dev', 'Dima');
//console.log(newOne.myName);
//newOne.myName = "DimaAgaion";
//console.log(newOne.job);
//newOne.convertName();
//console.log(newOne.myName);
//локальный и публ пиременые и методы
//call apply - вызывают функцию с заданым контекстом, bind возвращает функцию в обертке заданого контекста
//function main(name){
//  var name = "Dima";
//  this.name = name;
//  var that = this;
//  function sayName(){console.log(this.name)};
//  this.Hello = sayName.bind(this);
//
//}
//
//var dima = new main("dima");
//dima.Hello();
//exception
//try{
//  function customError(){
//    this.message = 'custom test error'
//    this.name = 'custmoError'
//  }
//  customError.prototype = new Error();
//
//  throw new customError()
//}
//
//catch(e){
//  if(e instanceof customError){
//    console.log(e.message);
//    console.log(e.stack);
//  }
//}
//regexp
//var string = "dasdadada";
//var RegExp1 = new RegExp('da','g');
//console.log(RegExp1.test(string).toString())
//console.log(RegExp1.exec(string).toString())
//console.log(string.match(RegExp1).toString())
//string.replace(RegExp1,'1');
//console.log(string.replace(RegExp1,'1'))
//function декларейшен анд експрешен
//(function name(){console.log('11')})();
////declaration
//function name(){var someThing};
////expression
//var functionOne = function(){var someThing};
////анонимная самовыз функция
//(function(){console.log('11111')})();
//'use strict'; стрикт мод и аргументы функции
//function name (name, name2){
//  arguments[1] = "1111";
//  console.log(name2);
//  console.log(name);
//}
//var me = name("Di");
//'use strict';
//function name (name,name2){
//  name2 = "dddd";
//  console.log(arguments[1])
//  console.log(name2)
//}
//name("ddd111",'fdsf')
//var name = ['111',2313, {name:'Di'}, function(){console.log(12313)}];
//console.log(name.valueOf());
//for(var i = 0; i<10; i++){console.log(i)}
//var i = 0;
//do{
//  i++
//  console.log(i)
//}while(i<10)
//var n = 0;
//while(n<3){
//  n++
//  console.log(n)
//}
//
//function name(){console.log(111)}
//
//if(name instanceof Function){
//  console.log(1)
//}
//(function(){console.log(1111)})();
//(function(name){console.log('ddddd')})();

//var name = "string"
//console.log(typeof name.toString());
//var name2 = new String("")
//console.log(Boolean(name2))
//console.log(typeof name2)
//console.log(name2 instanceof String);
//var name3 = String("dddd");
//console.log(typeof name3)

//var obj = new Object();
//Object.defineProperty(obj,'name',{enumerable:false, configurable: false, set: function(name){this._name = name},get: function(){return this._name + 1111}})
//console.log(obj._name);
//console.log(obj.name = "dddd");
//console.log(obj.name)

//способы создания обьектов
//1. фактори:
//function name(name){
//  var obj = new Object();
//  obj.name = name;
//  return obj;
//}
//var obj1 = name("Dima");
//console.log(obj1.name);
//2. конструктор паттерн
//function constr(job){
//  this.job = job;
//}
//constr.call(obj1,'JS');
//console.log(obj1.job);
//3. прототайп патер
function name(name){
  this.name = name;
}
//name.prototype.sayName = function(){return this.name};
//var obj = new name("Dima");
//console.log(Object.getPrototypeOf(obj));
//console.log(name.prototype.isPrototypeOf(obj));
//console.log(obj.hasOwnProperty('sayName'))
//console.log("sayName" in obj);
//console.log(Object.keys(name.prototype))
//console.log(Object.getOwnPropertyNames(obj))

//function proto(name){
//  this.name = name;
//}
//proto.prototype.sayName = function(){return this.name};
//var obj1 = new proto("dima");
//console.log(obj1.sayName());
//proto.prototype = {
//  sayName: function(){console.log(this.name + 11111)}
//}
//console.log(obj1.sayName());
//var obj2 = new proto("Dima2");
//console.log(obj2.sayName());
//4. комбинированый конструктор и прототип
//function name(name){
//  this.name = name;
//}
//name.prototype.sayName = function(){console.log(this.name)};
//5. динамик прототайп паттер
//function name(name1){
//  this.name = name1;
//  if(typeof this.sayName != "function"){
//    name.prototype.sayName = function(){console.log(this.name)}
//  }
//}
//var obj = new name("Dima");
//obj.sayName();
//6. парастик конструктор паттерн
//function name(name){
//  var obj = new Object()
//  obj.name = name;
//  return obj;
//}
//var obj2 = new name("dima");
//console.log(obj2.name);
//7.durable contructor patter
//function name(name){
//  var o = new Object();
//  o.sayName = function(){
//    console.log(name);
//  }
//  return o;
//}
//var name = name("dima");
//name.sayName();
//способы наследования
//1 porototype chain
//function SuperType(name){
//  this.name = name;
//}
//SuperType.prototype.sayName = function(){
//  console.log(this.name)
//}
//
//function SubType(age){
//  this.age = age;
//}
//SubType.prototype = new SuperType("Dima");
//var obj = new SubType( 29);
//console.log(obj.name);
//2 constructor stealing
//function SuperType(name){
//  this.name = name;
//}
//SuperType.prototype.sayName = function(){
//  console.log(this.name)
//}
//
//function SubType(age,name){
//  SuperType.call(this,name);
//  this.age = age;
//}
//var obj = new SubType(29, 'Dima');
//console.log(obj.name);
//3 combination
//function SuperType(name){
//  this.name = name;
//}
//SuperType.prototype.sayName = function(){
//  console.log(this.name)
//}
//
//function SubType(age,name){
//  SuperType.call(this,name);
//  this.age = age;
//}
//SubType.prototype = new SuperType();
//var obj = new SubType(29, 'Dima');
//console.log(obj.name);
//obj.sayName()
//4 prototypal inhertance
//function SuperType(name){
//  this.name = name;
//}
//SuperType.prototype.sayName = function(){
//  console.log(this.name)
//}
//var obj = new SuperType("Dima");
//var obj2 = Object.create(obj);
//obj2.sayName();
//5 parasitic combination inheritance
//function SuperType(name){
//  this.name = name;
//}
//SuperType.prototype.sayName = function(){
//  console.log(this.name)
//}
//
//function SubType(age,name){
//  SuperType.call(this,name);
//  this.age = age;
//}
//SubType.prototype = Object.create(SuperType.prototype);
//SubType.prototype.constructor = SubType;
//var obj = new SubType(29, 'Dima');
//console.log(obj.name);
//obj.sayName()

//Object.create()
//Object.defineProperties()
//Object.defineProperty()
//Object.freeze()
//Object.getOwnPropertyDescriptor()
//Object.getOwnPropertyNames()
//Object.getPrototypeOf()
//Object.is()
//Object.isExtensible()
//Object.isFrozen()
//Object.isSealed()
//Object.keys()
//Object.observe()
//Object.preventExtensions()
//Object.prototype.hasOwnProperty()
//Object.prototype.isPrototypeOf()
//Object.prototype.propertyIsEnumerable()
//Object.prototype.toLocaleString()
//Object.prototype.toString()
//Object.prototype.valueOf()
//func expression

//var func = function test(n){
//  if(n>4){
//    n--
//    console.log(n);
//    return test(n);
//  }
//};
//test = undefined;
//func(6);
//
//console.log(typeof test);

//closure

//function objProp(propName){
//  return function(obj){
//    console.log(Object.getOwnPropertyDescriptor(obj,propName))
//  }
//}
//var testObj = {
//  name: "Hello"
//};
//var first = objProp('name');
//first(testObj);

//private var
//function name(name){
//  //var that = this;
//  var secondName = "Donny"
//  this.name = name;
//  function privateFunction(arg){
//    console.log(this.name + arg);
//  }
//  this.nameCall = function(){
//    privateFunction.call(this,secondName);
//  }
//}
//var obj = new name("Dima");
//obj.nameCall();

//static private var
//(function(){
//  var privateVar = 10;
//  function privateFunc(){
//    console.log(privateVar);
//  }
//  newConstructor = function(value){
//    if (value){privateVar = value};
//  }
//  newConstructor.prototype.setValue = function(value){
//    privateVar = value;
//  }
//  newConstructor.prototype.getPrivateValue = function(){
//    privateFunc();
//  }
//})();
//
//var obj = new newConstructor();
//obj.getPrivateValue();
