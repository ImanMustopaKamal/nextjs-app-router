"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useState } from "react";
gsap.registerPlugin(ScrollTrigger);

export default function Test() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (!init) return;
    
    let containers = document.querySelectorAll(".carousel_wrapper");
    if (containers.length > 0) {
      containers.forEach((container) => {
        console.log(container);
        let horizontalScrollTween = gsap.to(container, {
          x: () =>
            -(container.scrollWidth - document.documentElement.clientWidth) +
            "px",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            scrub: true,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
            end: () => "+=" + container.offsetWidth,
          },
        });

        var sections = container.querySelectorAll(".image_item");

        sections.forEach((section) => {
          var panel_id = section.id;

          gsap.to(section, {
            scrollTrigger: {
              trigger: section,
              start: "left center",
              end: "right center",
              markers: true,
              snap: 1 / (sections.length - 1),
              containerAnimation: horizontalScrollTween,
              toggleClass: {
                targets: ".dot[data-panel=" + panel_id + "]",
                className: "active",
              },
            },
          });
        });
      });
    }
  }, [init]);

  return (
    <>
      <section className="section bg_green carousel">
        <div className="carousel_wrapper">
          <div id="panel_1" className="image_item">
            <div className="image_wrapper">
              <img
                src="https://cottoncreative.co.uk/clients/rcw/gallery_1.png"
                alt=""
              />
            </div>
            <div className="caption">
              <p className="annotation">Bedroom 1</p>
            </div>
          </div>

          <div id="panel_2" className="image_item">
            <div className="image_wrapper">
              <img
                src="https://cottoncreative.co.uk/clients/rcw/gallery_1.png"
                alt=""
              />
            </div>
            <div className="caption">
              <p className="annotation">Bedroom 2</p>
            </div>
          </div>

          <div id="panel_3" className="image_item">
            <div className="image_wrapper">
              <img
                src="https://cottoncreative.co.uk/clients/rcw/gallery_1.png"
                alt=""
              />
            </div>
            <div className="caption">
              <p className="annotation"></p>
            </div>
          </div>

          <div id="panel_4" className="image_item">
            <div className="image_wrapper">
              <img
                src="https://cottoncreative.co.uk/clients/rcw/gallery_1.png"
                alt=""
              />
            </div>
            <div className="caption">
              <p className="annotation"></p>
            </div>
          </div>

          <div id="panel_5" className="image_item">
            <div className="image_wrapper">
              <img
                src="https://cottoncreative.co.uk/clients/rcw/gallery_1.png"
                alt=""
              />
            </div>
            <div className="caption">
              <p className="annotation"></p>
            </div>
          </div>
        </div>
        <div className="carousel_pagination">
          <div data-panel="panel_1" className="dot">
            1
          </div>
          <div data-panel="panel_2" className="dot">
            2
          </div>
          <div data-panel="panel_3" className="dot">
            3
          </div>
          <div data-panel="panel_4" className="dot">
            4
          </div>
          <div data-panel="panel_5" className="dot">
            5
          </div>
        </div>
      </section>
    </>
  );
}
