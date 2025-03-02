function loadHeader() {
  fetch("./components/header.html")
    .then((response) => response.text())
    .then((data) => {
      $("#header").html(data);
    });
}

function loadFooter() {
  fetch("./components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      $("#footer").html(data);
    });
}
loadFooter();

const cards = [
  { id: 1, name: "Weld (WPS / WPQR) qualification test" },
  { id: 2, name: "Witness of your Procedure Qualification Record" },
  { id: 3, name: "NACE Level 2 coating inspection " },
  {
    id: 4,
    name: "Factory/site welding training for your personnel",
    fullwidth: true,
  },
  {
    id: 5,
    name: "Advanced NDT - ECA Eddy Current Array test",
  },
  {
    id: 6,
    name: "Advanced NDT - PAUT Phased Array Ultrasonic test",
  },
  {
    id: 7,
    name: "Advanced NDT - TOFD Time of Flight Diffraction",
  },
  {
    id: 8,
    name: "Advanced NDT - CRT Computed Radiographic testing",
    fullwidth: true,
  },
  {
    id: 9,
    name: "NDT - Non-destructive testing - RT, UT, ET, MT, PT",
  },
  {
    id: 10,
    name: "Pressure vessel Inspection AICIP & Conformity",
  },
  { id: 11, name: "Chemical analysis (Spark Spectroscopy)" },
  {
    id: 12,
    name: "Third party Inspection & expert Witness",
    fullwidth: true,
  },
  { id: 13, name: "Quality Audit & NDT Level 3 services" },
  { id: 14, name: "Hydrostatic pressure test" },
  {
    id: 15,
    name: "PMI - Positive Material Identification (XRF)",
  },
  {
    id: 16,
    name: "Mechanical testing (engineering)",
    fullwidth: true,
  },
  { id: 17, name: "Corrosion Resistance Test" },
  { id: 18, name: "Metallurgical services" },
  { id: 19, name: "Failure investigation" },
];

$(document).ready(function () {
  // Initializing variables
  const servicesContainer = $("#our-services-section #services");
  const loadMoreButton = $("#load-more-btn");
  const ndtPageServices = $("#ndtpage-services");
  ndtPageServices.hide();
  // related to mobile nav toggle
  const openMobileNavBtn = $("#open-mobile-nav");
  const closeMobileNavBtn = $("#close-mobile-nav");
  const mobileNavContainer = $("#mobile-nav-container");

  openMobileNavBtn.on("click", function (e) {
    mobileNavContainer.animate(
      {
        left: 0,
        height: "100vh",
        width: "100%",
        opacity: 1,
      },
      "fast"
    );
  });

  closeMobileNavBtn.on("click", function (e) {
    mobileNavContainer.animate({ left: -1200 }, "fast");
  });
  // related to mobile nav toggle

  let visibleServices = 9; // Initial number of services visible
  const totalServices = cards.length;

  // Function to load services
  const loadServices = (startIndex, endIndex) => {
    // Clear previous services to avoid duplication (if necessary)
    servicesContainer.empty();

    // Loop through the specified range of services and append them
    cards.slice(startIndex, endIndex).forEach((card) => {
      let isFull = card.fullwidth ? "lg:basis-full" : "";
      let serviceHeight = isFull ? "h-[328px] lg:h-[396px]" : "h-[328px]";
      let serviceImgHeight = isFull ? "h-[240px] lg:h-[340px]" : "h-[240px]";
      let objFit = isFull ? "object-cover" : "object-cover";
      let margin = isFull ? "lg:my-6" : "";

      let service = `
      <div class="service w-full md:w-[calc(50%-32px)] lg:w-[300px] xl:w-[390px] 2xl:w-[480px] ${isFull} ${serviceHeight} ${margin}" id="service-${card.id}">
        <img
          src="./assets/images/about-us/service-${card.id}.webp"
          alt="Service Image ${card.id}"
          class="rounded-[8px] ${serviceImgHeight} w-full ${objFit} lazyload"
          loading="lazy"
        />
        <h3 class="text-[18px] lg:text-[20px] text-footer_black mt-6 font-[600]">
          ${card.name}
        </h3>
      </div>
    `;
      servicesContainer.append(service);
    });

    // Show "Load Less" button if more services are available
    if (endIndex < totalServices) {
      loadMoreButton.html(`Load More  <i class="fa-solid fa-arrow-down"></i>`);
    } else {
      loadMoreButton.html(`Load Less <i class="fa-solid fa-arrow-up"></i>`);
    }
  };

  // Initially load first 9 services
  loadServices(0, visibleServices);

  // Event listener for Load More/Load Less button
  loadMoreButton.on("click", function () {
    const icon = $(this).find(".fa-arrow-down");

    if (icon.length) {
      visibleServices = totalServices; // Load all services
      loadServices(0, visibleServices); // Load all services
    } else {
      visibleServices = 9; // Reset to initial number of visible services
      loadServices(0, visibleServices); // Load the first 9 services
      $("html, body").animate(
        {
          scrollTop: $("#our-services-section").offset().top,
        },
        1000
      );
    }
  });
});
