const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
 
let photosArray = [];

const count = 10;
const apiKey = '5sTmskdGS2YQNF0BuIvaOoZElnE1gkoBph52mZ8gz90';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
function imageLoaded()
{
    imagesLoaded ++;
    if(imagesLoaded === totalImages)
    {
        ready = true;
        loader.hidden = true;
    }
}
//helper function to set attributes on dom elements
function setAttributes(element,attributes)
{
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}
function displayPhotos()
{
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // run for each object in photosArray
    photosArray.forEach((photo) => {
     // create anchor element to link to splash
     const item = document.createElement('a');
     setAttributes(item,{
         href: photo.links.html,
         target:'_blank',
     });
     const img = document.createElement('img');
     setAttributes(img,{
         src: photo.urls.regular,
         alt:photo.alt_description,
         title:photo.alt_description,
     });
     //event listener,check when each is finished loading 
     img.addEventListener('load',imageLoaded);
     // put <img> inside <a> then put both inside img container element
     item.appendChild(img);
     imageContainer.appendChild(item);
    });
}
// get photos from unsplash
async function getphotos()
{
    try{
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){

    }
}

//check to see is scrolling near bottom of page  , load more photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready)
    {
        ready = false;
        getphotos();
    }
})
getphotos();