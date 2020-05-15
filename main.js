// BANER FUNCTION
const banner = (function () {
  // initial dom function. this needs to be invoke first
  const init = (bannerId, jsonData) => {
    loadDom(bannerId);

    const json = JSON.parse(jsonData());

    function resetHandler() {
      const slidesSlider = document.querySelector(".flexslider").children[2];
      const slidesSlider1 = document.querySelector(".flexslider").children[0];
      const sliderWrapper = document.querySelector(".banner-graph-container");
      const nav = [...slidesSlider.children];
      const bannerTableContainer = document.querySelector(
        ".banner-table-container"
      );

      nav.forEach((item, index) => {
        if (index === 0) {
          item.setAttribute("data-attr", "prev");
        } else {
          item.setAttribute("data-attr", "next");
        }

        item.addEventListener("click", handler);
      });

      setInterval(handler, [500]);

      function handler() {
        sliderWrapper.style.display = "none";
        bannerTableContainer.style.display = "none";

        [...slidesSlider1.children].forEach((item, index) => {
          if (index === 0 && item.className) {
            sliderWrapper.style.display = "flex";
            bannerTableContainer.style.display = "block";
          }
        });
      }
    }

    // generate height and make animations effect
    function barsHandler(
      [atxHeight, sfgreenHeight, goldHeight],
      atxValue,
      sfgreenValue,
      sfgoldValue
    ) {
      const atx = document.querySelector("#" + bannerId + " .atx-animated-bar");
      const sfgreen = document.querySelector(
        "#" + bannerId + " .sfgreen-animated-bar"
      );
      const sfgold = [
        ...document.querySelector("#" + bannerId + " .sfgold__content")
          .children,
      ];

      function transitionSet(element, value) {
        element.style.transition = `${value}s ease`;
      }

      const limitHeight = (value) => {
        return value <= 15 ? value : 15;
      };

      const atxHandler = () => {
        resetHandler();
        atx.style.transition = `${atxValue.transition}s`;
        atx.style.animationDelay = "1s";
        atx.style.height = `${atxHeight <= 55 ? atxHeight : 55}px`;
      };

      const sfgreenHandler = () => {
        sfgreen.style.transition = `${sfgreenValue.transition}s`;
        sfgreen.style.animationDelay = "2s";
        sfgreen.style.height = `${limitHeight(sfgreenHeight)}px`;
      };

      const sfgoldHandler = () => {
        const sfgoldAnimatedBar = document.querySelector(
          ".sfgold-animated-bar"
        );

        sfgoldAnimatedBar.style.transition = `${sfgoldValue.transition}s`;
        sfgoldAnimatedBar.style.animationDelay = "3.3s";

        sfgold.forEach((item) => {
          const attribute = item.getAttribute("element-id");

          if (attribute != null && attribute.indexOf("green") > 0) {
            transitionSet(item, sfgoldValue.transition);
            return (item.style.height = `${limitHeight(sfgreenHeight)}px`);
          }

          if (attribute != null && attribute.indexOf("gold") > 0) {
            transitionSet(item, sfgoldValue.transition);
            return (item.style.height = `${limitHeight(goldHeight)}px`);
          }
        });
      };

      setTimeout(() => {}, [1000]);
      setTimeout(atxHandler, 800);
      sfgreenHandler();
      sfgoldHandler();
    }

    // generate name and value number for bars and animation
    const barsNameAndValuetHandler = (barsNameAndValue) => {
      const barsName = [
        ...document.querySelectorAll("#" + bannerId + "bars-name"),
      ];
      const barsValue = [
        ...document.querySelectorAll("#" + bannerId + "bars-value"),
      ];

      function main() {
        barsNameAndValue.forEach((item, index) => {
          const { name, value } = item;

          barsName[index].textContent = name;
          barsValue[index].textContent = `${value}%`;

          barsValue[index].style.animationDelay = "4.5s";
          barsValue[index].classList.add("fade-in");
        });
      }
      main();
    };

    // generate heading
    const headingHandler = (value) => {
      const heading = document.querySelector("#" + bannerId + "heading");
      heading.textContent = value;
    };

    // generate percentage on diagram
    const percentageHandler = (values) => {
      const elements = [
        ...document.querySelector("#" + bannerId + "percentage").children,
      ];
      elements.forEach((item, index) => {
        item.textContent = `${item.textContent + values[index]}%`;
      });
    };

    // generate date
    const dateHandler = (date) => {
      const dateElement = document.querySelector("#" + bannerId + "date");
      dateElement.textContent = ` ${date.label}: ${date.value}`;
    };

    // generate info/phone number
    const infoHandler = (data) => {
      const contact = document.querySelector("#" + bannerId + "contact");
      contact.innerHTML = `<span class="light">${data.text}: </span><span>${data.phone}</span>`;
    };

    // generate table on rigth side
    const tableHandler = (elementName, prop) => {
      const selectedElement = document.querySelector(
        `#${bannerId}${elementName}`
      );

      prop.forEach((item) => {
        if (item.length < 2) {
          return (selectedElement.innerHTML = `${selectedElement.innerHTML} <div class="table-cell"><span>${item[0]}</span></div>`);
        } else {
          return (selectedElement.innerHTML = `${selectedElement.innerHTML} <div class="table-cell"><span>${item[0]}</span><span>${item[1]}</span></div>`);
        }
      });
    };

    json.data.forEach((data) => {
      const {
        barsAnimationSpeed: { atx, sfgreen, sfgold, text },
        heading,
        barsHeight,
        barsNameAndValue,
        diagramPercentage,
        date,
        info,
        table,
      } = data;

      headingHandler(heading);
      barsHandler(barsHeight, atx, sfgreen, sfgold);
      barsNameAndValuetHandler(barsNameAndValue, text);
      percentageHandler(diagramPercentage);
      dateHandler(date);
      infoHandler(info);

      table.forEach((table) => {
        const { tableClassName, value } = table;
        tableHandler(tableClassName, value);
      });
    });
  };
  // THIS IS HTML. THIS WILL BE LOAD DYNAMICALLY TO YOU HTML
  const loadDom = function (bannerId) {
    const container = document.querySelector("#" + bannerId);
    container.classList.add("banner-container");

    container.innerHTML = `
    <div class="banner-graph-container">
  <div id="${bannerId}percentage" class="percentage">
    <span>+<!-- here content will come dynamically from js --></span>
    <span><!-- here content will come dynamically from js --></span>
    <span>-<!-- here content will come dynamically from js --></span>
  </div>
  <div class="main-content">
    <h4 id="${bannerId}heading"><!-- here content will come dynamically from js --></h4>
    <div id="${bannerId}bars" class="bars">
      <div id="${bannerId}bar-wrapper" class="bar-wrapper">
        <div id="${bannerId}atx-container" class="atx-container">
          <h6 id="${bannerId}bars-name"><!-- here content will come dynamically from js --></h6>
          <div class="atx__content">
            <div class="atx-animated-bar scale-in-ver-bottom rectangle">
              <span id="${bannerId}bars-value" style="opacity: 0;"><!-- here content will come dynamically from js --></span>
            </div>
          </div>
        </div>
      </div>
      <div class="bar-wrapper">
        <div class="sfgreen-container">
          <div class="sfgreen__content">
            <span id="${bannerId}bars-value" style="opacity: 0;"><!-- here content will come dynamically from js --></span>
            <div class="sfgreen-animated-bar scale-in-ver-top rectangle"><!-- here content will come dynamically from js --></div>
          </div>
          <h6 id="${bannerId}bars-name"><!-- here content will come dynamically from js --></h6>
        </div>
      </div>
      <div class="bar-wrapper">
        <div class="sfgold-container">
          <div class="sfgold-animated-bar scale-in-ver-top rectangle">
            <div class="sfgold__content">
            <span id="${bannerId}bars-value" style="opacity: 0;"><!-- here content will come dynamically from js --></span>
              <div element-id="${bannerId}gold" class="gold">
            <!-- here content will come dynamically from js -->
              </div>
              <div element-id="${bannerId}green" class="green">
                <!-- here content will come dynamically from js -->
              </div>
            </div>
          </div>
          <h6 id="${bannerId}bars-name"><!-- here content will come dynamically from js --></h6>
        </div>
      </div>
    </div>
    <div id="${bannerId}date" class="date">Zeitraum:<!-- here content will come dynamically from js --></div>
  </div>
</div>
<div class="banner-table-container">
  <h5 id="${bannerId}contact">
    <span id="${bannerId}contact" class="light">Info-Hotline:<!-- here content will come dynamically from js --></span>
   <span><!-- here content will come dynamically from js --></span>
  </h5>
  <div class="table">
    <div id="${bannerId}table-head" class="table-head"><!-- here content will come dynamically from js --></div>
    <div class="table-middle">
      <div id="${bannerId}table-row-gold" class="table-row gold"><!-- here content will come dynamically from js --></div>
      <div id="${bannerId}table-row-green" class="table-row green"><!-- here content will come dynamically from js --></div>
    </div>
    <div id="${bannerId}table-footer" class="table-footer"><!-- here content will come dynamically from js --></div>
  </div>
 `;
  };
  return { init };
})();
