document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector("#image-track");

    const setImages = () => {
        for(const image of track.getElementsByClassName("image")) {
            image.addEventListener("mouseenter", () => {
                image.animate({
                    width: "33vmin",
                    height: "47vmin",
                
                }, { duration: 300, fill: "forwards" });
            });
            image.addEventListener("mouseleave", () => {
                image.animate({
                    width: "30vmin",
                    height: "44vmin",
                    
                }, { duration: 400, fill: "forwards" });
            });
        }
    }


window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;

}

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

setImages();
});
