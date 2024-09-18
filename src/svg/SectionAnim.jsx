import React,{useEffect,useRef} from "react";
import {gsap} from "gsap";
import SectionSvg from "./SectionSvg";

const SectionAnim = React.forwardRef ((prop,ref) => {

    
    const documentRef = useRef(document);

    

    useEffect(() => {
        
        if(ref.current) {
            // console.log("SectionAnim ref:", ref.current);
            //tv light animation
            const tvLight = ref.current.querySelector("#tv-light");
            const tvLightTimeline = gsap.timeline({
                repeat: -1
            });
            const op = 0.75;

            tvLightTimeline
                .set(tvLight, {opacity: op})
                .to(tvLight, {opacity: 1, duration:1, delay: 0.5})
                .to(tvLight, {opacity:op})
                .to(tvLight, {opacity:1, duration: 0.4, delay: 0.5})
                .to(tvLight, {opacity:op});

            

            //hovering link
            const label = ref.current.querySelector("div.label");
            const links = ref.current.querySelectorAll("svg a");

            links.forEach(link => {
                link.addEventListener("mouseenter", function () {
                    label.classList.add("is-visible");
                    label.innerHTML = link.getAttribute('data-label');

                    gsap.to(links, {opacity:0.25});
                    gsap.to(link, {opacity:1});
                });

                link.addEventListener("mouseleave", function () {
                    label.classList.remove("is-visible");
                    label.innerHTML = ('label');

                    gsap.to(links, {opacity:1});
                    
                });
            });

            
            documentRef.current.addEventListener("mousemove", (e) => {

                label.style.left = e.clientX + "px"
                label.style.top = e.clientY + "px"

              
              });
        }
        
    }, []);
    
  return (
    <div>
        <SectionSvg ref={ref}/>
    </div>
  )
}) ;

export default SectionAnim