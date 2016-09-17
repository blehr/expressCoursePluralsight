const http = require('http');
const xml2js = require('xml2js');
const parser = xml2js.Parser({explicitArray: false});

const goodReadsService = () => {
    
    const getBookById = (id, cb) => {
        
        const options = {
            host: 'www.goodreads.com',
            path: '/book/show/' + id + '.xml?key=5vbMhgtpQzqCrpq9TvLrQ'
        };
        
        const callback = response => {
            var str = '';
            
            response.on('data', chunck => {
                str += chunck;
            });
            
            response.on('end', () => {
                parser.parseString(str, (err, result) => {
                    if (err) {console.log('Error: ' + err);}
                    cb(null, result.GoodreadsResponse.book);  
                });
            });
        };
        
        http.request(options, callback).end();
    };
    
    
    return {
        getBookById: getBookById
    };
    
};

module.exports = goodReadsService;