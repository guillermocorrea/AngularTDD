describe('when using a to-do list', function () {
	beforeEach(function () {
		browser.get('/');
	});

	it('should see a list of to-do items', function () {
		var todoListElements = element.all(by.repeater('item in lis'));
		// Assert
		expect(todoListElements.count()).toBe(3);
	});
});