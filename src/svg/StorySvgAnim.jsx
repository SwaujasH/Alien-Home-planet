import React,{useEffect,useRef} from "react";
import {gsap} from "gsap";
import StorySvg from "./StorySvg";

import IntroSvgAnim from "./IntroSvgAnim";
import SectionAnim from "./SectionAnim";

const StorySvgAnim = () => {

    const storySvgRef = useRef(null); // Ref to target the SVG
    const sectionSvgAnimRef = useRef(null);
    const svgAnimRef = useRef(null);

    const windowRef = useRef(window);
    
    useEffect(() => {
      
      // console.log("useEffect is running");
      // console.log("storySvgRef on mount:", storySvgRef.current);
      // console.log("sectionSvgAnimRef on mount:", sectionSvgAnimRef.current);
      // console.log("svgAnimRef on mount:", svgAnimRef.current);

        if(storySvgRef.current&&sectionSvgAnimRef.current&&svgAnimRef.current) {

            const header = svgAnimRef.current;
            const section = sectionSvgAnimRef.current;
            const storySvg = storySvgRef.current.querySelectorAll("svg");
            //story timeline
            
            const storyTimeline = gsap.timeline();
            
            
            gsap.set(section,{
              opacity:0,
              visibility: "hidden",
              pointerEvents: "none",
              
            })
            gsap.set(storySvgRef.current,{
              opacity:0,
              visibility: "hidden"
            })
            gsap.set(storySvg,{
                x: (index) => {
                  return (index * 50 + 300) + "vh"   //maths used to slide each element differentially
                }
              })

            storyTimeline
              .to(header, {opacity: 0,delay:3})
              .addLabel("startScene")
              .to(storySvgRef.current,{
                opacity: 1,
                visibility: "visible"
              }, "startScene")
              .to(storySvg,{x: "0vh", duration:10,ease:"linear"}, "startScene")
              .addLabel("endScene")
              .to(storySvgRef.current,{opacity: 0},"endScene")
              .to(section,{
                opacity: 1,
                
                visibility: "visible",
                pointerEvents: "auto",
              },"endScene");

            storyTimeline.pause();

            let update ;    //to lock the anmation frames if the scroll is faster than animation frames

            windowRef.current.addEventListener("scroll", () => {
                const pixels = windowRef.current.scrollY ;
                const currentTime = pixels / 350;
                
                cancelAnimationFrame(update);

                update = requestAnimationFrame( () => {
                  storyTimeline.seek(currentTime);
                });
                storyTimeline.seek(currentTime);
            });
            // const parallaxTimeline = gsap.timeline();
            // parallaxTimeline
              
              
              // console.log("sectionSvgAnimRef:", sectionSvgAnimRef.current);  // Debugging ref
              // console.log("IntroSvg:", svgAnimRef.current);
              
        }  
         
        
        
    
        
    }, []);
  
    return (
      <div className="main-scene">
        
        <IntroSvgAnim ref={svgAnimRef}/>
        {/* Pass the ref to the SVG component */}
        <StorySvg ref={storySvgRef} />
        <SectionAnim ref={sectionSvgAnimRef} />
        
        
      </div>
    );
  };
  
  export default StorySvgAnim;