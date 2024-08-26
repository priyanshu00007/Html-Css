// Get the canvas elements
const signatureCanvas = document.getElementById('signature-canvas');
const loadingCanvas = document.getElementById('loading-canvas');

// Get the canvas contexts
const ctx = signatureCanvas.getContext('2d');
const loadingCtx = loadingCanvas.getContext('2d');

// Get the button elements
const uploadBtn = document.getElementById('upload-btn');
const createBtn = document.getElementById('create-btn');
const pasteBtn = document.getElementById('paste-btn');
const shareBtn = document.getElementById('share-btn');
const penTool = document.getElementById('pen-tool');
const markerTool = document.getElementById('marker-tool');
const eraserTool = document.getElementById('eraser-tool');
const clearTool = document.getElementById('clear-tool');

// Set the canvas dimensions
signatureCanvas.width = 600; /* Adjust the width */
signatureCanvas.height = 300; /* Adjust the height */

// Initialize variables
let currentTool = 'pen';
let loading = true;
let drawing = false;
let moving = false;
let lastX, lastY;
let cropping = false;
let cropRect = { x: 0, y: 0, w: 0, h: 0 };

// Function to draw the loading animation
function drawLoading() {
    loadingCtx.clearRect(0, 0, loadingCanvas.width, loadingCanvas.height);
    loadingCtx.fillStyle = '#f6f7f8';
    loadingCtx.fillRect(0, 0, loadingCanvas.width, loadingCanvas.height);
    loadingCtx.fillStyle = '#edeef1';
    loadingCtx.fillRect(loadingCanvas.width / 2 - 50, loadingCanvas.height / 2 - 25, 100, 50);
    loadingCtx.font = '24px Arial';
    loadingCtx.textAlign = 'center';
    loadingCtx.textBaseline = 'middle';
    loadingCtx.fillStyle = '#333';
    loadingCtx.fillText('Loading...', loadingCanvas.width / 2, loadingCanvas.height / 2);
}

// Upload button event listener
uploadBtn.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.click();

    fileInput.addEventListener('change', (e) => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();

            reader.addEventListener('load', (e) => {
                const imageDataURL = e.target.result;
                const img = new Image();
                img.src = imageDataURL;
                img.addEventListener('load', () => {
                    ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
                    ctx.drawImage(img, 0, 0);
                });
            });

            reader.readAsDataURL(file);
        }
    });
});

// Create button event listener
createBtn.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Write your text here...';
    textarea.style.position = 'absolute';
    textarea.style.top = '50%';
    textarea.style.left = '50%';
    textarea.style.transform = 'translate(-50%, -50%)';
    textarea.style.width = '50%';
    textarea.style.height = '100px';
    textarea.style.zIndex = '1';
    document.body.appendChild(textarea);

    const underlineBtn = document.createElement('button');
    underlineBtn.textContent = 'Underline';
    underlineBtn.style.position = 'absolute';
    underlineBtn.style.top = '60%';
    underlineBtn.style.left = '50%';
    underlineBtn.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(underlineBtn);

    const uploadBtn = document.createElement('button');
    uploadBtn.textContent = 'Upload Image';
    uploadBtn.style.position = 'absolute';
    uploadBtn.style.top = '80%';
    uploadBtn.style.left = '50%';
    uploadBtn.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(uploadBtn);

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    const textFileInput = document.createElement('input');
    textFileInput.type = 'file';
    textFileInput.accept = 'text/plain';
    textFileInput.style.display = 'none';
    document.body.appendChild(textFileInput);

    const uploadTextBtn = document.createElement('button');
    uploadTextBtn.textContent = 'Upload Text';
    uploadTextBtn.style.position = 'absolute';
    uploadTextBtn.style.top = '90%';
    uploadTextBtn.style.left = '50%';
    uploadTextBtn.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(uploadTextBtn);

    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });
    fileInput.addEventListener('change', (e) => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();

            reader.addEventListener('load', (e) => {
                const imageDataURL = e.target.result;
                const img = new Image();
                img.src = imageDataURL;
                img.addEventListener('load', () => {
                    ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
                    ctx.drawImage(img, 0, 0);
                });
            });

            reader.readAsDataURL(file);
        }
    });

    uploadTextBtn.addEventListener('click', () => {
        textFileInput.click();
    });

    textFileInput.addEventListener('change', (e) => {
        const file = textFileInput.files[0];
        if (file) {
            const reader = new FileReader();

            reader.addEventListener('load', (e) => {
                const text = e.target.result;
                textarea.value = text;
            });

            reader.readAsText(file);
        }
    });

    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const text = textarea.value;
            ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#333';
            ctx.fillText(text, signatureCanvas.width / 2, signatureCanvas.height / 2);
            document.body.removeChild(textarea);
            document.body.removeChild(underlineBtn);
            document.body.removeChild(uploadBtn);
            document.body.removeChild(fileInput);
            document.body.removeChild(textFileInput);
            document.body.removeChild(uploadTextBtn);
        }
    });

    underlineBtn.addEventListener('click', () => {
        const text = textarea.value;
        ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#333';
        ctx.fillText(text, signatureCanvas.width / 2, signatureCanvas.height / 2);
        ctx.beginPath();
        ctx.moveTo(signatureCanvas.width / 2 - ctx.measureText(text).width / 2, signatureCanvas.height / 2 + 10);
        ctx.lineTo(signatureCanvas.width / 2 + ctx.measureText(text).width / 2, signatureCanvas.height / 2 + 10);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
});

// Function to get data
function getData() {
    if (loading) {
        loading = false;
        // Your data loading code here
        setTimeout(() => {
            // Remove the loading animation
            loadingCtx.clearRect(0, 0, loadingCanvas.width, loadingCanvas.height);
            loadingCanvas.style.display = 'none';
        }, 5000);
    }
}

// Set interval to draw the loading animation
setInterval(drawLoading, 100);

// Set timeout to get data
setTimeout(getData, 100);

// Tool button event listeners
penTool.addEventListener('click', () => {
    currentTool = 'pen';
});

markerTool.addEventListener('click', () => {
    currentTool = 'marker';
});

eraserTool.addEventListener('click', () => {
    currentTool = 'eraser';
});

clearTool.addEventListener('click', () => {
    ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
    signatureCanvas.style.border = '2px solid black';
});

// Share button event listener
shareBtn.addEventListener('click', () => {
    // Share signature code here
});

// Signature canvas event listeners
signatureCanvas.addEventListener('dblclick', () => {
    drawing = true;
});

signatureCanvas.addEventListener('mousedown', (e) => {
    const rect = signatureCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (currentTool === 'pen' && drawing) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 1, y + 1);
        ctx.stroke();
    } else if (currentTool === 'marker' && drawing) {
        ctx.fillStyle = '#333';
        ctx.fillRect(x, y, 5, 5);
    } else if (currentTool === 'eraser' && drawing) {
        ctx.clearRect(x, y, 10, 10);
    } else if (e.button === 2) { // Right mouse button
        cropping = true;
        cropRect.x = x;
        cropRect.y = y;
    } else {
        moving = true;
        lastX = x;
        lastY = y;
    }
});
signatureCanvas.addEventListener('mousemove', (e) => {
    const rect = signatureCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if ((currentTool === 'pen' || currentTool === 'marker') && drawing) {
        ctx.lineTo(x, y);
        ctx.stroke();
    } else if (cropping) {
        cropRect.w = x - cropRect.x;
        cropRect.h = y - cropRect.y;
        ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
        ctx.drawImage(signatureCanvas, 0, 0);
        ctx.strokeRect(cropRect.x, cropRect.y, cropRect.w, cropRect.h);
    } else if (moving) {
        ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
        ctx.drawImage(signatureCanvas, x - lastX, y - lastY);
        lastX = x;
        lastY = y;
    }
});

signatureCanvas.addEventListener('mouseup', () => {
    drawing = false;
    moving = false;
    if (cropping) {
        cropping = false;
        const imageData = ctx.getImageData(cropRect.x, cropRect.y, cropRect.w, cropRect.h);
        ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
        ctx.putImageData(imageData, 0, 0);
    }
});

signatureCanvas.addEventListener('dragover', (e) => {
    e.preventDefault();
});

signatureCanvas.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (e) => {
        const imageDataURL = e.target.result;
        const img = new Image();
        img.src = imageDataURL;
        img.addEventListener('load', () => {
            ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
            ctx.drawImage(img, 0, 0);
        });
    });

    reader.readAsDataURL(file);
});

// Upload button change event listener
uploadBtn.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (e) => {
        const imageDataURL = e.target.result;
        const img = new Image();
        img.src = imageDataURL;
        img.addEventListener('load', () => {
            ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
            ctx.drawImage(img, 0, 0);
        });
    });

    reader.readAsDataURL(file);
});

// Document keydown event listener
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === 'Escape' || (e.ctrlKey && e.key === 'c')) {
        drawing = false;
    }
});

shareBtn.addEventListener('click', () => {
    const shareWindow = window.open('', 'Share', 'width=500,height=500');
    shareWindow.document.write(`
    <style>
    body {
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 20px;
    background-color:white;
    }
    h1 {
    color: black;
    margin-bottom: 10px;
    }
    a {
    display: block;
    margin-bottom: 10px;
    color: #337ab7;
    text-decoration: none;
    margin:30px 50px;
    border:2px solid black;
    padding:20px 0px;
    border-radius: 5px;
    }
    a:hover {
    background-color: black;
    border:2px solid white;
    }
    img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
    }
    </style>
    <h1>Share on:</h1>
        <a href="https://wa.me/?text=${encodeURIComponent('Your signature')}"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"> WhatsApp</a>
        <a href="https://www.instagram.com/share?url=${encodeURIComponent('Your signature')}"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"> Instagram</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('Your signature')}"><img src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Facebook_icon_2013.svg"> Facebook</a>
        <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent('Your signature')}"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAYFBMVEUAxP////8Awv8Av/8Avf/7/v8Au/9Qzv+15//s+f/3/P/w+f901v/y+//b8/9/2f/U8v9k0v+h4P/i9v+W3//K7v8ox/+96v+J2v9Oy/9IyP+q5P8zxf9ezv9x0v+V3P+n4L0dAAAFKklEQVR4nO2c13LrIBCG5UXd6gV1+/3f8kiK7biogQEpZ/ab3DgzNvsL2EKRpiEIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiD/H6BB/7e3Fd9DCLW8G3H7lwW1VhadnonCuoVJRUeXWYevSkZc+1J/Wg5aFx9ZDnj5p5SRvKxeDSf0kjgNkWzPFw+LNv6MlmG0lfTx00BoaTsnpxJh8TwQZ9xPixbzUobBVvx0DhCIk9zt/yO7Y0jqlpxNwNwQe1D0jkAHK8lTY/jotGJt/zAoPp18PjXmqpaTW8alHTju7aPs6W8OvsjlGWl6uKql/2XX/f2Q6OLtf4He2mF/ZnSDlhcK2VqgvLXUsMZtPWXUEkie/L1JD39U1ExqSOkuWf5JSsfvyZw1ZvDbWsfSEAQLhk9pGbw0aNUls+SJeQp6jrddDSkXouWUlo4Q6JXkp6CS1jn6+alFN9s+cdbd8jNOaV2uTX5me2KsmM9iToZdbZul4DlMYs5R4Ixh0y8lTpqXnunVBPEmNaRh0vLAvUp1AOf35jKyoT3KNsoeJFLds/4ups/dtdUW4cI2yu40csPmR88MlGttQsalJTOlatHMyUcc0eWhRm0OKUYmO50xJ2re8SHWC1+CijFiDnCm5izMuqUonO8duDCmMqch0siv/odyZhojD+nMs4Qtyf8rqcRY+QsxZg3w83LasbGLSS9KVmX0pTLez69U/zSDXYwtfb78UC1a4Qa2Rd4tOa4Yfcaf3TH8INPMF2OOK2ZT+Zsm1PwdbwcWA8k2g6LGq4D0Yw4OLEZrGUKgH+V5YTOnmerEaDFb1ciBQjHalT2iH1YMtPZ86PxDYiwgoxrOYmsjhtyi7AYposQiOkDNkQdvR0HGrI3Lkq4TNBYx25XY+RVOqCI108cOMVzHLjOJTiCVt/D3LGZ5t0gUAVUhhjSS3dgPkZpt2Vh2hBkpFIUZ6cG/x1XimftJIzfA/HBWUjMvrQEIxFEy/3sI39okE/L3zG6AJ1+M9M3MB0Rm6B8xQnU5M/OuMSuuqikzIHug+cpGmca9pr+ZXKUYrZWb1ChJmR9A28jMalRKGdVILAACpaNsUAOhtODJdFZCkJxOUmmjKP1/U9OW65Zx0O2gZaCW0DnFTlr63rGEL9LsMGPuEN2KhepJdpFRVllN6yoOM5Fuje3YlyigCE5OLtw9ZztIGWaLjDgTsZ0uFAbvOaUlfLVZ2RPAeoB0nWI3TwaWaC2pvAOMq4geaO5V4XbZpxqxAy3aU4umUZF1gLurlJ5OYMXp7dsxwyKasL4pJJ/626JGVI0WHOFuGYjJM50dvfITUPGcv3zDVXDsbxNAw6+3OThu48gCWu+79edC5XrsOrTKIm43na8cJN4BAGp5PAu3Eu+UfAPh2VZLN170UEy78VTdq5bugFpA63icWrrtyopawEp4coED9guQKuFyztHhtBBeKafcOpYfAwJewZme2Us3O5RDdIjtYOp60AaMfRYvPwEA3SRWFp2565n9lpXuGgjRe4hmhcmXq5nB+kU1yZRpkDoijjX50m9grQKdmMVlN6C7axmGmWV/XVgaQfbNK0UE0stp+HP9gSA5UGLZyykLTm88SOkO0i13CL1cuUJ+XlYHfGERQB03jIuzTjP1BqOj0Hb2ZjftF3F9vOL4BYD392FNYURZdbCJMgMxderZkWtM4aZFElPd/BNK7uhmb29lvVBRIKapH8cNIwiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCqOcfw6RFhSC7Ym8AAAAASUVORK5CYII="> Twitter</a>
    
   `);
});
// Set the signature canvas border
signatureCanvas.style.border = '2px solid black';