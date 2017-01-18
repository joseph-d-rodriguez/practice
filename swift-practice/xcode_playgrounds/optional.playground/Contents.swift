//: Playground - noun: a place where people can play

import Cocoa

var str = "Hello, playground"

var name: String?
var job: String!
var city: String

println("name is \(name)")
println("name is \(job)")
// Cannot print before non optional initialized
//println("name is \(city)")

name = "joe"
job = "consultant"
city = "san jose"

println("name is \(name)")// optionals are different types
println("name is \(job)") // bang(!) forcefully unwraps optional
println("name is \(city)")

name?.getMirror().valueType
job?.getMirror().valueType

//println(NSStringFromClass(name!))



