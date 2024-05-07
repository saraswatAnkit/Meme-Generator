let apiKey = 'TQF1f0pP6WHnMqgTb96hnLJbU0MqW1v1'

let submitBtn = document.getElementById("search-btn");

let generateGif = () =>{
    let loader = document.querySelector(".loader");
    loader.style.display = "block";
    let q = document.getElementById("search-box").value;
    let gifCount = 10;
    let finalUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;


    document.querySelector(".wrapper").innerHTML="";

    fetch(finalUrl)
    .then((resp) => resp.json())
    .then((info) => { 
        console.log(info.data);

    let gifsData = info.data;
    gifsData.forEach((gif) => {
        let container = document.createElement("div");
        container.classList.add("container");
        let iframe = document.createElement("img");
        console.log(gif);
        iframe.setAttribute("src", gif.images.downsized_medium.url);
        iframe.onload = () =>{
            gifCount--;
            if(gifCount == 0) {
                loader.style.display = "none";
                document.querySelector(".wrapper").style.display = "grid";
            }
        };
        container.append(iframe);

        let copyBtn = document.createElement("button");
        copyBtn.innerText = "Copy Link";
        copyBtn.onclick = () => {
            let copyLink = `https://media4.griphy.com/media/${gif.id}/griphy.mp4`;

            navigator.clipboard.writeText(copyLink).then(() => {
                alert("GIF copied to clipboard");
            })
            .catch(() => {
                alert("GIF copied to clipboard");

                let hiddenInput = document.createElement("input");
                document.body.appendChild(hiddenInput);
                hiddenInput.value = copyLink;
                hiddenInput.select();

                document.execCommand("copy");
                document.body.removeChild(hiddenInput);
            });
        };
        container.append(copyBtn);
        document.querySelector(".wrapper").append(container);
        loader.style.display = "none";
    });
   
});
};

// generate Gifs on screen load or when user click on the submit btn
submitBtn.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);