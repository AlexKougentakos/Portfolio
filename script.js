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

document.querySelector('.projects-container').addEventListener('click', function(event) {
    // Check if the clicked element or its parent is a project image
    let target = event.target;
    if (target.classList.contains('project-img') || target.parentNode.classList.contains('project-img')) {
        const popupId = target.dataset.target || target.parentNode.dataset.target;
        const popup = document.querySelector(`[data-popup='${popupId}']`);
        const overlay = document.querySelector(`[data-popup='popupOverlay${popupId.slice(-1)}']`);

        if (popup && overlay) {
            openPopup(popup, overlay); // Function to open the popup
        }
    }
});

function openPopup(popup, overlay) 
{
    popup.style.display = 'block';
    overlay.style.display = 'block';
    setTimeout(() => {
        popup.style.opacity = 1;
        overlay.style.opacity = 1;
    }, 10);
}


function closePopup(popup, overlay) {
    popup.style.opacity = 0;
    overlay.style.opacity = 0;
    setTimeout(() => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }, 200);
}

window.addEventListener('load', function() {
    var container = document.querySelector('.projects-container');
    var content = container.innerHTML;
    container.innerHTML += content; // Duplicate the content by appending it to itself
});

document.getElementById('scrollRight').addEventListener('click', function() {
    var container = document.querySelector('.projects-container');
    var items = container.querySelectorAll('.experience-details-container');
    var itemWidth = items[0].offsetWidth + 20; // Including margin

    // Scroll action
    container.scrollBy({ left: itemWidth, behavior: 'smooth' });

    // Delayed adjustment to reposition the first item to the end
    setTimeout(() => {
        var firstItem = container.removeChild(items[0]);
        container.appendChild(firstItem);
        container.scrollLeft -= itemWidth; // Adjust scroll position after the DOM manipulation
    }, 350); // Ensure this matches the duration of the scroll effect
});

document.getElementById('scrollLeft').addEventListener('click', function() {
    var container = document.querySelector('.projects-container');
    var items = container.querySelectorAll('.experience-details-container');
    var itemWidth = items[0].offsetWidth + 20; // Including margin

    // Prepend last item to the start to make it visible immediately when scrolling left
    var lastItem = container.removeChild(items[items.length - 1]);
    container.insertBefore(lastItem, container.firstChild);
    container.scrollLeft += itemWidth; // Adjust scroll position before the scroll action

    // Scroll action
    container.scrollBy({ left: -itemWidth, behavior: 'smooth' });
});

