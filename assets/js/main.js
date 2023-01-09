/*==================== SHOW MENU ====================*/
const showMenu=(toggleId,navId)=>{
    const toggle=document.getElementById(toggleId),
    nav=document.getElementById(navId)

    //Validate that variable exist
    if(toggle && nav){
        toggle.addEventListener('click',()=>{
            //we add the show-menu class to div tag with nav___menu class
            nav.classList.toggle('show-menu')

        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink=document.querySelectorAll('.nav__link')
function linkAction(){
    const navMenu=document.getElementById('nav-menu')
    //when we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n=>n.addEventListener('click',linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections=document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY=window.pageYOffset

    sections.forEach(current=>{
        const sectionHeight=current.offsetHeight
        const sectionTop=current.offsetTop - 50;
        sectionId=current.getAttribute('id')
        if(scrollY >sectionTop && scrollY<=sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId+']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId+']').classList.remove('active-link')
        }
    })
}

window.addEventListener('scroll',scrollActive)
/*==================== SHOW SCROLL TOP ====================*/ 
function scrolltop(){
    const scrollTop=document.getElementById('scroll-top');
    if(this.scrollY>=200) scrollTop.classList.add('show-scroll');else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll',scrolltop)
/*==================== DARK LIGHT THEME ====================*/ 
const themeButton=document.getElementById('theme-button')
const darkTheme='dark-theme'
const iconTheme='bx-sun'

const selectedTheme=localStorage.getItem('selected-theme')
const selectedIcon=localStorage.getItem('selected-icon')

const getCurrentTheme=()=>document.body.classList.contains(darkTheme) ? 'dark':'light'
const getCurrentIcon=()=>themeButton.classList.contains(iconTheme)?'bx-moon':'bx-sun'

if(selectedTheme){
    document.body.classList[selectedTheme==='dark' ? 'add': 'remove'](darkTheme)
    themeButton.classList[selectedIcon==='bx-moon'?'add':'remove'](iconTheme)
}
//active / deactivate the theme manually with the button
themeButton.addEventListener('click',()=>{
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    //we save the theme and the current icon that the  user chose
    localStorage.setItem('selected-theme',getCurrentTheme())
    localStorage.setItem('selected-icon',getCurrentIcon())
})

/*==================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ====================*/ 
function scaleCv(){
    document.body.classList.add('scale-cv')
}

/*==================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ====================*/ 
function removeScale(){
    document.body.classList.remove('scale-cv')
}

/*==================== GENERATE PDF ====================*/ 
 
// PDF generated area
let areaCv=document.getElementById('area-cv')
let resumeButton=document.getElementById('resume-button')

// Html2pdf options
var opt = {
    margin:       0,
    filename:     'jwhh.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 4 },
    jsPDF:        { format: 'a4', orientation: 'portrait' }
  };
  

// Function to call areaCv and Html2Pdf options 
function generatedResume(){
    html2pdf(areaCv,opt)
}

// When the button is clicked, it executes the three functions
resumeButton.addEventListener('click',()=>{
    // 1. The class .scale-cv is added to the body, where it reduces the size of the elements
    scaleCv()
    // 2. The PDF is generated
    generatedResume()
    // 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size.
    setTimeout(removeScale,5000)
})

