semanticafy
===========

simple module to make html more semantic

pass in html with a set of rules and it will spit back semantic html based on your rules.

##Install
``npm install semanticafy``

## Usage:

````js
describe('sematicafy', function () {
    it('should remove <style>', function (done) {
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
        sematicafy.parse(html, rules, function (semHtml) {
            semHtml.should.containEql('<span><strong>bolded text</strong></span><span><i>italic text</i></span>');
            done();
        });
    });
});
````


