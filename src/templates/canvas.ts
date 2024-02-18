export const CANVAS_HTML_BODY = `
    <canvas width="800" height="800" id="canvas"></canvas>
    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        const vscode = acquireVsCodeApi();

        // vscode.postMessage({
        //     command: 'onClick',
        //     payload: 'onClick event'
        // })

        // Handle the message inside the webview
        window.addEventListener('message', event => {

            const message = event.data; // The JSON data our extension sent

            switch (message.command) {
                case 'setFillStyle':
                    ctx.fillStyle = message.payload;
                    break;
                case 'setLineWidth':
                    ctx.lineWidth = message.payload;
                    break;
                case 'strokeRect':
                    ctx.strokeRect(message.payload.x, message.payload.y, message.payload.width, message.payload.height);
                    break;
                case 'fillRect':
                    ctx.fillRect(message.payload.x, message.payload.y, message.payload.width, message.payload.height);
                    break;
                case 'beginPath':
                    ctx.beginPath();
                    break;
                case 'moveTo':
                    ctx.moveTo(message.payload.x, message.payload.y);
                    break;
                case 'lineTo':
                    ctx.lineTo(message.payload.x, message.payload.y);
                    break;
                case 'closePath':
                    ctx.closePath();
                    break;
                case 'stroke':
                    ctx.stroke();
                    break;
            }
        });
    </script>
`;
