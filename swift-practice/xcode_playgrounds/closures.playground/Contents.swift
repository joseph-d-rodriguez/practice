//: Playground - noun: a place where people can play

import Cocoa

var str = "Hello, playground"

println(str.endIndex)

let names = ["Al", "Ann", "Alex", "Alice", "Audrey", "Bo", "Ben", "Bill", "Brett", "Barney"]

let filteredNames = names.filter({(s: String) -> Bool in
    return s.lengthOfBytesUsingEncoding(NSUTF8StringEncoding) < 3
    })

println(filteredNames)


