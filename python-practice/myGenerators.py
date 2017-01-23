'''Just some generators to test with

Effeciency through laziness can be seen when wanting to get the first N number of distinct items.
Using the two functions below (take_count & distinct) we'd conceptually accomplish this by first
running the distinct function on a given list to retrieve just the set of items, and then run
the take_count function on that distincted result list. The problem with that concept is that 
for large lists this process grows linearly to the size of the list. But with generators we can
simply process until we're satisfied.

Example:
	a = [1,2,2,3,3,3,4,4,4,4,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,7,7]
	# If we just want the first three distinct items...
	firstThreeUnique = list(take_count(3, distinct(a)))

	# The distinct generator will have only processed four of the items in the list by the time take_count is satisfied :)

Note: Not sure if this is the best example since this example involves the term 'first'... but currently order is not being accounted for.
'''

def take_count(count, iterable):
	'''Generator that iterates the first @count number of items'''
	theIter = iter(iterable)
	for n in range(count):
		yield theIter.__next__()

def distinct(iterable):
	'''Generator that returns the set of all the values'''
	s = set()
	for x in iterable:
		if (x in s):
			continue
		s.add(x)
		yield x


