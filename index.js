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
                    $(this).html('<' + rule.wrapWith + '>'+$(this).html()+'</' + rule.wrapWith + '>');
                });
            });

            $html.find('[style]').removeAttr('style');
            $html.find('[class]').removeAttr('class');

            callback($html.html());
        }
    });
}

exports.parse = parse;