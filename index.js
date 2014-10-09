var juice = require('juice');
var $ = require('cheerio');

function parse(html, rules, callback){
    juice.juiceContent(html, {url: 'http://avalanche.ca'}, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            // need to call toString here otherwise test does't work...?
            var $html = $(res.toString()).find('body');

            rules.forEach(function (rule) {
                var $els = $html.find('[style*="' + rule.styleContains + '"]');
                $els.each(function (i, el) {
                    $(this)
                        .removeAttr('style')
                        .removeAttr('class')
                        .html('<' + rule.wrapWith + '>'+$(this).html()+'</' + rule.wrapWith + '>');
                });
            });

            callback($html.html());
        }
    });
}

exports.parse = parse;