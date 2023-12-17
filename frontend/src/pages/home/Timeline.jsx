import React, { useEffect } from "react";
import "./timeline.css"; // Import your CSS file containing the styles mentioned earlier

const Timeline = () => {
  useEffect(() => {
    const timelineContainer = document.querySelector(".js-timeline");
    const timelineProgress = document.querySelector(".js-timeline_line-progress");

    function updateProgress() {
      const containerHeight = timelineContainer.clientHeight;
      const contentHeight = timelineContainer.scrollHeight - containerHeight;
      const scrollOffset = window.scrollY;
      const progress = (scrollOffset / contentHeight) * 100;
      timelineProgress.style.width = `${progress}%`;
    }

    window.addEventListener("scroll", updateProgress);
    updateProgress(); // Initial update on mount

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div className="ag-timeline-block">
      <div className="ag-timeline_title-box">
        <div className="ag-timeline_tagline">Timeline</div>
        <div className="ag-timeline_title">No Flex</div>
      </div>
      <section className="ag-section">
        <div className="ag-format-container">
          <div className="js-timeline ag-timeline">
            <div className="js-timeline_line ag-timeline_line">
              <div className="js-timeline_line-progress ag-timeline_line-progress"></div>
            </div>
            <div className="ag-timeline_list">
              {/* Timeline cards */}
              {[1, 2, 3].map((index) => (
                <div key={index} className="js-timeline_item ag-timeline_item">
                  <div className="ag-timeline-card_box">
                    {/* Your card content goes here */}
                    <div className="js-timeline-card_point-box ag-timeline-card_point-box">
                      <div className="ag-timeline-card_point">Year</div>
                    </div>
                    <div className="ag-timeline-card_meta-box">
                      <div className="ag-timeline-card_meta">Season {index}</div>
                    </div>
                  </div>
                  <div className="ag-timeline-card_item">
                    <div className="ag-timeline-card_inner">
                      <div className="ag-timeline-card_img-box">
                        {/* Your card image */}
                        <img
                          src={`https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/timeline/images/img-${index}.png`}
                          className="ag-timeline-card_img"
                          width="640"
                          height="360"
                          alt=""
                        />
                      </div>
                      <div className="ag-timeline-card_info">
                        {/* Card details */}
                        <div className="ag-timeline-card_title">Season {index}</div>
                        <div className="ag-timeline-card_desc">
                          {/* Card description */}
                          Your card description goes here...
                        </div>
                      </div>
                    </div>
                    <div className="ag-timeline-card_arrow"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Timeline;
