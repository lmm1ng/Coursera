/*
*  Задание по программированию: Выборка элементов коллекции
*  Срок сдачи Сдайте это задание до March 11, 12:59 AM PDT
*  
*  == Цель
*  
*  В этом задании необходимо написать библиотеку, которая упростит работу
*  с коллекцией однотипных объектов.
*  
*  Для управления коллекцией нужно реализовать три функции:
*  
*  query — функция, выполняющая запрос с заданными операциями;
*  select— операция выбора необходимых полей объектов;
*  filterIn— операция фильтрации объектов коллекции.
*  
*  == Условия
*  
*  1. После выполнения функции 'query' не должна измениться исходная коллекция.
*  2. Если в функцию 'query' передать только коллекцию, то вернётся её копия.
*  3. Операция 'select' должна игнорировать несуществующие в объекте поля.
*  4. Несколько операций 'select' должны отработать как одна с пересечёнными аргументами.
*   Например, если мы выбираем поля a и b, а затем b и c, то в результате должно выбраться только поле b.
*  5. Несколько операций 'filterIn' должны отработать как одна с пересечёнными аргументами.
*    Например, если фильтруем поле по значениям a и b, а затем по b и c, то в результате
*    отфильтроваться должно только по значени b.
*  6. Операции должны выполняться в определённом порядке. В первую очередь происходит фильтрация, а затем выборка полей.
*    Таким образом, можно фильтровать коллекцию даже по тем полям, которые не указаны в функции select.
*  7. Порядок элементов после выполнения операций должен сохраниться.
*  8. Гарантируется, что функция 'query' будет вызываться корректно. Дополнительную проверку аргументов делать не нужно.
*  9. Предполагается, что поля объектов имеют значения типа String или Number.
*  
*  === Функция 'query'
*  Выполняет запрос к коллекции.
*  Принимает коллекцию и операции.
*  Возвращает коллекцию после применения всех операций.
*  В качестве операций может быть использован 'filterIn', 'select'.
*  
*  lib.query(collection, operation1, operation2, ...);
*  
*  === Операция 'select'
*  Позволяет выбрать определённые поля объектов коллекции.
*  Принимает список полей.
*  
*  lib.select('fieldName1', 'fieldName2', ...);
*  
*  === Операция 'filterIn'
*  Позволяет отфильтровать коллекцию.
*  Принимает название поля и допустимые значения.
*  После выполнения фильтрации должны остаться объекты, у которых поле имеет одно из допустимых значений.
*  
*  lib.filterIn('fieldName', ['acceptedValue1', 'acceptedValue2', ...]);
*  
*  == Подсказка
*  
*  1. Из функций select и filterIn можно возвращать названия операций с параметрами.
*   И позже ориентироваться на них при выполнении функции query.
*  
*  function select () {
*  // var fields = ...
*  return ['select', fields];
*  }
*  
*  2. Из функции можно возвращать функции, в которые позже будет передана коллекция.
*   Для определения порядка понадобится возвращать именнованные функции,
*   чтобы позже по именам определить порядок выполнения.
*  
*  function select () {
*   // var fields = ...
*   return function select(collection) {
*   // ...
*   return collection;
*   }
*  } //select
*  
*/

var friends = [
    {
        name: 'Сэм',
        gender: 'Мужской',
        email: 'luisazamora@example.com',
        favoriteFruit: 'Картофель'
    },
    {
        name: 'Эмили',
        gender: 'Женский',
        email: 'example@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Мэт',
        gender: 'Мужской',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
        name: 'Брэд',
        gender: 'Мужской',
        email: 'newtonwilliams@example.com',
        favoriteFruit: 'Банан'
    },
    {
        name: 'Брэд2',
        gender: 'Мужской',
        email: 'newtonwilliams@example.com',
        favoriteFruit: 'Банан'
    },
    {
        name: 'Шерри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Картофель'
    },
    {
        name: 'Керри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Апельсин'
    },
    {
        name: 'Стелла',
        gender: 'Женский',
        email: 'waltersguzman@example.com',
        favoriteFruit: 'Картофель'
    }
];

/***
 * usage example: 
 * debug_log(some_text_or_object) - > console.log(some_text_or_object)
 * debug_log(some,text,or,object,...) - > console.log(some); console.log(text); ... console.log(object); ... 
 */
var debug_log_enabled=false;
function debug_log() {
 if(debug_log_enabled){
    for (var i =0; i < arguments.length; i++) {
      //console.log(arguments[i]);
    }
 }
} //debug_log()

function query(collection) {
    var workCollection = copyCollection(collection); // Удовлетворяем условию 1 (возвращаем _копию_ коллекции)
    var filters_collection = []; // множество селектов
    var selects_collection = []; // множество фильтров
    //  1. После выполнения функции 'query' не должна измениться исходная коллекция.
    //  2. Если в функцию 'query' передать только коллекцию, то вернётся её копия.
    // workCollection = collection.clone(); // нет такого встроенного метода, а жаль ;)
    // workCollection = clone_collection(collection); // надо написать функцию clone_collection()
    // раскладываем select-ы и фильтры
    for (var i =1; i < arguments.length; i++) {
       if (arguments[i].name == "do_select") { selects_collection.push(arguments[i]); } // собираем select-ы
       if (arguments[i].name == "do_filter") { filters_collection.push(arguments[i]); } // собираем фильтры
       // остальное (не filters и не selects) - просто игнорируем
    }
    // сначала исполняем все фильры
    // *  5. Несколько операций 'filterIn' должны отработать как одна с пересечёнными аргументами.
    // *    Например, если фильтруем поле по значениям a и b, а затем по b и c, то в результате
    // *    отфильтроваться должно только по значени b.
    // и это условие выполняется естественным образом, за счет последовательной фильтрации через каждый фильтр
    for (var i =0; i < filters_collection.length; i++) {
        workCollection = filters_collection[i](workCollection);
        debug_log("query() for filters_collection[" + i + "] ", workCollection);
    };
    // потом исполняем все select-ы - тут есть проблемы, сейчас все рабортает, но это криво
    //*  4. Несколько операций 'select' должны отработать как одна с пересечёнными аргументами.
    //*   Например, если мы выбираем поля a и b, а затем b и c, то в результате должно выбраться только поле b.
    // сейчас это условие не выполняется
    var selectedCollection = workCollection;
    for (var i =0; i < selects_collection.length; i++) {
            selectedCollection = selects_collection[i](selectedCollection);
        debug_log("query() for selects_collection[" + i + "] ", selectedCollection);
        //break; // на самом деле, если prop[] глобальный, нам надо исполнить do_select() один раз
    };
    return selectedCollection;
}

/**
 * @params {String[]}
 */


function select() {
    var prop = [];
    for (var i = 0; i < arguments.length; i++) {
        prop.push(arguments[i]);
    }
        return function do_select() {
        var inArr = arguments[0];
            var workCollection = [];
            for (var j = 0; j < inArr.length; j++) {
                var outArr = {};
                for (var k = 0; k < prop.length; k++) {
                    //*  3. Операция 'select' должна игнорировать несуществующие в объекте поля.
                    // нельзя добавлять поле, если оно не существует в исходном объекте
                    if (Object.keys(inArr[j]).indexOf(prop[k]) !== -1) {
                        outArr[prop[k]] = inArr[j][prop[k]];
                    }
                }
                workCollection.push(outArr);
            } // for( all fields in
            ;
            return workCollection;
        } // do_select()

}; // select()

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(keywords, val) {
    return function do_filter(collection) {
        //return collection.filter(function (i) {
        //    return val.indexOf(i[keywords] > -1)
        //})
        // сделаем тупо и императивно
        var new_col = [];
        for(var i=0; i< collection.length;i++)
        {
           var item = collection[i]; // кстати, с точки зрения производительности так правильнее
           for(var j=0; j < val.length; j++)
           {
            if(item[keywords] == val[j]) { new_col.push(item); break; }
           }
        }
     return(new_col);
    }
}//var bestFriends = query(friends, select('name','gender'));
//console.log(bestFriends);

function copyCollection(workCollection) {
    var resultCollection = [];
    for (var i = 0; i < workCollection.length; i++) {
        resultCollection[i] = workCollection[i];
    }
    return resultCollection;
}
//console.log(copyCollection(friends));


/* var bestFriends = query(
    friends,
    select('name', 'gender', 'notexists' ), // работает, но стоит переписать заново
    select('name', 'email' ), // в результате должно выбрать только 'name'
    filterIn('favoriteFruit', ['Яблоко', 'Картофель', 'Банан', 'Ежевика']), // filterIn фильтрует
    filterIn('favoriteFruit', ['Банан', 'Ежевика']) // filterIn работает как надо 
    );

debug_log("final console.log(bestFriends) :");
console.log(bestFriends);
*/

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};