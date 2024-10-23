document.addEventListener('DOMContentLoaded', function () {
    var splide = new Splide('.splide', {
        perPage: 3,
        gap: '20px',
        breakpoints: {
            640: {
            perPage: 1,
            gap: '50px',
            },
        },
    });
splide.mount();
});