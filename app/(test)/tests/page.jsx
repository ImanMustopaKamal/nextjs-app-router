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

    if (typeof window === "undefined") return;
    /* Panels */
    let panelsContainer = document.querySelector("#panels-container"),
      tween;
    console.log(panelsContainer);
    const panels = gsap.utils.toArray("#panels-container .panel");
    tween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#panels-container",
        pin: true,
        start: "top top",
        scrub: 1,
        snap: {
          snapTo: 1 / (panels.length - 1),
          inertia: false,
          duration: { min: 0.1, max: 0.1 },
        },
        end: () => "+=" + (panelsContainer.offsetWidth - innerWidth),
      },
    });
    console.log("panelsContainer.offsetWidth: ", panelsContainer.offsetWidth);
    console.log("innerWidth: ", innerWidth);
  }, [init]);

  return (
    <>
      <div id="page" className="site">
        <div id="feather" className="feather"></div>

        <header id="masthead" className="site-header" role="banner">
          <nav className="anchor-nav" role="navigation">
            <a href="#intro" className="anchor">
              Home
            </a>
            <a href="#panel-1" className="anchor">
              Panel 1
            </a>
            <a href="#panel-3" className="anchor">
              Panel 3
            </a>
            <a href="#panel-5" className="anchor">
              Panel 5
            </a>
            <a href="#map" className="anchor">
              Map
            </a>
          </nav>
        </header>

        <main id="content" className="site-content" role="main">
          <section id="intro" className="full-screen pt-5 blue">
            <h1>A cool title</h1>

            <div id="clouds-layer-1" className="clouds"></div>
            <div id="clouds-layer-2" className="clouds"></div>
          </section>

          <section id="panels">
            <div id="panels-container" style={{ width: "500%" }}>
              <article id="panel-1" className="panel full-screen red">
                <div className="container">
                  <div className="row">
                    <div className="col-6">
                      <img src="" alt="" />
                    </div>
                    <div className="col-6 d-flex flex-column">
                      <h2>Panel 1</h2>

                      <p className="step-description">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Including versions of Lorem Ipsum.
                      </p>

                      <div className="panels-navigation text-right">
                        <div className="nav-panel" data-sign="plus">
                          <a href="#panel-2" className="anchor">
                            Next
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              <article id="panel-2" className="panel full-screen orange">
                <div className="container">
                  <div className="row">
                    <div className="col-6">
                      <img src="" alt="" />
                    </div>
                    <div className="col-6 d-flex flex-column">
                      <h2>Panel 2</h2>

                      <p className="step-description">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Including versions of Lorem Ipsum.
                      </p>

                      <div className="panels-navigation">
                        <div className="nav-panel" data-sign="minus">
                          <a href="#panel-1" className="anchor">
                            Prev
                          </a>
                        </div>
                        <div className="nav-panel" data-sign="plus">
                          <a href="#panel-3" className="anchor">
                            Next
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              <article id="panel-3" className="panel full-screen purple">
                <div className="container">
                  <div className="row">
                    <div className="col-6">
                      <img src="" alt="" />
                    </div>
                    <div className="col-6 d-flex flex-column">
                      <h2>Panel 3</h2>

                      <p className="step-description">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Including versions of Lorem Ipsum.
                      </p>

                      <div className="panels-navigation">
                        <div className="nav-panel" data-sign="minus">
                          <a href="#panel-2" className="anchor">
                            Prev
                          </a>
                        </div>
                        <div className="nav-panel" data-sign="plus">
                          <a href="#panel-4" className="anchor">
                            Next
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              <article id="panel-4" className="panel full-screen green">
                <div className="container">
                  <div className="row">
                    <div className="col-6">
                      <img src="" alt="" />
                    </div>
                    <div className="col-6 d-flex flex-column">
                      <h2>Panel 4</h2>

                      <p className="step-description">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Including versions of Lorem Ipsum.
                      </p>

                      <div className="panels-navigation">
                        <div className="nav-panel" data-sign="minus">
                          <a href="#panel-3" className="anchor">
                            Prev
                          </a>
                        </div>
                        <div className="nav-panel" data-sign="plus">
                          <a href="#panel-5" className="anchor">
                            Next
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              <article id="panel-5" className="panel full-screen gray">
                <div className="container">
                  <div className="row">
                    <div className="col-6">
                      <img src="" alt="" />
                    </div>
                    <div className="col-6 d-flex flex-column">
                      <h2>Panel 5</h2>

                      <p className="step-description">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Including versions of Lorem Ipsum.
                      </p>

                      <div className="panels-navigation text-right">
                        <div className="nav-panel" data-sign="minus">
                          <a href="#panel-4" className="anchor">
                            Prev
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section id="map" className="full-screen"></section>
        </main>
      </div>
    </>
  );
}
