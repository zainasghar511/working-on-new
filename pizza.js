const search = document.querySelector(".search")
const Allheading = document.querySelectorAll(`#Allitem h3`)
search.addEventListener(`input`,(e)=>{
 const value = e.target.value.toLowerCase();
 Allheading.forEach((heading=>{
    const text = heading.textContent.toLowerCase();
    const parentCard = heading.parentElement;
    if(text.includes(value)){
        parentCard.style.display ="block"
    }else{
        parentCard.style.display = "none"
    }
 }))
})