let pathname = window.location.pathname;
const works = document.querySelector(".works");
const authors = document.querySelector(".authors");
const insert = document.querySelector(".insert");

if (pathname.includes("/books") || pathname === "/") {
    authors.style.opacity = "0.7";
    insert.style.opacity = "0.7";
    works.style.opacity = "1";
} else if (pathname.includes("/authors")) {
    authors.style.opacity = "1";
    insert.style.opacity = "0.7";
    works.style.opacity = "0.7";
} else {
    authors.style.opacity = "0.7";
    insert.style.opacity = "1";
    works.style.opacity = "0.7";

}

works.addEventListener("mouseover", () => {
    if (!pathname.includes("books") && pathname != "/") {
        works.animate({
            opacity: 1
        }, { duration: 500, fill: "forwards" });
    }
});

works.addEventListener("mouseleave", () => {
    if (!pathname.includes("books") && pathname != "/") {
        works.animate({
            opacity: 0.7
        }, { duration: 500, fill: "forwards" });
    }
});

authors.addEventListener("mouseover", () => {
    if (!pathname.includes("authors")) {
        authors.animate({
            opacity: 1
        }, { duration: 500, fill: "forwards" });
    }
});

authors.addEventListener("mouseleave", () => {
    if (!pathname.includes("authors")) {
        authors.animate({
            opacity: 0.7
        }, { duration: 500, fill: "forwards" });
    }
});

insert.addEventListener("mouseover", () => {
    if (!pathname.includes("insert")) {
        insert.animate({
            opacity: 1
        }, { duration: 500, fill: "forwards" });
    }
});

insert.addEventListener("mouseleave", () => {
    if (!pathname.includes("insert")) {
        insert.animate({
            opacity: 0.7
        }, { duration: 500, fill: "forwards" });
    }
});