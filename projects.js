const projects = [
    {
        title: 'Multiplayer Shooter',
        image: './assets/MultiplayerShooterCover.png',
        hoverImage: './assets/gif-test.gif',
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
        image: './assets/BombermanCover.png',
        hoverImage: './assets/gif-test.gif',
        tags: ['C++', 'Nvidia PhysX', 'HLSL', 'ImGui'],
        link: 'Bomberman.html' // where to go when clicked
      },
      {
        title: 'Procedural Dungeon Generator',
        image: './assets/project-1.png',
        hoverImage: './assets/gif-test.gif',
        tags: ['C++', 'SDL2'],
        link: 'ProceduralDungeonGenerator.html' // where to go when clicked
      },
      {
        title: 'Hardware & Software Rasterizer',
        image: './assets/DualRasterizer_DirectX.png',
        hoverImage: './assets/gif-test.gif',
        tags: ['C++', 'DirectX11'],
        link: 'ProceduralDungeonGenerator.html' // where to go when clicked
      },
      {
        title: 'Hardware Raytracer',
        image: './assets/RayTracerCover.png',
        hoverImage: './assets/gif-test.gif',
        tags: ['C++', 'SDL2'],
        link: 'ProceduralDungeonGenerator.html' // where to go when clicked
      },
      {
        title: 'Procedural Dungeon Generator',
        image: './assets/project-1.png',
        hoverImage: './assets/gif-test.gif',
        tags: ['C++', 'SDL2'],
        link: 'ProceduralDungeonGenerator.html' // where to go when clicked
      },
    // Add more projects here
  ];
  
  document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projectsContainer');
    const projectTemplate = document.getElementById('projectTemplate').content;
  
    projects.forEach(project => {
      const projectClone = document.importNode(projectTemplate, true);
  
      projectClone.querySelector('.project-img').src = project.image;
      projectClone.querySelector('.project-img').setAttribute('data-hover', project.hoverImage);
      projectClone.querySelector('.project-title').textContent = project.title;
      projectClone.querySelector('.popup-title').textContent = project.title;
      projectClone.querySelector('.popup .popup-image').src = project.image;
      projectClone.querySelector('.popup .reversed .popup-image').src = project.image;
  
      const tagContainer = projectClone.querySelector('.tag-container');
      project.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'project-tag';
        span.textContent = tag;
        tagContainer.appendChild(span);
      });
  
      // Modify this part to only add click event to the image
      const projectImg = projectClone.querySelector('.project-img');
      projectImg.style.cursor = 'pointer'; // Add pointer cursor to indicate clickable
      projectImg.onclick = (event) => {
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
  
    // Re-add hover and click effects for newly added content
    addHoverEffects();
    addClickEffects();
  });
  