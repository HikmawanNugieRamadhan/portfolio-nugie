document.addEventListener('DOMContentLoaded', function() {
    // Dark/Light mode toggle
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;
    
    // Check for saved user preference or use system preference
    const savedMode = localStorage.getItem('mode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode === 'dark' || (!savedMode && systemPrefersDark)) {
        body.classList.add('dark-mode');
        updateToggleButton(true);
    }
    
    modeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('mode', isDarkMode ? 'dark' : 'light');
        updateToggleButton(isDarkMode);
    });
    
    function updateToggleButton(isDarkMode) {
        if (isDarkMode) {
            modeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
            modeToggle.classList.remove('btn-outline-light');
            modeToggle.classList.add('btn-outline-dark');
        } else {
            modeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
            modeToggle.classList.remove('btn-outline-dark');
            modeToggle.classList.add('btn-outline-light');
        }
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});