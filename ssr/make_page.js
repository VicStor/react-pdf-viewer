export default (svg, app, state) => (
  `
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta name="google" content="notranslate" />
      <title>Professional tool to select and buy ANY FURNITURE</title>
      <meta name="description" content="" />
      <meta name="keywords" content="furniture interior design" />
      <meta name="author" content="ANY FURNITURE" />
      <link rel="icon" type="image/png" sizes="36x36" href="/img/favicon.png" />
      <link rel="stylesheet" type="text/css" href="/static/styles.css" />
    </head>
    <body>
      ${svg}
      <div class="w-max h-max ofh" id="app-container">
        ${app}
      </div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>
      <script src="/js/pdfjs/compatibility.js"></script>
      <script src="/js/pdfjs/pdf.js"></script>
      <script src="/static/vendor.js"></script>
      <script src="/static/app.js"></script>
    </body>
  </html>
  `
);
/* <script src="http://mozilla.github.io/pdf.js/build/pdf.js"></script> */
