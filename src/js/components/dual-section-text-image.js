console.log('hola carlos')

const dualTextImgInit = () => {
  window.addEventListener("load", () => { 
    const btns = document.querySelectorAll('.cont-btn')
    if(btns.length < 1 ) return ;
    btns.forEach((btn) => {
      console.log('btn', btn.dataset.id )
      btn.addEventListener('click', () =>{
        const textBody = document.querySelector(`.text-body[data-id="${ btn.dataset.id }"]`)
        console.log('textBody', textBody)
        console.log('textBody', textBody.dataset.open )
        if(!textBody)return;
        if(textBody.dataset.open === "false"){
          textBody.dataset.open = "true"
        }else{
          textBody.dataset.open = "false"
        }
      })
    })
  })
}
export default dualTextImgInit;
