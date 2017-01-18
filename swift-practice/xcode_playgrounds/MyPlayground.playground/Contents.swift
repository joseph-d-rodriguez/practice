//: Playground - noun: a place where people can play

import Cocoa
let r = CGRect()

var str = "Hello, playground"

var x = 0

for i in 1...10 {
    x = i*i
}

let cardsInDeck = 52
var players = 5
// cardsInDeck = 11
players = 4

class Person {
    let firstName: String
    let lastName: String
    
    init(firstName: String, lastName: String) {
        self.firstName = firstName
        self.lastName = lastName
    }
}

let me = Person(firstName: "john", lastName: "doe")

var mutable = [1,2,3]
mutable.append(4)

let immutable = [1,2,3]
//immutable.append(4)


