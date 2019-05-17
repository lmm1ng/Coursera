/*
*  ������� �� ����������������: ������� ��������� ���������
*  ���� ����� ������ ��� ������� �� March 11, 12:59 AM PDT
*  
*  == ����
*  
*  � ���� ������� ���������� �������� ����������, ������� �������� ������
*  � ���������� ���������� ��������.
*  
*  ��� ���������� ���������� ����� ����������� ��� �������:
*  
*  query � �������, ����������� ������ � ��������� ����������;
*  select� �������� ������ ����������� ����� ��������;
*  filterIn� �������� ���������� �������� ���������.
*  
*  == �������
*  
*  1. ����� ���������� ������� 'query' �� ������ ���������� �������� ���������.
*  2. ���� � ������� 'query' �������� ������ ���������, �� ������� � �����.
*  3. �������� 'select' ������ ������������ �������������� � ������� ����.
*  4. ��������� �������� 'select' ������ ���������� ��� ���� � ������������� �����������.
*   ��������, ���� �� �������� ���� a � b, � ����� b � c, �� � ���������� ������ ��������� ������ ���� b.
*  5. ��������� �������� 'filterIn' ������ ���������� ��� ���� � ������������� �����������.
*    ��������, ���� ��������� ���� �� ��������� a � b, � ����� �� b � c, �� � ����������
*    ��������������� ������ ������ �� ������� b.
*  6. �������� ������ ����������� � ����������� �������. � ������ ������� ���������� ����������, � ����� ������� �����.
*    ����� �������, ����� ����������� ��������� ���� �� ��� �����, ������� �� ������� � ������� select.
*  7. ������� ��������� ����� ���������� �������� ������ �����������.
*  8. �������������, ��� ������� 'query' ����� ���������� ���������. �������������� �������� ���������� ������ �� �����.
*  9. ��������������, ��� ���� �������� ����� �������� ���� String ��� Number.
*  
*  === ������� 'query'
*  ��������� ������ � ���������.
*  ��������� ��������� � ��������.
*  ���������� ��������� ����� ���������� ���� ��������.
*  � �������� �������� ����� ���� ����������� 'filterIn', 'select'.
*  
*  lib.query(collection, operation1, operation2, ...);
*  
*  === �������� 'select'
*  ��������� ������� ����������� ���� �������� ���������.
*  ��������� ������ �����.
*  
*  lib.select('fieldName1', 'fieldName2', ...);
*  
*  === �������� 'filterIn'
*  ��������� ������������� ���������.
*  ��������� �������� ���� � ���������� ��������.
*  ����� ���������� ���������� ������ �������� �������, � ������� ���� ����� ���� �� ���������� ��������.
*  
*  lib.filterIn('fieldName', ['acceptedValue1', 'acceptedValue2', ...]);
*  
*  == ���������
*  
*  1. �� ������� select � filterIn ����� ���������� �������� �������� � �����������.
*   � ����� ��������������� �� ��� ��� ���������� ������� query.
*  
*  function select () {
*  // var fields = ...
*  return ['select', fields];
*  }
*  
*  2. �� ������� ����� ���������� �������, � ������� ����� ����� �������� ���������.
*   ��� ����������� ������� ����������� ���������� ������������ �������,
*   ����� ����� �� ������ ���������� ������� ����������.
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
        name: '���',
        gender: '�������',
        email: 'luisazamora@example.com',
        favoriteFruit: '���������'
    },
    {
        name: '�����',
        gender: '�������',
        email: 'example@example.com',
        favoriteFruit: '������'
    },
    {
        name: '���',
        gender: '�������',
        email: 'danamcgee@example.com',
        favoriteFruit: '������'
    },
    {
        name: '����',
        gender: '�������',
        email: 'newtonwilliams@example.com',
        favoriteFruit: '�����'
    },
    {
        name: '����2',
        gender: '�������',
        email: 'newtonwilliams@example.com',
        favoriteFruit: '�����'
    },
    {
        name: '�����',
        gender: '�������',
        email: 'danamcgee@example.com',
        favoriteFruit: '���������'
    },
    {
        name: '�����',
        gender: '�������',
        email: 'danamcgee@example.com',
        favoriteFruit: '��������'
    },
    {
        name: '������',
        gender: '�������',
        email: 'waltersguzman@example.com',
        favoriteFruit: '���������'
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
    var workCollection = copyCollection(collection); // ������������� ������� 1 (���������� _�����_ ���������)
    var filters_collection = []; // ��������� ��������
    var selects_collection = []; // ��������� ��������
    //  1. ����� ���������� ������� 'query' �� ������ ���������� �������� ���������.
    //  2. ���� � ������� 'query' �������� ������ ���������, �� ������� � �����.
    // workCollection = collection.clone(); // ��� ������ ����������� ������, � ���� ;)
    // workCollection = clone_collection(collection); // ���� �������� ������� clone_collection()
    // ������������ select-� � �������
    for (var i =1; i < arguments.length; i++) {
       if (arguments[i].name == "do_select") { selects_collection.push(arguments[i]); } // �������� select-�
       if (arguments[i].name == "do_filter") { filters_collection.push(arguments[i]); } // �������� �������
       // ��������� (�� filters � �� selects) - ������ ����������
    }
    // ������� ��������� ��� ������
    // *  5. ��������� �������� 'filterIn' ������ ���������� ��� ���� � ������������� �����������.
    // *    ��������, ���� ��������� ���� �� ��������� a � b, � ����� �� b � c, �� � ����������
    // *    ��������������� ������ ������ �� ������� b.
    // � ��� ������� ����������� ������������ �������, �� ���� ���������������� ���������� ����� ������ ������
    for (var i =0; i < filters_collection.length; i++) {
        workCollection = filters_collection[i](workCollection);
        debug_log("query() for filters_collection[" + i + "] ", workCollection);
    };
    // ����� ��������� ��� select-� - ��� ���� ��������, ������ ��� ���������, �� ��� �����
    //*  4. ��������� �������� 'select' ������ ���������� ��� ���� � ������������� �����������.
    //*   ��������, ���� �� �������� ���� a � b, � ����� b � c, �� � ���������� ������ ��������� ������ ���� b.
    // ������ ��� ������� �� �����������
    var selectedCollection = workCollection;
    for (var i =0; i < selects_collection.length; i++) {
            selectedCollection = selects_collection[i](selectedCollection);
        debug_log("query() for selects_collection[" + i + "] ", selectedCollection);
        //break; // �� ����� ����, ���� prop[] ����������, ��� ���� ��������� do_select() ���� ���
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
                    //*  3. �������� 'select' ������ ������������ �������������� � ������� ����.
                    // ������ ��������� ����, ���� ��� �� ���������� � �������� �������
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
 * @param {String} property � �������� ��� ����������
 * @param {Array} values � ������ ����������� ��������
 */
function filterIn(keywords, val) {
    return function do_filter(collection) {
        //return collection.filter(function (i) {
        //    return val.indexOf(i[keywords] > -1)
        //})
        // ������� ���� � �����������
        var new_col = [];
        for(var i=0; i< collection.length;i++)
        {
           var item = collection[i]; // ������, � ����� ������ ������������������ ��� ����������
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
    select('name', 'gender', 'notexists' ), // ��������, �� ����� ���������� ������
    select('name', 'email' ), // � ���������� ������ ������� ������ 'name'
    filterIn('favoriteFruit', ['������', '���������', '�����', '�������']), // filterIn ���������
    filterIn('favoriteFruit', ['�����', '�������']) // filterIn �������� ��� ���� 
    );

debug_log("final console.log(bestFriends) :");
console.log(bestFriends);
*/

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};