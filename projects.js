const projects = [
  {
    title: 'Multiplayer Shooter',
    image: './assets/MultiplayerShooterCover.png',
    hoverImage: './assets/MultiplayerShooterDemo.webm', // Updated to webm
    tags: ['C++', 'UE5.3', 'Replication'],
    link: 'MultiplayerShooter.html' // where to go when clicked
  },
  {
    title: 'Tidal Treasure Clash',
    image: './assets/TidalTreasureClashCover.png',
    hoverImage: './assets/TidalTreasureClash.gif',
    tags: ['C++', 'UE5.2'],
    link: 'https://jaymalik.itch.io/tidal-treasure-clash' // where to go when clicked
  },
  {
    title: 'Bomberman Blast',
    image: './assets/BombermanCover.jpg',
    hoverImage: './assets/BombermanHover.gif',
    tags: ['C++', 'Nvidia PhysX', 'HLSL', 'ImGui'],
    link: 'Bomberman.html' // where to go when clicked
  },
  {
    title: 'Card Game with Custom Engine',
    image: './assets/TichuCover.png',
    hoverImage: './assets/TichuHover.gif',
    tags: ['C++', 'SDL2', 'WASM', 'Engine Development'],
    link: './OdysseyTichu/Tichu.html' // where to go when clicked
  },
  {
    title: 'Procedural Dungeon Generator',
    image: './assets/project-1.png',
    hoverImage: './assets/gif-test.gif',
    tags: ['C++', 'SDL2'],
    link: 'ProceduralDungeonGenerator.html' // where to go when clicked
  },
  {
    title: 'Valorant Agent Tool',
    image: './assets/ValorantAgentCover.png',
    hoverImage: './assets/ValorantToolHover.gif',
    tags: ['C#', 'WPF', 'API', 'XAML', 'MVVM'],
    link: 'https://github.com/AlexKougentakos/ValorantAgentTool' // where to go when clicked
  },
  {
    title: 'Hardware & Software Rasterizer',
    image: './assets/DualRasterizer_DirectX.png',
    hoverImage: './assets/RasterizerHover.gif',
    tags: ['C++', 'DirectX11'],
    link: 'https://github.com/AlexKougentakos/Software-Hardware-Hybrid-Rasterizer' // where to go when clicked
  },
  {
    title: 'Software Raytracer',
    image: './assets/RayTracerCover.png',
    hoverImage: './assets/RayTracerHover.gif',
    tags: ['C++', 'SDL2'],
    link: 'https://github.com/AlexKougentakos/RaytracerSoftware' // where to go when clicked
  }
  // Add more projects here
];

  document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projectsContainer');
    const projectTemplate = document.getElementById('projectTemplate').content;

    projects.forEach(project => {
        const projectClone = document.importNode(projectTemplate, true);

        const projectImg = projectClone.querySelector('.project-img');
        const projectVideo = projectClone.querySelector('.project-video');
        const colorContainer = projectClone.querySelector('.color-container');
        const articleContainer = projectClone.querySelector('.article-container');

        // Set image source
        projectImg.src = project.image;
        projectImg.alt = `${project.title} Cover Image`;

        // Set video source
        projectVideo.src = project.hoverImage;
        projectVideo.alt = `${project.title} Hover Video`;

        // Set project title
        projectClone.querySelector('.project-title').textContent = project.title;

        // Insert tags
        const tagContainer = projectClone.querySelector('.tag-container');
        project.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'project-tag';
            span.textContent = tag;
            tagContainer.appendChild(span);
        });

        // **Hover effects: Show video on hover over the image only**
        projectImg.addEventListener('mouseenter', () => {
            projectImg.style.opacity = '0';
            projectVideo.style.display = 'block';
            projectVideo.play();
            // Optionally, add 'hovered' class to colorContainer if needed for additional styling
            colorContainer.classList.add('hovered');
        });

        projectImg.addEventListener('mouseleave', () => {
            projectImg.style.opacity = '1';
            projectVideo.style.display = 'none';
            projectVideo.pause();
            projectVideo.currentTime = 0; // Reset video to start
            colorContainer.classList.remove('hovered');
        });

        // **Click event to navigate to project link**
        // Attach the click event to the articleContainer to make the entire image and video clickable
        articleContainer.style.cursor = 'pointer'; // Indicate clickable

        // Combine both image and video elements for clickability
        articleContainer.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event from bubbling up to parent elements
            if (project.link.endsWith('.html')) {
                // Open in the same window
                window.location.href = project.link;
            } else {
                // Open in a new window
                window.open(project.link, '_blank');
            }
        });

        projectsContainer.appendChild(projectClone);
    });
});