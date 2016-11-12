var expect = require('expect.js');
var title = require('../../lib/utils/title');

describe('slug generation', function() {
	it('should be generating url-encoded output of title names',  function() {
		expect(decodeURIComponent(title.slug('Alpha beta')).replace('_',' ')).to.equal('Alpha beta');
	});
});

describe('title parsing', function() {
	it('should correctly parse a simple title', function() {
		expect(title.guessFromSlug('alphabeta')).to.equal('Alphabeta');
	});

		it('should correctly parse a title with spaces', function(done) {
		expect(title.guessFromSlug('Alpha_beta')).to.equal('Alpha beta');
		done();
	});

	it('should correctly parse a title with multiple dashes', function() {
		expect(title.guessFromSlug('Alpha__beta')).to.equal('Alpha beta');
	});

	it('should correctly parse a title ignoring anything before the first \'/\'', function() {
		expect(title.guessFromSlug('really/crazy/component/Alpha__beta')).to.equal('Alpha beta');
	});
});