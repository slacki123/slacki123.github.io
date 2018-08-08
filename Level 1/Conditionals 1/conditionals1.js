function Person(name, age, occupation){
    this.name = name;
    this.age = age;
    this.occupation = occupation;
}

var person = new Person("John", 21, "Programmer");

function test(){
    if(person.age>=20 && person.age<=40){
        return true;
    }
    else {
        return false;
    }
}

