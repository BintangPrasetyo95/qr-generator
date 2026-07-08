document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const linkInput = document.getElementById('link-input');
    const colorDarkInput = document.getElementById('color-dark');
    const colorLightInput = document.getElementById('color-light');
    const errorCorrectionSelect = document.getElementById('error-correction');
    
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    const stateInput = document.getElementById('state-input');
    const stateProcessing = document.getElementById('state-processing');
    const stateResult = document.getElementById('state-result');
    
    const qrCanvas = document.getElementById('qr-canvas');

    // Switch between states
    function switchState(newStateEl) {
        [stateInput, stateProcessing, stateResult].forEach(el => {
            el.classList.add('hidden');
        });
        
        newStateEl.classList.remove('hidden');
    }

    // Delay function to simulate processing and allow UI to render
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Generate QR Code
    generateBtn.addEventListener('click', async () => {
        const url = linkInput.value.trim();
        
        if (!url) {
            // Use border color red for error mimicking
            linkInput.style.borderColor = 'var(--red)';
            setTimeout(() => linkInput.style.borderColor = '', 400);
            return;
        }

        // Switch to processing state
        switchState(stateProcessing);

        // Simulate some processing time for UX
        await sleep(600);

        const darkColor = colorDarkInput.value;
        const lightColor = colorLightInput.value;
        const errorCorrectionLevel = errorCorrectionSelect.value;

        try {
            await QRCode.toCanvas(qrCanvas, url, {
                width: 500,
                margin: 2,
                color: {
                    dark: darkColor,
                    light: lightColor
                },
                errorCorrectionLevel: errorCorrectionLevel
            });

            // Switch to result state
            switchState(stateResult);
        } catch (err) {
            console.error('Error generating QR code:', err);
            alert('Failed to generate QR code. Please try again.');
            switchState(stateInput);
        }
    });

    // Download QR Code
    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = qrCanvas.toDataURL('image/png');
        link.click();
    });

    // Reset and Generate Another
    resetBtn.addEventListener('click', () => {
        switchState(stateInput);
        linkInput.value = '';
        linkInput.focus();
    });
    
    // Allow pressing Enter in the input field
    linkInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });
});
