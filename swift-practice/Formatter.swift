#!/usr/bin/env xcrun swift

import Foundation
let df = NSDateFormatter()
df.dateStyle = .MediumStyle
df.timeStyle = .LongStyle
println(df.stringFromDate(NSDate()))

