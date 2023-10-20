"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Test() {
  const [init, setInit] = useState(false);
  const container = useRef(null);

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (!init) return;
    let horizontalScrollTween = gsap.to(container.current, {
      x: () =>
        -(
          container.current.scrollWidth - document.documentElement.clientWidth
        ) + "px",
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        scrub: 1,
        snap: 1 / 5,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        end: () => "+=" + container.current.offsetWidth,
      },
    });
    var sections = container.current.querySelectorAll(".panel");
    sections.forEach((section) => {
      var panel_id = section.id;

      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: "left center",
          end: "right center",
          markers: true,
          //     snap: 1 / (sections.length - 1),
          containerAnimation: horizontalScrollTween,
              // toggleClass: {
              //   targets: ".dot[data-panel=" + panel_id + "]",
              //   className: "active",
              // },
        },
      });
    });

    // let horizontalScrollTween = gsap.to(container.current, {
    //   x: () =>
    //         -(container.current.scrollWidth - document.documentElement.clientWidth) +
    //         "px",
    //       ease: "none",
    //       scrollTrigger: {
    //         trigger: container,
    //         scrub: true,
    //         pin: true,
    //         pinSpacing: true,
    //         invalidateOnRefresh: true,
    //         end: () => "+=" + container.offsetWidth,
    //       },
    // })

    // gsap.to(sections, {
    //   xPercent: -100 * (sections.length - 1),
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: ".container",
    //     markers: true,
    //     pin: true,
    //     scrub: 1,
    //     snap: 1 / (sections.length - 1),
    //     end: "+=3500",
    //   },
    // });
  }, [init]);

  return (
    <>
      <div className="container" ref={container}>
        <div className="description panel blue" id="one">
          <div>
            <h1>Horizontal snapping sections (simple)</h1>
            <p>
              Scroll vertically to scrub the horizontal animation. It also
              dynamically snaps to the sections in an organic way based on the
              velocity. The snapping occurs based on the natural ending position
              after momentum is applied, not a simplistic "wherever it is when
              the user stops".
            </p>
            <div className="scroll-down">
              Scroll down<div className="arrow"></div>
            </div>
          </div>
        </div>

        <section className="panel red" id="two">
          ONE
        </section>
        <section className="panel orange" id="three">
          TWO
        </section>
        <section className="panel purple" id="four">
          THREE
        </section>
        <section className="panel green" id="five">
          FOUR
        </section>
        <section className="panel gray" id="six">
          FIVE
        </section>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "100px",
          left: "50%",
          display: "flex",
          gap: "30px",
          transform: "translateX(-50%)",
        }}
      >
        <h1>1</h1>
        <h1>2</h1>
        <h1>3</h1>
      </div>
    </>
  );
}
