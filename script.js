// script.js

// 1. Dynamic Typing Effect for Hero Section
const phrases = [
    "I build AI & ML Models.",
    "I build Full-Stack Apps.",
    "I engineer Systems.",
    "I create GraphAnalytics."
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let delayBetweenPhrases = 2000;

function typeEffect() {
    const dynamicTextElement = document.querySelector('.dynamic-text');
    if (!dynamicTextElement) return;

    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
        // Remove characters
        dynamicTextElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        // Add characters
        dynamicTextElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    // Determine the next typing speed
    let speed = isDeleting ? deletingSpeed : typingSpeed;

    // If phrase is fully typed
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        speed = delayBetweenPhrases;
        isDeleting = true;
    } 
    // If phrase is fully deleted
    else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        speed = 500; // brief pause before next phrase
    }

    setTimeout(typeEffect, speed);
}

// 2. Scroll Reveal Animations using IntersectionObserver
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Optional: Stop observing once revealed to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));
}

// Initialize scripts when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    initScrollReveal();
});
