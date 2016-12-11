#react-pdf-viewer
---
Usage
-----

$ git clone https://github.com/VictorQD/react-pdf-viewer.git
$ cd react-pdf-viewer
$ npm install
$ npm start
go to http://localhost:4040/ in your browser

Should work like that
-----
<App>
  <PdfViewer
    ref={(pdfViewer) => { this.pdfViewer = pdfViewer; }}
    docLink='link to pdfDocument'
  />
</App>
