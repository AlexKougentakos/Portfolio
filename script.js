// Commonly used elements
const projectsContainer = document.querySelector('.projects-container');
const scrollRightButton = document.getElementById('scrollRight');
const scrollLeftButton = document.getElementById('scrollLeft');

// Function to toggle menu
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Auto-scroll functionality
let autoScrollInterval;
const intervalDuration = 5000; // Duration in milliseconds

function startAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval); // Clear existing interval if any
    }
    autoScrollInterval = setInterval(() => {
        scrollElement('right'); // Automatically scroll right
    }, intervalDuration);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval); // Stop the auto-scroll
}


// Functions to manage popups
function openPopup(popup, overlay) {
    stopAutoScroll();
    popup.style.display = 'block';
    overlay.style.display = 'block';
    setTimeout(() => {
        popup.style.opacity = 1;
        overlay.style.opacity = 1;
    }, 10);
}

function closePopup(popup, overlay) {
    startAutoScroll();
    popup.style.opacity = 0;
    overlay.style.opacity = 0;
    setTimeout(() => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }, 200);
}

// Event listeners for projects container
projectsContainer.addEventListener('mouseenter', stopAutoScroll);
projectsContainer.addEventListener('mouseleave', startAutoScroll);

projectsContainer.addEventListener('click', function(event) {
    let target = event.target.closest('.project-img');
    if (target) {
        const popupId = target.dataset.target;
        const popup = document.querySelector(`[data-popup='${popupId}']`);
        const overlay = document.querySelector(`[data-popup='popupOverlay${popupId.slice(-1)}']`);
        if (popup && overlay) {
            openPopup(popup, overlay);
        }
    }
});

projectsContainer.addEventListener('mouseover', function(event) {
    let target = event.target.closest('.project-img');
    if (target) {
        const hoverSrc = target.getAttribute('data-hover');
        target.dataset.originalSrc = target.dataset.originalSrc || target.src;
        target.src = hoverSrc;
        target.closest('.color-container').style.backgroundColor = 'rgb(230, 230, 230)';
    }
});

projectsContainer.addEventListener('mouseout', function(event) {
    let target = event.target.closest('.project-img');
    if (target) {
        target.src = target.dataset.originalSrc;
        target.closest('.color-container').style.backgroundColor = 'rgb(250, 250, 250)';
    }
});

// Scrolling functionality
function configureScrollButtons() {
    scrollRightButton.addEventListener('click', function() {
        scrollElement('right');
    });

    scrollLeftButton.addEventListener('click', function() {
        scrollElement('left');
    });
}

function scrollElement(direction) {
    const container = projectsContainer;
    const items = container.querySelectorAll('.experience-details-container');
    const itemWidth = items[0].offsetWidth + 20;

    let button = direction === 'right' ? scrollRightButton : scrollLeftButton;
    button.disabled = true; // Disable the button to prevent further clicks

    if (direction === 'right') {
        container.scrollBy({ left: itemWidth, behavior: 'smooth' });
        setTimeout(() => {
            let firstItem = container.removeChild(items[0]);
            container.appendChild(firstItem);
            container.scrollLeft -= itemWidth;
            button.disabled = false; // Re-enable the button after all actions are complete
            if (!projectsContainer.contains(button)) { // if the user isn't over the container
                startAutoScroll(); // Restart auto-scroll if not already running
            }
        }, 350);
    } else {
        container.scrollLeft += itemWidth; // Adjust scroll position before the scroll action
        setTimeout(() => {
            let lastItem = container.removeChild(items[items.length - 1]);
            container.insertBefore(lastItem, container.firstChild);
            container.scrollBy({ left: -itemWidth, behavior: 'smooth' });
            setTimeout(() => {
                button.disabled = false; // Re-enable the button after all actions are complete
                if (!projectsContainer.contains(button)) { // if the user isn't over the container
                    startAutoScroll(); // Restart auto-scroll if not already running
                }
            }, 350);
        }, 0);
    }
}

// Event Listeners
projectsContainer.addEventListener('mouseenter', stopAutoScroll);
projectsContainer.addEventListener('mouseleave', startAutoScroll);


// Initial setup on document load
document.addEventListener("DOMContentLoaded", function() 
{
    configureScrollButtons();
    startAutoScroll();
    window.onload = () => projectsContainer.innerHTML += projectsContainer.innerHTML; // Duplicate content
});

// Animated logo
document.addEventListener("DOMContentLoaded", () => 
{
    const logoSpans = document.querySelectorAll(".logo span");
    logoSpans.forEach(span => typeLogo(span));
});

function typeLogo(logoSpan) 
{
    const logoText = ["Alexandros", "Kougentakos"];
    let currentText = "", letterIndex = 0, textIndex = 0, deleting = false;

    function updateText() 
    {
        if (deleting) {
            currentText = logoText[textIndex].substring(0, --letterIndex);
        } else {
            currentText = logoText[textIndex].substring(0, ++letterIndex);
        }

        logoSpan.textContent = currentText;

        if (!deleting && letterIndex === logoText[textIndex].length + 10) {
            deleting = true;
        } else if (deleting && letterIndex === 0) {
            deleting = false;
            textIndex = (textIndex + 1) % logoText.length;
        }

        setTimeout(updateText, deleting ? 100 : 200);
    }
    updateText();
}
