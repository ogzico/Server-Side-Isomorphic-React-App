import React from 'react';

const Html = ({ children, scripts, css, preloadedState }) => (
  <html>
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#000000" />
      <title>Rexpack</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <link href="https://use.fontawesome.com/releases/v5.14.0/css/svg-with-js.css" rel="stylesheet" />
      <style type="text/css">{[...css].join('')}</style>
    </head>
    <body>
      <div
        id="root"
        dangerouslySetInnerHTML={{ __html: children }}
      />

      {preloadedState && (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__=${JSON.stringify(preloadedState).replace(
              /</g,
              '\\u003c')}`
          }}
        />
      )}

      {scripts.map((item, index) => <script async key={index} src={item} />)}
    </body>
  </html>
);

export default Html;