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
    function switchState(newStateId) {
        [stateInput, stateProcessing, stateResult].forEach(el => {
            el.classList.remove('active');
            el.classList.add('hidden');
        });
        
        const activeState = document.getElementById(newStateId);
        activeState.classList.remove('hidden');
        // trigger reflow for animation
        void activeState.offsetWidth;
        activeState.classList.add('active');
    }

    // Delay function to simulate processing and allow UI to render
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Generate QR Code
    generateBtn.addEventListener('click', async () => {
        const url = linkInput.value.trim();
        
        if (!url) {
            linkInput.classList.add('input-error');
            setTimeout(() => linkInput.classList.remove('input-error'), 400);
            return;
        }

        // Switch to processing state
        switchState('state-processing');

        // Simulate some processing time for UX (so it doesn't just instantly snap)
        await sleep(600);

        const darkColor = colorDarkInput.value;
        const lightColor = colorLightInput.value;
        const errorCorrectionLevel = errorCorrectionSelect.value;

        try {
            await QRCode.toCanvas(qrCanvas, url, {
                width: 1000,
                margin: 2,
                color: {
                    dark: darkColor,
                    light: lightColor
                },
                errorCorrectionLevel: errorCorrectionLevel
            });

            // Switch to result state
            switchState('state-result');
        } catch (err) {
            console.error('Error generating QR code:', err);
            alert('Failed to generate QR code. Please try again.');
            switchState('state-input');
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
        switchState('state-input');
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
