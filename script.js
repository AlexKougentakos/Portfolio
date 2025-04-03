function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");

    // Toggle notification dot visibility
    if (menu.classList.contains("open")) {
        const notificationDot = document.querySelector('.notification-dot');
        const hamburgerSpans = icon.querySelectorAll('span');
        notificationDot.style.display = 'none';
        hamburgerSpans.forEach(span => span.classList.remove('breathing'));
    } else {
        notificationDot.style.display = 'block';
        hamburgerSpans.forEach(span => span.classList.add('breathing'));
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const logoSpans = document.querySelectorAll(".logo span"); // targets all spans under .logo

    function typeLogo(logoSpan) {
        const logoText = [
            "Alexandros",
            "Kougentakos",
/*             "✓ C++",
            "✓ Unreal Engine 5",
            "✓ Replication",
            "✓ Steam Networking",
            "✓ DirectX 11",
            "✓ Vulkan",
            "✓ Nvidia PhysX",
            "✓ ImGui",
            "✓ SDL2",
            "✓ WebAssembly",
            "✓ Engine Development",
            "✓ A.I Programming",
            "✓ C#",
            "✓ XAML", */
        ];
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

            const typingSpeed = deleting ? 75 : 150;
            setTimeout(updateText, typingSpeed);
        }

        updateText();
    }

    logoSpans.forEach(span => typeLogo(span));

    // Add hover and click effects to projects
    addHoverEffects();
    addClickEffects();

    // Add breathing effect to projects button
    const projectsLink = document.getElementById('projects-link');
    const projectsLinkMobile = document.getElementById('projects-link-mobile');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const notificationDot = document.querySelector('.notification-dot');
    let breathingStopped = false;

    // Function to stop breathing effect and hide notification dot
    function stopBreathingAndHideNotification() {
        projectsLink.classList.remove('breathing');
        projectsLinkMobile.classList.remove('breathing');
        hamburgerIcon.classList.remove('breathing');
        notificationDot.style.display = 'none'; // Hide the notification dot
        notificationDot.classList.remove('show');
        breathingStopped = true;

        // Start glowing RGB effect on Projects title
        const projectsTitle = document.querySelector('#projects .title');
        if (projectsTitle) {
            projectsTitle.classList.add('rgb-glow');
            // Wrap each letter in a span
            projectsTitle.innerHTML = projectsTitle.textContent.split('').map(letter => 
                `<span>${letter}</span>`
            ).join('');
        }
    }

    // Add breathing effect, show notification dot, and click listener
    [projectsLink, projectsLinkMobile].forEach(element => {
        element.classList.add('breathing');
        element.addEventListener('click', stopBreathingAndHideNotification);
    });

    hamburgerIcon.classList.add('breathing');
    notificationDot.classList.add('show');

    // Modify the toggleMenu function to not stop the breathing effect
    window.toggleMenu = function() {
        const menu = document.querySelector(".menu-links");
        const icon = document.querySelector(".hamburger-icon");
        menu.classList.toggle("open");
        icon.classList.toggle("open");

        const hamburgerSpans = icon.querySelectorAll('span');
        
        if (menu.classList.contains("open")) {
            notificationDot.style.display = 'none';
            hamburgerSpans.forEach(span => span.classList.remove('breathing'));
        } else {
            if (!breathingStopped) {
                notificationDot.style.display = 'block';
                hamburgerSpans.forEach(span => span.classList.add('breathing'));
            }
        }
    }

    let gDidEnterProjects = false;

    const projectsSection = document.getElementById('projects');
    window.addEventListener('scroll', function() {

        if (gDidEnterProjects) {
            return;
        }

        const rect = projectsSection.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight) && (rect.bottom >= 0);

        if (!isVisible) {
            projectsLink.classList.add('breathing');
            projectsLinkMobile.classList.add('breathing');
            // Remove RGB glow from Projects title
            const projectsTitle = document.querySelector('#projects .title');
            if (projectsTitle) {
                projectsTitle.classList.remove('rgb-glow');
                projectsTitle.innerHTML = 'Projects'; // Reset to original text
            }
        } else {
            projectsLink.classList.remove('breathing');
            projectsLinkMobile.classList.remove('breathing');
            // Add RGB glow to Projects title
            const projectsTitle = document.querySelector('#projects .title');
            if (projectsTitle) {
                projectsTitle.classList.add('rgb-glow');
                // Wrap each letter in a span if not already done
                if (!projectsTitle.querySelector('span')) {
                    projectsTitle.innerHTML = projectsTitle.textContent.split('').map(letter => 
                        `<span>${letter}</span>`
                    ).join('');
                }
            }

            gDidEnterProjects = true;
        }
    });
});

function addHoverEffects() {
    const projectsTitle = document.querySelector('#projects .title');
    document.querySelectorAll('.details-container.color-container').forEach(container => {
        const img = container.querySelector('.project-img');
        const video = container.querySelector('.project-video');
        const projectTitle = container.querySelector('.project-title');

        container.addEventListener('mouseenter', () => {
            img.style.opacity = '0';
            video.style.opacity = '1';
            video.play();

            // Stop RGB glow on main Projects title
            if (projectsTitle) {
                projectsTitle.classList.remove('rgb-glow');
                projectsTitle.innerHTML = 'Projects'; // Reset to original text
            }

            // Start RGB glow on hovered project title
            if (projectTitle) {
                projectTitle.classList.add('rgb-glow');
                // Split the text into words, then wrap each letter in a span, and join with spaces
                projectTitle.innerHTML = projectTitle.textContent.split(' ').map(word => 
                    word.split('').map(letter => `<span>${letter}</span>`).join('')
                ).join(' ');
            }
        });

        container.addEventListener('mouseleave', () => {
            img.style.opacity = '1';
            video.style.opacity = '0';
            video.pause();

            // Restart RGB glow on main Projects title
            if (projectsTitle) {
                projectsTitle.classList.add('rgb-glow');
                projectsTitle.innerHTML = projectsTitle.textContent.split('').map(letter => 
                    `<span>${letter}</span>`
                ).join('');
            }

            // Stop RGB glow on project title
            if (projectTitle) {
                projectTitle.classList.remove('rgb-glow');
                projectTitle.innerHTML = projectTitle.textContent; // Reset to original text
            }
        });
    });
}

function addClickEffects() {
    document.querySelectorAll('.details-container.color-container').forEach(container => {
        container.style.cursor = 'pointer';
        container.addEventListener('click', (event) => {
            event.stopPropagation();
            const link = container.getAttribute('data-link');
            if (link) {
                if (link.endsWith('.html')) {
                    window.location.href = link;
                } else {
                    window.open(link, '_blank');
                }
            }
        });
    });
}

function openPopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('popupOverlay');
    popup.style.transition = 'opacity 0.4s ease-in-out'; // Set transition for opening
    overlay.style.transition = 'background-color 0.4s ease-in-out'; // Consistent with CSS
    popup.style.display = 'block';
    overlay.style.display = 'block';
    setTimeout(() => {
        popup.style.opacity = 1;
        overlay.style.opacity = 1;
    }, 10);
}

function closePopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('popupOverlay');
    popup.style.transition = 'opacity 0.2s ease-in-out'; // Faster transition for closing
    overlay.style.transition = 'background-color 0.2s ease-in-out'; // Faster transition for overlay
    popup.style.opacity = 0;
    overlay.style.opacity = 0;
    setTimeout(() => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }, 200); // Shorter time to match the new transition time
}

function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
}