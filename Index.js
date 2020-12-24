const Puppeteer = require('puppeteer');
const Express = require('express');
let app = Express();

app.get("/pdf", async(req, res) => {
    const url = req.query.target;

    const browser = await Puppeteer.launch({
        headless: true
    });
    
    const webPage = await browser.newPage();
    
    await webPage.setViewport({ width: 1200, height: 800 });


    await webPage.goto(url, {
        waitUntil: "networkidle0"
    });
    
    const pdf = await webPage.pdf({
            printBackground: true,
            path: "webPage.pdf",
            format: "A4",
            margin:{
                top: "20px",
                bottom: "40px",
                left: "20px",
                right: "20px"
            }
    })
    
    await browser.close();
    res.contentType("application/pdf");
    res.send(pdf);
})

app.listen(3000, function(){
    console.log('Server started at LocalHost 3000');
})
