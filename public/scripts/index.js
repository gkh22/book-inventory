document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector("#image-track");
    const works = document.querySelector(".works");
    const authors = document.querySelector(".authors");
    const plus = document.querySelector(".plus");
    let pathname = window.location.pathname;

    // Add event listeners for image hover-scaling effect
    const setImages = () => {
        for(const image of track.getElementsByClassName("image")) {
            image.addEventListener("mouseenter", () => {
                image.animate({
                    width: "42vmin",
                    height: "56vmin",
                
                }, { duration: 300, fill: "forwards" });
            });
            image.addEventListener("mouseleave", () => {
                image.animate({
                    width: "40vmin",
                    height: "54vmin",
                    
                }, { duration: 400, fill: "forwards" });
            });
        }
        plus.addEventListener("mouseenter", () => {
            plus.animate({
                width: "55px",
                height: "55px",
            
            }, { duration: 300, fill: "forwards" });
        });
        plus.addEventListener("mouseleave", () => {
            plus.animate({
                width: "50px",
                height: "50px",
                
            }, { duration: 400, fill: "forwards" });
        });
    }

    const setLinks = () => {

    }

    // Tracks mouse position across window
    window.onmousedown = e => {
        track.dataset.mouseDownAt = e.clientX;
    }
    // Function that computes slider position and animates track movement
    window.onmousemove = e => {
        if (track.dataset.mouseDownAt === "0") return;

        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
                maxDelta = window.innerWidth / 2;
        
        const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        track.dataset.percentage = nextPercentage;

        track.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" });

        for(const image of track.getElementsByClassName("image")) {
            image.animate({
            objectPosition: `${100 + nextPercentage}% center`,
            }, { duration: 1200, fill: "forwards" });
        }
        
    }

    window.onmouseup = () => {
        track.dataset.mouseDownAt = "0";
        track.dataset.prevPercentage = track.dataset.percentage;
    }

    window.addEventListener("click", () => {
        pathname = window.location.pathname;
        console.log(pathname);
    })

    setImages();
});

console.log(`${window.location.pathname}`);

