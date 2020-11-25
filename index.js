const randomStringGenerator = require('randomstring');
const csv = require('csv-parser')
const fs = require('fs')
const ObjectsToCsv = require('objects-to-csv')

const results = [];
 
fs.createReadStream('./origins-campaign.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    const existing = results.map(item => item.code);

   // console.log(results);

    while(results.length < 20000) {
        const code = randomStringGenerator.generate(7).toLocaleLowerCase();

        // console.log(code)

        if(results.find(item => item.code === code)){
            console.log('erro', code);
            continue;
        }

        results.push({url: 'https://origensambev.com.br', code: code, concatenated: 'https://origensambev.com.br/' + code})

    }


    const novo = results.map(item => {
        return {
            url: 'https://orig.com.br',
            code: item.code,
            concatenated: 'https://orig.com.br/' + item.code
        }
    })

    const converter = new ObjectsToCsv(novo)

    const codes = novo.map(item => item.code)

    const set = new Set(codes);

  
    console.log(set.size)

    converter.toDisk('new.csv', { });



  });




//console.log(randomStringGenerator.generate(7));