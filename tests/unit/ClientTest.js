require('./bootstrap');
require('./models/Article');
require('./models/User');
require('./models/Link');

global.tests = Jii.namespace('tests');

/**
 * @class tests.unit.ClientTest
 * @extends Jii.base.UnitTest
 */
var self = Jii.defineClass('tests.unit.ClientTest', {

	__extends: Jii.base.UnitTest,

    relationTest: function (test) {
        var article = new tests.unit.models.Article();

        // Object set
        article.set({
            id: 592,
            title: 'My Article',
            text: '..text..',
            userId: 223,
            createTime: (new Date()).getTime(),
            user: {
                id: 223,
                name: 'John',
                email: 'john@example.com'
            },
            links: [
                {
                    id: 10,
                    articleId: 592,
                    url: 'http://example.com',
                    title: 'Example'
                },
                {
                    id: 11,
                    articleId: 592,
                    url: 'http://jiiframework.com',
                    title: 'Jii Framework'
                }
            ]
        });
        test.strictEqual(article.get('id'), 592);
        test.strictEqual(article.get('userId'), 223);
        test.strictEqual(article.get('user').get('id'), 223);
        test.strictEqual(article.get('user').get('name'), 'John');
        test.strictEqual(article.get('links').length, 2);
        test.strictEqual(article.get('links')[0].get('title'), 'Example');
        test.strictEqual(article.get('links')[1].get('id'), 11);

        // Sub-keys set
        article.set('user.name', 'Ivan');
        article.set('links[1].url', 'http://jiiframework.ru');
        test.strictEqual(article.get('user').get('name'), 'Ivan');
        test.strictEqual(article.get('links')[1].get('url'), 'http://jiiframework.ru');

        // Sub-keys get
        test.strictEqual(article.get('user.name'), 'Ivan');
        test.strictEqual(article.get('links[0]'), article.get('links')[0]);
        test.strictEqual(article.get('links[0].url'), 'http://example.com');
        test.strictEqual(article.get('links[1].url'), 'http://jiiframework.ru');
        test.strictEqual(article.get('links[-1].url'), 'http://jiiframework.ru');
        test.strictEqual(article.get('links[-2].url'), 'http://example.com');

        // Not exists = null
        test.strictEqual(article.get('notexists'), null);
        test.strictEqual(article.get('user.notexists'), null);
        test.strictEqual(article.get('user.notexists.notexists'), null);
        test.strictEqual(article.get('links[10]'), null);
        test.strictEqual(article.get('links[10].notexists'), null);

        // Throw on set property of null model
        test.throws(function() {
            article.set('links[10].url', 'http://none.net');
        }, Jii.exceptions.UnknownPropertyException);
        test.throws(function() {
            article.set('links[10].notexists', 'http://none.net');
        }, Jii.exceptions.UnknownPropertyException);
        test.throws(function() {
            article.set('links.notexists', 'http://none.net');
        }, Jii.exceptions.InvalidParamException);

        test.done();
    }

});

module.exports = new self().exports();
