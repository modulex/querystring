var querystring = require('querystring');
describe('querystring', function () {
    it('querystring.stringify', function () {
        expect(querystring.stringify({foo: 1, bar: 2})).to.equal('foo=1&bar=2');
        expect(querystring.stringify({foo: 1, bar: [2, 3]}, '&', '=', false)).to.equal('foo=1&bar=2&bar=3');
        expect(querystring.stringify({'&#': '!#='})).to.equal('%26%23=!%23%3D');

        expect(querystring.stringify({foo: 1, bar: []})).to.equal('foo=1');
        expect(querystring.stringify({foo: {}, bar: 2})).to.equal('bar=2');
        expect(querystring.stringify({foo: function () {
        }, bar: 2})).to.equal('bar=2');

        expect(querystring.stringify({foo: undefined, bar: 2})).to.equal('foo&bar=2');
        expect(querystring.stringify({foo: null, bar: 2})).to.equal('foo=null&bar=2');
        expect(querystring.stringify({foo: true, bar: 2})).to.equal('foo=true&bar=2');
        expect(querystring.stringify({foo: false, bar: 2})).to.equal('foo=false&bar=2');
        expect(querystring.stringify({foo: '', bar: 2})).to.equal('foo=&bar=2');
        expect(querystring.stringify({foo: NaN, bar: 2})).to.equal('foo=NaN&bar=2');

        expect(querystring.stringify({b: [2, 3]})).to.equal('b%5B%5D=2&b%5B%5D=3');

        expect(querystring.stringify({b: undefined})).to.equal('b');

        expect(querystring.stringify({
            nodeType: 1
        })).to.equal('nodeType=1');
    });

    it('querystring.parse', function () {
        expect(querystring.parse('foo=1&bar=2').foo).to.equal('1');
        expect(querystring.parse('foo=1&bar=2').bar).to.equal('2');

        expect(querystring.parse('foo').foo).to.equal(undefined);
        expect(querystring.parse('foo=').foo).to.equal('');

        expect(querystring.parse('foo=1&bar=2&bar=3').bar[0]).to.equal('2');
        expect(querystring.parse('foo=1&bar=2&bar=3').bar[1]).to.equal('3');

        expect(querystring.parse('foo=null&bar=2').foo).to.equal('null');
        expect(querystring.parse('foo=&bar=2').foo).to.equal('');
        expect(querystring.parse('foo&bar=2').foo).to.equal(undefined);

        expect(querystring.parse('foo=1&bar=2&foo=3').foo[1]).to.equal('3');

        expect(querystring.parse('foo=1&bar[]=2&bar[]=3').bar[0]).to.equal('2');

        expect(querystring.parse('foo=1&bar=2=6').bar).to.equal('2=6');
    });
});