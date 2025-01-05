const routens={
  // '/':renedrIndex,
  // '/search':renderSearch
}

const goto=(url:string)=>{
  console.log("url",url)

}

const renedrIndex =()=>{
  document.querySelector("#app")!.innerHTML=`
    <h1>Movie Info</h1>
    <form>
    <input type="search" name="query"/>
    <button type ="submit">Search</button>
    </form>
  `
  document.body.querySelector("form")?.addEventListener("submit",(event:any)=>{
    event.preventDefault();
    goto(`/search?query=${event.target.query.value}`)
   
  })
}

const renderSearch=(value:string)=>{
  document.querySelector("#app")!.innerHTML=value
}

renedrIndex()