

function Person(name, age, occupation){
    this.name = name;
    this.age = age;
    this.occupation = occupation;
}

var person = new Person("John", 21, "Programmer");

function increaseAge(){
    document.getElementById("age").innerHTML = ++person.age;
}

function resetAge() {
    person.age = 21;
    document.getElementById("age").innerHTML = 21;
}


