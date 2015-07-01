# uno-ext
A library for extracting text from office documents using the unoconv library

# Usage
unoconv.convert('test.docx', 'txt', function (err, result) {
    console.log(result);
});
