let contacts=[];
let contactDOM=document.querySelector('.ListContainer');


  function renderContact(contact){

     let contactDOM=document.querySelector('.ListContainer')
let node = document.createElement('div')
node.setAttribute('id','person')
node.classList.add('Contact_list')
   node.innerHTML =`
     <img src="${contact.image}">
     <div class="contactdetail">
     <h1><i class="fas fa-user-circle contactIcon"></i> ${contact.name}</h1>
     <p> <i class="fas fa-envelope contactIcon"></i> ${contact.email}</p>
     <p><i class="fas fa-phone-alt contactIcon"></i> ${contact.number}  </p>
     </div>
         <button class="delete-contact js-delete-contact">
             <svg fill="var(--svgcolor)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                 <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
             </svg>
         </button>



     `
     node.dataset.id=contact.id
    
     
     console.log(node);
     contactDOM.insertBefore(node, contactDOM.firstChild);

}
let form=document.getElementsByClassName('js-form')[0]
let submit=document.querySelector('.submitbtn');
submit.addEventListener('click',(event)=>{
    event.preventDefault()
contactDOM.style.visibility='visible'
  
let name= document.getElementById('fullName').value;
let email,number,image;

 email=document.getElementById('myEmail').value
 number=document.getElementById('myTel').value
 image=document.getElementById('imgurl').value
 let contact={
    name,
    email,
    image,
    number,
    id:Date.now()
 }
 contacts.push(contact)
localStorage.setItem('contacts',JSON.stringify(contacts))

  renderContact(contact)
  console.log(form);
  form.reset()


})



  contactDOM.addEventListener('click',(event)=>{
    if(event.target.classList.contains('js-delete-contact')){
        let item=event.target
  
        contactDOM.removeChild(item.parentElement)
     let   itemid=item.parentElement.dataset.id
     
    contacts=  contacts.filter((item)=>item.id!=itemid)
   
    localStorage.setItem('contacts',JSON.stringify(contacts))

    if(contacts.length<1){
        contactDOM.style.visibility='hidden'
    }
    }

  
  })



  document.addEventListener('DOMContentLoaded',()=>{
contacts=localStorage.getItem('contacts')||[]
console.log(contacts);

if (contacts) {
    contacts=JSON.parse(contacts)
    
    
    if (contacts.length>0) {
        contactDOM.style.visibility='visible'
      }
    contacts.forEach((contact)=>renderContact(contact))
}
  })