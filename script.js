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

    // --- Project Filtering Logic ---
    const projects = document.querySelectorAll('.project-item');
    const languageFilter = document.getElementById('filter-language');
    const engineLibraryFilter = document.getElementById('filter-engine-library');
    const typeFilter = document.getElementById('filter-type'); 
    // Tag Filter elements
    const tagsMultiselectContainer = document.getElementById('filter-tags-multiselect');
    const tagsButton = tagsMultiselectContainer ? tagsMultiselectContainer.querySelector('.multiselect-button') : null;
    const tagsOptionsDiv = tagsMultiselectContainer ? tagsMultiselectContainer.querySelector('.multiselect-options') : null;
    let selectedTags = []; // Keep track of selected tags

    const projectsContainer = document.querySelector('.projects-container'); 

    // Ensure filters exist before proceeding
    if (languageFilter && engineLibraryFilter && typeFilter && tagsMultiselectContainer && tagsButton && tagsOptionsDiv && projects.length > 0) {
        
        populateFilters();

        languageFilter.addEventListener('change', filterProjects);
        engineLibraryFilter.addEventListener('change', filterProjects);
        typeFilter.addEventListener('change', filterProjects);
        // Add listeners for the multi-select tag filter
        tagsButton.addEventListener('click', toggleTagsDropdown);
        document.addEventListener('click', closeDropdownOnClickOutside); 
        // Add event listener to options div for checkbox changes
        tagsOptionsDiv.addEventListener('change', handleTagCheckboxChange);

    } else {
        console.warn("Project filtering elements not found. Filtering disabled.");
        if (!tagsMultiselectContainer) console.warn("Could not find tagsMultiselectContainer");
        if (!tagsButton) console.warn("Could not find tagsButton");
        if (!tagsOptionsDiv) console.warn("Could not find tagsOptionsDiv");
    }


    function populateFilters() {
        const languages = new Set();
        const enginesLibraries = new Set();
        const tags = new Set();

        projects.forEach(project => {
            const lang = project.dataset.language;
            const engLib = project.dataset.engineLibrary;
            // Split tags by comma and trim whitespace
            const projectTags = project.dataset.tags ? project.dataset.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : []; 
            
            if (lang) languages.add(lang);
            if (engLib) enginesLibraries.add(engLib);
            projectTags.forEach(tag => tags.add(tag));
        });

        // Populate Language Dropdown
        languages.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang;
            option.textContent = lang;
            languageFilter.appendChild(option);
        });

        // Populate Engine/Library Dropdown
        enginesLibraries.forEach(engLib => {
            const option = document.createElement('option');
            option.value = engLib;
            option.textContent = engLib;
            engineLibraryFilter.appendChild(option);
        });

        // Populate Tags Multiselect Checkboxes
        tagsOptionsDiv.innerHTML = ''; // Clear previous options if any
        tags.forEach(tag => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = tag;
            // checkbox.id = `tag-${tag.replace(/\s+/g, '-')}`; // Optional: create unique IDs
            
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(` ${tag}`)); // Add space before text
            tagsOptionsDiv.appendChild(label);
        });
    }
    
    function toggleTagsDropdown() {
        tagsOptionsDiv.classList.toggle('show');
    }
    
    function closeDropdownOnClickOutside(event) {
        if (!tagsMultiselectContainer.contains(event.target)) {
            tagsOptionsDiv.classList.remove('show');
        }
    }

    function handleTagCheckboxChange() {
        selectedTags = [];
        const checkboxes = tagsOptionsDiv.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(checkbox => {
            selectedTags.push(checkbox.value);
        });
        
        // Update button text
        if (selectedTags.length === 0) {
            tagsButton.textContent = 'All Tags';
        } else if (selectedTags.length === 1) {
            tagsButton.textContent = selectedTags[0];
        } else {
            tagsButton.textContent = `${selectedTags.length} Tags Selected`;
        }

        filterProjects(); // Re-filter projects when tags change
    }

    function filterProjects() {
        const selectedLanguage = languageFilter.value;
        const selectedEngineLibrary = engineLibraryFilter.value;
        const selectedType = typeFilter.value;
        
        projectsContainer.classList.add('filtering-active');

        projects.forEach(project => {
            const projectLang = project.dataset.language;
            const projectEngLib = project.dataset.engineLibrary;
            // Split tags by comma and trim whitespace
            const projectTags = project.dataset.tags ? project.dataset.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : [];
            const projectType = project.dataset.type;

            const languageMatch = selectedLanguage === 'all' || projectLang === selectedLanguage;
            const engineLibraryMatch = selectedEngineLibrary === 'all' || projectEngLib === selectedEngineLibrary;
            const tagMatch = selectedTags.length === 0 || selectedTags.every(tag => projectTags.includes(tag));
            const typeMatch = selectedType === 'all' || projectType === selectedType;

            const shouldShow = languageMatch && engineLibraryMatch && tagMatch && typeMatch;
            
            // Apply animation/visibility change using opacity and display
            if (shouldShow) {
                // If it was hidden, make it visible first (display block), then fade in
                 if (project.style.display === 'none') {
                    project.style.opacity = '0'; // Start transparent
                    project.style.display = 'block'; // Or flex/grid depending on your layout needs
                     // Force reflow/repaint before adding opacity transition
                    void project.offsetWidth; 
                    project.style.opacity = '1'; 
                } else {
                    // If already visible, ensure opacity is 1 (in case it was fading out)
                    project.style.opacity = '1';
                    project.style.display = 'block'; // Ensure correct display type
                }
            } else {
                // If it should be hidden, fade out first, then hide
                project.style.opacity = '0';
                 // Use setTimeout to set display: none after the transition completes
                 // Make sure the timeout duration matches the CSS transition duration
                setTimeout(() => {
                    // Only set display none if opacity is still 0 (might have been shown again quickly)
                    if (project.style.opacity === '0') { 
                       project.style.display = 'none';
                    }
                }, 300); // Corresponds to 0.3s transition in CSS
            }
        });
         // Optional: Remove the class after a short delay to allow transitions
         setTimeout(() => {
            projectsContainer.classList.remove('filtering-active');
         }, 350); // Slightly longer than the transition
    }
     // --- End Project Filtering Logic ---
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