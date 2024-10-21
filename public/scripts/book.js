let pathname = window.location.pathname;
const works = document.querySelector(".works");
const authors = document.querySelector(".authors");

if (pathname.includes("/books") || pathname === "/") {
    authors.style.opacity = "0.7";
} else {
    works.style.opacity = "0.7";
}

works.addEventListener("mouseover", () => {
    if (!pathname.includes("books/") && pathname != "/") {
        works.animate({
            opacity: 1
        }, { duration: 500, fill: "forwards" });
    }
});

works.addEventListener("mouseleave", () => {
    if (!pathname.includes("books/") && pathname != "/") {
        works.animate({
            opacity: 0.7
        }, { duration: 500, fill: "forwards" });
    }
});

authors.addEventListener("mouseover", () => {
    if (!pathname.includes("authors/")) {
        authors.animate({
            opacity: 1
        }, { duration: 500, fill: "forwards" });
    }
});

authors.addEventListener("mouseleave", () => {
    if (!pathname.includes("authors/")) {
        authors.animate({
            opacity: 0.7
        }, { duration: 500, fill: "forwards" });
    }
});