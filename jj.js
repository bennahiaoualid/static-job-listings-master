/* constants */
const jobs = document.getElementById("jobs");
const filters = document.querySelectorAll(".tags btn")
/* global var */
var filter = []


//jobs.appendChild(creatCardElement("fff"));
/* function */
function loadJobs(filter = null){
    jobs.innerHTML = "";
    fetch('./data.json')
    .then((response) => response.json())
    .then((json) => { 
        for (let el = 0; el < json.length;el++){
            if(filter !== null && filter.length > 0){
                const contines = filter.every(r=> json[el].languages.includes(r));
                if(contines){
                    jobs.appendChild(creatCardElement(json[el])); 
                }
            }
            else{
                jobs.appendChild(creatCardElement(json[el])); 
            }
            
        }
});
}
function creatCardElement(cardData){
    const card = document.createElement("div")
    card.classList.add("job","flex-wrap");

    const cardContent = `
      <div class="job__info">
        <div class="job__img">
          <img src=${cardData.logo} alt="" srcset="">
        </div>
        <div class="job__content">
          <div class="job__company | d-flex align-items-center gap-400">
            <a class="job__title" href="#">${cardData.company}</a>
            <p class="job__status job__status--featured">New!</p>
            <p class="job__status job__status--new">Featured</p>
          </div>
          <a class="job__pos" href="#">${cardData.position}</a>
          <hr class="hr d-block-sm">
          <div class="d-flex">
            <p class="job_det">1d ago</p>
            <p class="job_det">Full Time</p>
            <p class="job_det">USA only</p>
          </div>
        </div>
      </div>
      <div class="tags | d-flex gap-400">
      </div>
    `
    card.innerHTML = cardContent;
    const tags = card.querySelector(".tags");
    for (const key in cardData.languages) {
        tags.insertAdjacentHTML("beforeend",
            `<button class="btn job-lang">${cardData.languages[key]}</button>`
        );
    } 
    tags.querySelectorAll(".btn").forEach(element=>{
        element.addEventListener("click",event=>{
            addFilter(element.textContent);
        })
    });
    return card;
}
function creatFilterElement(filterData){
    const filterHolder = document.createElement("li")
    filterHolder.classList.add("filter-op");

    const filterContent = `
                    <span class="filter__tag">${filterData}</span>
                    <button class="filter__remove" data-lang=${filterData}>
                        <img src="./images/icon-remove.svg" alt="" srcset="">
                    </button>
                    `;
    filterHolder.innerHTML = filterContent;
    const remove  = filterHolder.querySelector(".filter__remove");
    remove.addEventListener("click",event=>{
        removeFilter(event.currentTarget.getAttribute("data-lang"));
    })
    
    return filterHolder;
}

function addFilter(newFilter){
    if (!filter.includes(newFilter)){
        const filterSection = document.getElementById("filter-tags");
        filterSection.parentElement.classList.remove("opacity-0");
        filterSection.appendChild(creatFilterElement(newFilter));
        filter.push(newFilter);
        loadJobs(filter);

    }
}
function removeFilter(newFilter){
    const filterSection = document.getElementById("filter-tags");
    const filterElemnt = filterSection.querySelector('[data-lang="'+newFilter+'"]');
    filterSection.removeChild(filterElemnt.parentElement);
    let index = filter.indexOf(newFilter);
    if (index !== -1) {
        filter.splice(index, 1);
    }
    if(filter.length === 0){
        filterSection.parentElement.classList.add("opacity-0");
    }
    loadJobs(filter);
}

/* init */
loadJobs();