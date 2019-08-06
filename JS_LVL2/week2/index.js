module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {
    this.value = [];
}


// Методы коллекции
Collection.prototype.values = function () {
    return this.value;
};
Collection.prototype.at = function (id) {
  if (this.value[parseInt(id) - 1] == undefined) {
      return null
  }
    return this.value[parseInt(id) - 1];
}
Collection.prototype.append = function (in_arr) {
    if (Array.isArray(in_arr)) {
        this.value = this.value.concat(in_arr);
    } 
    else if (typeof in_arr === 'object'){

        this.value = this.value.concat(in_arr.value);
    }
    else {
        this.value.push(in_arr);
    }
}
Collection.prototype.count = function () {
    return this.value.length;
} 
Collection.prototype.removeAt = function(id) {
    if (this.value[id - 1] == undefined) {
        return false;
    }
    else {
        this.value.splice(id - 1, 1);
        return true;
    }
}
// другие методы

/**
 * Создание коллекции из массива значений
 */
Collection.from = function () {
    new_col = Object.create(Collection.prototype);
    new_col.value = arguments[0];
    return new_col;
};