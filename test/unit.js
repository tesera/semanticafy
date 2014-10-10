var sematicafy = require('../index.js');
var should = require('should');

describe('sematicafy', function () {
    it('should remove <style>, style attr and class attr and wrap styled elements based on rules', function (done) {
        var html = '<style type="text/css"> .bold { font-weight:bold; } .italic { font-style:Italic; } </style><span class="bold">bolded text</span><span class="italic">italic text</span>';
        var rules = [
            {
                styleContains: 'bold',
                wrapWith: 'strong'
            },
            {
                styleContains: 'Italic',
                wrapWith: 'i'
            }
        ];
        sematicafy.parse(html, rules, function (err, semHtml) {
            semHtml.should.containEql('<span><strong>bolded text</strong></span><span><i>italic text</i></span>');
            done();
        });
    });

    it('should remove <style>, style attr and class attr even if no refs', function (done) {
        var html = '<style type="text/css"> .bold { font-size:13px; } </style><span class="bold">bolded text</span><span class="bold">italic text</span>';
        var rules = [
            {
                styleContains: 'bold',
                wrapWith: 'strong'
            },
            {
                styleContains: 'Italic',
                wrapWith: 'i'
            }
        ];
        sematicafy.parse(html, rules, function (err, semHtml) {
            semHtml.should.not.containEql('style');
            semHtml.should.not.containEql('class');
            done();
        });
    });
});