let setElementSlide = document.querySelectorAll('.slide');
let valueElementDistance = [];
let seekbarInner = document.getElementById('seekbarInner');
let pathOrigin = window.location.origin; 
let pathName = window.location.pathname.split('/')[1];
let pathOriginal = pathOrigin + '/' + pathName;
    	
	const getInitialScroll = () => {
        return window.pageYOffset;
    }
    const getFinalScroll = (element) => {
        return Math.floor(element.getBoundingClientRect().top + getInitialScroll());
    }
    const getHeightElement = (element) => {
        return Math.floor(element.getBoundingClientRect().height);
    }

    const slide = (element, distance,index) => {        
        if (distance < 100) {
            element.setAttribute('style', 'opacity:'+(distance / 200)+';');
        } else if (distance < 150) {
            element.setAttribute('style', 'opacity:'+(distance-50) / 100+';');
        } else {
            element.setAttribute('style', 'opacity:1;');
        }

        if(index == 4) {
            document.querySelector('.outer').setAttribute('style', 'opacity:0;');
        }else {
            document.querySelector('.outer').setAttribute('style', 'opacity:1;');
        }        
    }

    const animationScroll = (element,valueArray, index) => {
        window.addEventListener('scroll', function() {
            let large = Math.floor(valueArray + getHeightElement(element)) - valueArray;
            let times = getInitialScroll() - valueArray;
            let percentage = 100 * times / large;
            
            if(valueArray <= getInitialScroll() && getInitialScroll() < Math.floor(valueArray + getHeightElement(element))) {
                element.classList.add('is-active-slide');
                element.setAttribute('style', 'opacity:1;');
                seekbarInner.setAttribute('style','height:'+ percentage + '%'); 
                slide(element, large - times,index);
                if(element.getAttribute('slide-number') == index) {
                    if(window.location.href != pathOriginal+'/'+(index+1)+'?ref=historia') {
                        history.pushState(null, '', pathOriginal+'/'+(index+1)+'?ref=historia');
                        console.log(index);
                    }
                }      
            }else {
                element.classList.remove('is-active-slide');
                element.setAttribute('style', 'opacity: 0;');
            }
        })
    }

    const getDistanceElement = (element) => {
        let distanceElement = getFinalScroll(element);
    } 

    let arrayDistanceElement = [0];
    Array.from(setElementSlide).map((item,index) => {
        arrayDistanceElement.push(Math.floor(getFinalScroll(item) + getHeightElement(item)));
        animationScroll(item,arrayDistanceElement[index], index);
    })
    //console.log(arrayDistanceElement);
