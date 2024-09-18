import React,{useEffect} from "react";
import {gsap} from "gsap";
import IntroSvg from "./IntroSvg";

const IntroSvgAnim = React.forwardRef((prop,ref) => {

    
    
    

   
  
    useEffect(() => {

        if(ref.current) {

            //eyeball animation
            const eyeballs = ref.current.querySelectorAll("path#ball , path#ball_2, path#ball_3, path#ball_4, path#ball_5, path#ball_6");
            const eyesTimeline = gsap.timeline({
                repeat: -1
            })
            eyesTimeline
                .set(eyeballs, {y:0})
                .to(eyeballs, {y:7, duration:0.25, delay: 2,stagger: 0.25})
                .to(eyeballs, {y:0, duration: 0.25, delay: 4});

            //hat animation 
            const hatTimeline = gsap.timeline({
              repeat: -1,
              repeatDelay: 4,
            });
            const hat = ref.current.querySelector("g#hat");
            hatTimeline
                .set(hat, {y:0})
                .to(hat, {y:-50, rotation: -10,duration: 0.25, delay: 1})
                .to(hat, {y:0, rotation: 0,duration: 0.5, delay: 0.1});

            //left arm anim
            const leftArm = ref.current.querySelector("#left-arm");
            const leftArmTimeline = gsap.timeline({
              repeat: -1,
              
            });
            leftArmTimeline
                .set(leftArm,{rotation:0})
                .to(leftArm,{rotation: 20,duration: 0.25, delay: 2})
                .to(leftArm,{rotation: 0,duration: 0.25, delay: 2})

            //right arm anim
            const rightArm = ref.current.querySelector("#right-arm");
            const rightArmTimeline = gsap.timeline({
              repeat: -1,
              
            });
            rightArmTimeline
                .set(rightArm,{rotation:0})
                .to(rightArm,{rotation: -20,duration: 0.25, delay: 3})
                .to(rightArm,{rotation: 0,duration: 0.25, delay: 2})
            // //play animations
            // eyesTimeline.play();
            
        }
    }, [ref]);
  
    return (
      <div>
        <IntroSvg ref={ref} /> {/* Pass the ref to the SVG component */}
      </div>
    );
  });

  export default IntroSvgAnim;