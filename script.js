function toggleMenu()
{
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function() 
{
    const logoSpans = document.querySelectorAll(".logo span"); // targets all spans under .logo

    function typeLogo(logoSpan) {
        const logoText = ["Alexandros", "Kougentakos"];
        let currentText = "";
        let letterIndex = 0;
        let textIndex = 0;
        let deleting = false;

        function updateText() {
            if (deleting) {
                currentText = logoText[textIndex].substring(0, letterIndex--);
            } else {
                currentText = logoText[textIndex].substring(0, letterIndex++);
            }

            logoSpan.textContent = currentText;

            if (!deleting && letterIndex === logoText[textIndex].length + 10) {
                deleting = true;
            } else if (deleting && letterIndex === 0) {
                deleting = false;
                textIndex = (textIndex + 1) % logoText.length;
            }

            const typingSpeed = deleting ? 100 : 200;
            setTimeout(updateText, typingSpeed);
        }

        updateText();
    }

    logoSpans.forEach(span => typeLogo(span));
});

document.querySelectorAll('.project-img').forEach(item => {
    const container = item.closest('.color-container');
    const originalSrc = item.getAttribute('src');
    const hoverSrc = item.getAttribute('data-hover');
  
    item.addEventListener('mouseenter', () => {
      item.src = hoverSrc; // Change to GIF
      container.style.backgroundColor = 'rgb(230, 230, 230)'; // Darker background
    });
  
    item.addEventListener('mouseleave', () => {
      item.src = originalSrc; // Revert to original image
      container.style.backgroundColor = 'rgb(250, 250, 250)'; // Original background
    });
  });
  