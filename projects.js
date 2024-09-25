const projects = [
  {
    title: 'Multiplayer Shooter',
    image: './assets/MultiplayerShooterCover.png',
    hoverImage: './assets/MultiplayerShooterHover.webm', // Updated to webm
    tags: ['C++', 'UE5.3', 'Replication'],
    link: 'MultiplayerShooter.html' // where to go when clicked
  },
  {
    title: 'Tidal Treasure Clash',
    image: './assets/TidalTreasureClashCover.png',
    hoverImage: './assets/TidalTreasureClashHover.webm',
    tags: ['C++', 'UE5.2'],
    link: 'https://jaymalik.itch.io/tidal-treasure-clash' // where to go when clicked
  },
  {
    title: 'Bomberman Blast',
    image: './assets/BombermanCover.jpg',
    hoverImage: './assets/BombermanCover.webm',
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

    // Set image and video sources
    projectImg.src = project.image;
    projectVideo.src = project.hoverImage;

    // Set alt attribute for accessibility
    projectImg.alt = `${project.title} Cover Image`;
    projectVideo.alt = `${project.title} Hover Video`;

    // Populate project title
    projectClone.querySelector('.project-title').textContent = project.title;

    // Populate project tags
    const tagContainer = projectClone.querySelector('.tag-container');
    project.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'project-tag';
      span.textContent = tag;
      tagContainer.appendChild(span);
    });

    // Handle hover events
    colorContainer.addEventListener('mouseenter', () => {
      colorContainer.classList.add('hovered');
      projectVideo.play();
    });

    colorContainer.addEventListener('mouseleave', () => {
      colorContainer.classList.remove('hovered');
      projectVideo.pause();
      projectVideo.currentTime = 0;
    });

    // Handle click events
    colorContainer.style.cursor = 'pointer'; // Indicate clickable
    colorContainer.onclick = (event) => {
      event.stopPropagation(); // Prevent event from bubbling up to parent elements
      if (project.link.endsWith('.html')) {
        // Open in the same window
        window.location.href = project.link;
      } else {
        // Open in a new window
        window.open(project.link, '_blank');
      }
    };

    projectsContainer.appendChild(projectClone);
  });
});
