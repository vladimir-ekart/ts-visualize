export const getBaseHtmlTemplate = (body: string) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dependency Graph</title>
    </head>
    <body>
        ${body}
    </body>
    </html>
`;
