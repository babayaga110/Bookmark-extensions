let myBookmarks = []
const inputEL = document.getElementById("input-el")
const saveInput = document.getElementById("add-el")
const saveTabs = document.getElementById("tab-el")
const deleteAll = document.getElementById("delete-all")
const ulEl = document.getElementById("ul-el")
const bookmarksFromLocalStorage = JSON.parse( localStorage.getItem("myBookmarks"))

if (bookmarksFromLocalStorage){
    myBookmarks = bookmarksFromLocalStorage
    allBookmarks()
}

function allBookmarks(){
    listItems =""
    for(let i  = 0; i < myBookmarks.length; i++){
        listItems += `<li>
                            <a href ="${myBookmarks[i]}" target="_blank">
                                ${myBookmarks[i]}
                            </a>
                      </li>`
    }
    ulEl.innerHTML = listItems
}

saveInput.addEventListener("click", function(){
    myBookmarks.push(inputEL.value)
    inputEL.value = ""
    localStorage.setItem("myBookmarks", JSON.stringify(myBookmarks))
    allBookmarks()
})

saveTabs.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myBookmarks.push(tabs[0].url)
        localStorage.setItem("myBookmarks", JSON.stringify(myBookmarks))
        allBookmarks()
        
    })
})

deleteAll.addEventListener("click", function(){
    localStorage.clear()
    myBookmarks = []
    allBookmarks()
})